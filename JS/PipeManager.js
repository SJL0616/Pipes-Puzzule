class PipeManager {

    constructor(gameManager) {
        this.gameManager = gameManager;
        this.pipeTable = document.getElementById('pipeTable');
        this.gameTrs = null;
        this.gameTds = [];
        this.gameNodes = [];

        this.pipeMenuTable = document.getElementById('pipeMenuTable');
        this.menuTrs = null;
        this.menuNodes = [];


        this.startNode = null;
        this.startNodeDir = 0;
        this.endNode = null;
        this.endNodeDir = 0;
        this.path = [];

        this.hintPath = [];
        this.oneHintPath = [];
        this.oneHintPipes = [];
        this.samplePipes = [];
        this.showHintsCnt = 0;


        this.startMarker = document.getElementById('markerStart');
        this.endMarker = document.getElementById('markerEnd');
        //this.init();

    }


    reset() {

        const pipeNodes = this.gameNodes.filter(node => node.type != Node.nodeType.EMPTY);
        if (pipeNodes.length == 0) return;
        //console.log(pipeNodes);
        this.showHintsCnt = 0;
        pipeNodes.forEach(node => {
            node.setType(Node.nodeType.EMPTY);
            node.setPipe(null);
            let td = this.gameTds.find(td => td.getAttribute('data-num') == node.num);
            td.removeChild(td.lastElementChild);
        });
        document.getElementById('chance').innerHTML = this.oneHintPath.length;
        //console.log(this.gameNodes);
        //console.log(this.gameTds);

        return false;
    }

    //마커 각도, 위치 조정
    setMarker(start, end) {


        const poses = ['top', 'bottom', 'left', 'right'];
        this.startMarker.className = 'marker';
        this.endMarker.className = 'marker';

        const array = [start, end];
        let idx = 0;
        for (let i = 0; i < 2; i++) {
            let pos = array[i];
            if (parseInt((pos - 1) % 5) == 0) {
                idx = 2;
            } else if (parseInt((pos - 1) % 5) == 4) {
                idx = 3;
            } else if (parseInt((pos - 1) / 5) == 0) {
                idx = 0;
            } else {
                idx = 1;
            }

            if (i == 0) {
                this.startMarker.classList.add(poses[idx]);
                this.startNodeDir = idx + 1;
            } else {
                this.endMarker.classList.add(poses[idx]);
                this.endNodeDir = idx + 1;
            }
        }
    }
    getPos(pastNum) {
        console.log(pastNum);
        let num = 0;
        while (true) {
            num = parseInt(Math.random() * 25) + 1;
            let row = parseInt((num - 1) / 5);
            if ((row > 0 && row < 4) && ((num % 5) > 1 && (num % 5) <= 4)) {
                let rd = parseInt(Math.random() * 2) != 0 ? 5 : 1;
                num = row * 5 + rd;
            }
            if (pastNum && pastNum == num) {
                continue;
            }
            break;
        }
        return num;

    }



    createMain() {

        let start = this.getPos();
        let end = this.getPos(start);
        console.log('start = ' + start + " / end = " + end);
        this.setMarker(start, end);

        this.pipeTable.innerHTML = '';
        this.gameTrs = null;
        this.gameTds = [];
        this.gameNodes = [];

        let row = null;
        let col = null;
        let num = 1;
        for (let i = 0; i < 5; i++) {
            row = document.createElement('tr');
            for (let x = 0; x < 5; x++) {
                col = document.createElement('td');
                //col.innerHTML = `<p>${num}</p>`;
                col.setAttribute('data-num', num);

                let node = new Node(num, Node.nodeType.EMPTY);

                if (num == end) {
                    col.appendChild(this.endMarker);
                    col.classList.add('markerParent');
                    this.endNode = node;
                }
                if (num == start) {
                    col.appendChild(this.startMarker);
                    col.classList.add('markerParent');
                    this.startNode = node;
                }

                row.appendChild(col);
                this.gameNodes.push(node);
                this.gameTds.push(col);

                col.addEventListener('dragover', (e) => {
                    e.preventDefault();
                });
                col.addEventListener('drop', (e) => {
                    console.log('drop');
                    console.log(node);
                    console.log(node.type);
                    if (node.type == Node.nodeType.PIPE) {
                        console.log('이미 파이프가 배치됨');
                        return;
                    }

                    console.log(e);
                    console.log(e.target.tagName);
                    console.log(e.target.parentElement);
                    if (e.target.tagName == 'TD' || e.target.tagName == 'IMG') {

                        let pipeType = e.dataTransfer.getData('pipeType');

                        node.setPipe(parseInt(pipeType));
                        node.setType(Node.nodeType.PIPE);

                        let img = document.createElement('IMG');
                        img.setAttribute('src', `${node.img.src}`);


                        if (e.target.tagName == 'TD') {
                            e.target.appendChild(img);
                        } else {
                            const children = Array.from(e.target.parentElement.children);
                            let hint = children.find(e => e.classList.contains('hint'));
                            if (hint && hint == e.target) {
                                e.target.parentElement.appendChild(img);
                                e.target.parentElement.removeChild(e.target);
                            } else if (hint) {
                                e.target.parentElement.removeChild(hint);
                                e.target.parentElement.appendChild(img);
                            } else {
                                e.target.parentElement.appendChild(img);
                            }

                        }

                        if (!this.checkPath()) {
                            //경로가 이어지지 않았을 때 남은 횟수 체크
                            this.checkChance();
                        }
                    }

                });

                num++;
            }
            this.pipeTable.appendChild(row);
        }
        this.gameTrs = this.pipeTable.children;
        //console.log(this.gameTrs);
        console.log(this.gameTds);
        console.log(this.gameNodes);
    }

    createMenu(pipeTypes) {
        this.menuTrs = null;
        this.menuNodes = [];
        this.pipeMenuTable.innerHTML = '';


        let row = null;
        let col = null;
        let num = 1;
        for (let i = 0; i < 2; i++) {
            row = document.createElement('tr');
            for (let x = 0; x < 5; x++) {
                col = document.createElement('td');
                col.setAttribute('data-num', num);

                let node = new Node(num, Node.nodeType.MENU);
                if (num - 1 < pipeTypes.length) {
                    let pipeType = pipeTypes[num - 1];


                    node.setPipe(pipeType);
                    node.setType(Node.nodeType.PIPE);
                    col.innerHTML = `<img src=${node.img.src}>`;

                    col.setAttribute('draggable', true);
                    col.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('pipeType', pipeType);
                    });
                } else {
                    col.classList.add('hidden');

                }

                row.appendChild(col);
                this.menuNodes.push(node);
                num++;
            }
            this.pipeMenuTable.appendChild(row);
        }
        this.menuTrs = this.pipeMenuTable.children;
        //console.log(this.menuTrs);
        //console.log(this.menuNodes);
    }



    init() {
        this.createMain();
        this.createMenu(Array.from([
            Pipe.type.VERTICAL,
            Pipe.type.HORIZONTAL,
            Pipe.type.L_SHAPED_1,
            Pipe.type.L_SHAPED_2,
            Pipe.type.L_SHAPED_3,
            Pipe.type.L_SHAPED_4,
            Pipe.type.T_SHAPED_1
        ]));
        this.createHints();
        document.getElementById('chance').innerHTML = this.oneHintPath.length;
    }


    checkChance() {
        let chance = document.getElementById('chance').innerHTML;
        console.log('left chance = ' + chance);
        document.getElementById('chance').innerHTML = (chance - 1);
        if (chance == 1) {
            setTimeout(() => {
                this.gameManager.lose();
            }, 1000);
        }

    }

    checkPath() {


        //td 배열에 접근 -> markerParent 인는 것. -> id 로 스타트, 앤드 노드 td 객체를 가져옴
        //let startTd = this.gameTds.find(n => n.classList.contains('markerParent') && n.children[0].id == 'markerStart');
        //let endTd = this.gameTds.find(n => n.classList.contains('markerParent') && n.children[0].id == 'markerEnd');

        //console.log(startTd.getAttribute('data-num'));
        //console.log(endTd.getAttribute('data-num'));

        //let startNode = this.gameNodes.find(n => n.num == startTd.getAttribute('data-num'));
        //let endNode = this.gameNodes.find(n => n.num == endTd.getAttribute('data-num'));


        console.log(this.startNode);
        console.log(this.endNode);

        if (this.startNode.type != Node.nodeType.PIPE) {
            console.log('스타트노드에 파이프가 없습니다.');
            return;
        }
        if (!this.startNode.pipe.movable.find(dir => dir == this.startNodeDir)) {
            console.log('스타트 노드의 파이프가 올바르지 않습니다.');
            return;
        }

        if (this.findPath()) {
            console.log('파이프가 이어졌습니다.');
            setTimeout(() => {
                this.gameManager.win();
            }, 500);
            return true;
        } else {
            console.log('파이프가 이어지지 않았습니다.');
            return false;
        }

    }

    getOneHints() {


        let length = this.oneHintPath.length;
        if (length == this.showHintsCnt) {
            console.log('모든 힌트 횟수를 소모했습니다.');
            return;
        }
        let isfull = true;
        this.oneHintPath.forEach(hintNode => {
            let node = this.gameNodes.find(node => node.num == hintNode.num);
            if (node.type == Node.nodeType.EMPTY) {
                isfull = false;
            }
        });
        if (isfull) {
            console.log('모든 타일이 파이프 타입입니다..');
            return;
        }


        while (true) {
            let num = parseInt(Math.random() * length);
            let rdNode = this.oneHintPath[num];
            console.log(rdNode);
            let gameNode = this.gameNodes.find(node => node.num == rdNode.num);
            if (gameNode.type != Node.nodeType.EMPTY) {
                continue;
            }
            gameNode.setPipe(this.oneHintPipes[num].shape);
            gameNode.setType(Node.nodeType.HINT);

            let img = document.createElement('IMG');
            img.setAttribute('src', `${gameNode.img.src}`);
            img.classList.add('hint');
            //console.log(node.img.src);
            //img.setAttribute('src', )
            let col = this.gameTds.find(td => td.getAttribute('data-num') == gameNode.num);
            col.appendChild(img);
            this.showHintsCnt++;
            break;
        }
        return false;
    }

    createHintPipes() {
        let inDir = 0;
        let outDir = 0;

        let pastNode = this.oneHintPath[0];
        for (let i = 0; i < this.oneHintPath.length; i++) {

            let stnum = 0;
            let ednum = 0;
            if (i == 0) {
                inDir = this.startNodeDir;
                stnum = 'start';
            } else {
                inDir = this.getNextDir(this.oneHintPath[i].num, this.oneHintPath[i - 1].num);
                stnum = this.oneHintPath[i].num;
            }


            if (i == this.oneHintPath.length - 1) {
                outDir = this.endNodeDir;
                ednum = 'end';
            } else {
                outDir = this.getNextDir(this.oneHintPath[i].num, this.oneHintPath[i + 1].num);
                ednum = this.oneHintPath[i + 1].num;
            }

            console.log(`from [${stnum}]:` + inDir + ` / to [${ednum}]:` + outDir);
            let pipe = this.samplePipes.find(pipe => pipe.movable.includes(inDir) && pipe.movable.includes(outDir));

            console.log(pipe);
            console.log(pipe.shape);
            this.oneHintPipes.push(new Pipe(pipe.shape));

        }

        console.log(this.oneHintPipes);
    }

    getNextDir(pastNum, NextNum) {
        let n = pastNum - NextNum;
        if (n == 5) {
            return 1;
        } else if (n == -5) {
            return 2;
        } else if (n == 1) {
            return 3;
        } else {
            return 4;
        }
    }



    createHints() {
        console.log("========== createHints ========== ");

        if (this.samplePipes.length == 0) {
            for (let i = 0; i < 8; i++) {
                this.samplePipes.push(new Pipe(i));
            }
        }
        this.gameNodes.forEach(node => {
            node.setAc(this.startNode.num);
            node.setDc(this.endNode.num);
            /* let col = this.gameTds.find(n => n.getAttribute('data-num') == node.num);
             col.children[0].innerHTML =
                 `num :${node.num} <br>
               ac :  ${node.ac} <br>
               dc : ${node.dc} <br>
               fc : ${node.fc} `;*/
        });


        console.log("========== getHint Path ========== ");
        let currPath = [];
        let currVisited = [];
        this.hintPath = [];
        this.getHints(this.startNode, currPath, currVisited);
        console.log("힌트 리스트 : ");
        console.log(this.hintPath);
        this.oneHintPath = this.hintPath[parseInt(Math.random() * this.hintPath.length)];
        console.log("최종 힌트 리스트 : ");
        console.log(this.oneHintPath);
        this.oneHintPipes = [];
        this.createHintPipes();
    }

    getHints(currNode, currPath, currVisited) {
        if (currVisited.find(n => n.num == currNode.num)) {
            console.log('이미 방문한 노드');
            return;
        }
        let nowPath = Array.from(currPath);
        let nowVisited = Array.from(currVisited);
        nowVisited.push(currNode);
        nowPath.push(currNode);
        console.log("현재 노드 번호 : " + currNode.num);

        let neighbers = this.getNeighbor(currNode.num);
        if (neighbers.length == 0) return;

        console.log(neighbers);
        neighbers.forEach(neighbor => {
            if (nowVisited.find(n => n.num == neighbor.num)) {
                console.log('이미 방문한 노드');
                return;
            }
            if (neighbor.num == this.endNode.num) {
                nowPath.push(neighbor);
                console.log('최종 리스트 :');
                console.log(nowPath);
                this.hintPath.push(nowPath);
            }
            if (this.isColse(currNode, neighbor)) {
                this.getHints(neighbor, nowPath, nowVisited);
            }


        });

    }

    isColse(currNode, nextNode) {

        if (nextNode.fc > currNode.fc) {
            return false;
        } else if (nextNode.dc > currNode.dc) {
            return false;
        }
        return true;
    }

    getNeighbor(num) {
        console.log('get Neighbor ~~');
        const neighbers = [];
        let nextNum = 0;
        for (let dir = 1; dir < 5; dir++) {
            nextNum = num;
            switch (dir) {
                case 1:
                    //console.log('상');
                    nextNum -= 5;
                    if (nextNum < 1) {
                        nextNum = 0;
                    }
                    break;
                case 2:
                    //console.log('하');
                    nextNum += 5;
                    if (nextNum > 25) {
                        nextNum = 0;
                    }
                    break;
                case 3:
                    // console.log('좌');
                    nextNum -= 1;
                    if (num % 5 == 1) {
                        nextNum = 0;
                    }
                    break;
                case 4:
                    // console.log('우');
                    nextNum += 1;
                    if (num % 5 == 0) {
                        nextNum = 0;
                    }
                    break;
            }
            if (nextNum == 0) {
                console.log('갈 수 없는 노드');
                continue;
            }

            let nextNode = this.gameNodes.find(n => n.num == nextNum);
            neighbers.push(nextNode);
        }
        return neighbers;

    }


    findPath() {
        console.log("========== findPath ========== ");
        this.path = [];
        let isArrived = false;

        const queue = [];
        queue.push(this.startNode);

        while (queue.length > 0) {
            const node = queue.pop();
            this.path.push(node);

            console.log(`현재 노드 : ${node.num}`);
            console.log(Object.keys(Node.nodeType)[node.type]);


            if (node.num == this.endNode.num && node.pipe.movable.find(dir => dir == this.endNodeDir)) {
                isArrived = true;
                break;
            }
            const movableNodes = node.pipe.movable;
            //console.log(movableNodes);
            for (let i = 0; i < movableNodes.length; i++) {
                console.log('다음 방향 -->');
                let dir = movableNodes[i];
                //무빙 배열의 값을 가져옴..
                // 1 상 2 하 3 좌  4 우 이므로 
                /*다음 노드는 this.gameNodes배열에서 
                1 = num - 5 인데 num < 1 일 때는 x
                2 = num + 5 인데 num > 25 일 떄는 x
                3 = num - 1 인데 num%5 == 1 일 때는 x
                4 = num + 1 인데 num%5 == 0 일 때는 x
                혹은 해당 노드에 pipe 값이 없을 경우 x

                1. queue 배열에 넣고 pop 하면서 1번 지나간 노드는 path에 저장하여 
                */
                let nextNum = node.num;
                switch (dir) {
                    case 1:
                        nextNum -= 5;
                        if (nextNum < 1) {
                            nextNum = 0;
                        }
                        break;
                    case 2:
                        nextNum += 5;
                        if (nextNum > 25) {
                            nextNum = 0;
                        }
                        break;
                    case 3:
                        nextNum -= 1;
                        if (node.num % 5 == 1) {
                            nextNum = 0;
                        }
                        break;
                    case 4:
                        nextNum += 1;
                        if (node.num % 5 == 0) {
                            nextNum = 0;
                        }
                        break;
                }

                if (nextNum == 0) {
                    console.log('갈 수 없는 노드');
                    continue;
                }

                let nextNode = this.gameNodes.find(n => n.num == nextNum);

                console.log(nextNode);
                console.log(nextNode.pipe);
                if (this.path.find(n => n.num == nextNode.num)) {
                    console.log('이미 방문한 노드');
                    continue;
                }

                if (nextNode.type == Node.nodeType.EMPTY || nextNode.type == Node.nodeType.HINT) {
                    continue;
                }

                if (!nextNode.pipe.movable.includes(this.getNextDir(nextNode.num, node.num))) {
                    console.log('잘못된 파이프');
                    continue;
                }
                queue.push(nextNode);

            }
        }
        return isArrived;
    }

    /*switch (node.type) {
                        case Node.nodeType.EMPTY:
                            console.log('Empty');
                            break;
                    }*/

}