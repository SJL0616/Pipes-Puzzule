class Node {
    static nodeType = {
        EMPTY: 0,
        MENU: 1,
        HINT: 2,
        PIPE: 3
    };

    constructor(num, type) {
        this.num = num;
        this.type = type;
        this.pipe = null;
        this.img = new Image();
        this.init();

        this.ac = 0;
        this.dc = 0;
        this.fc = 0;
    }

    setAc(aNum) {
        let verticalC = Math.abs(parseInt((this.num - 1) / 5) - parseInt((aNum - 1) / 5));
        let horizontalC = Math.abs(((this.num - 1) % 5) - ((aNum - 1) % 5));
        this.ac = verticalC + horizontalC;
        //console.log(this.num + " . ac :  " + verticalC + "+" + horizontalC);
        this.fc += this.ac;

    }

    setDc(dNum) {
        let verticalC = Math.abs(parseInt((this.num - 1) / 5) - parseInt((dNum - 1) / 5));
        let horizontalC = Math.abs(((this.num - 1) % 5) - ((dNum - 1) % 5));
        this.dc = verticalC + horizontalC;
        // console.log(this.num + " . dc :  " + verticalC + "+" + horizontalC);
        this.fc += this.dc;

    }


    setCost(ac, dc) {
        this.ac = ac;
        this.dc = dc;
        this.fc = this.ac + this.dc;
    }

    setHint() {

    }
    setType(type) {
        this.type = type;
    }
    setPipe(pipe) {


        if (this.type == Node.nodeType.PIPE && pipe != null) {
            return;
        }

        if (pipe == null) {
            console.log('노드 타입 EMPTY로 변환');
            this.pipe = null;
            this.img = new Image();
            return;
        }


        //console.log('pipeSet');
        // console.log(pipe);
        switch (pipe) {
            case Pipe.type.VERTICAL:
                //this.pipe = Pipe.type.VERTICAL;
                this.pipe = new Pipe(Pipe.type.VERTICAL);
                this.img.src = "./Images/ㅣ.png";
                break;
            case Pipe.type.HORIZONTAL:
                //this.pipe = Pipe.type.HORIZONTAL;
                this.pipe = new Pipe(Pipe.type.HORIZONTAL);
                this.img.src = "./Images/ㅡ.png";
                break;
            case Pipe.type.L_SHAPED_1:
                //this.pipe = Pipe.type.L_SHAPED_1;
                this.pipe = new Pipe(Pipe.type.L_SHAPED_1);
                this.img.src = "./Images/ㄱ1.png";
                break;
            case Pipe.type.L_SHAPED_2:
                //console.log('L_SHAPED2');
                //this.pipe = Pipe.type.L_SHAPED_2;
                this.pipe = new Pipe(Pipe.type.L_SHAPED_2);
                this.img.src = "./Images/ㄱ2.png";
                break;
            case Pipe.type.L_SHAPED_3:
                //console.log('L_SHAPED');
                //this.pipe = Pipe.type.L_SHAPED_3;
                this.pipe = new Pipe(Pipe.type.L_SHAPED_3);
                this.img.src = "./Images/ㄱ3.png";
                break;
            case Pipe.type.L_SHAPED_4:
                //console.log('L_SHAPED');
                //this.pipe = Pipe.type.L_SHAPED_4;
                this.pipe = new Pipe(Pipe.type.L_SHAPED_4);
                this.img.src = "./Images/ㄱ4.png";
                break;
            case Pipe.type.T_SHAPED_1:
                // console.log('T_SHAPED');
                //this.pipe = Pipe.type.T_SHAPED_1;
                this.pipe = new Pipe(Pipe.type.T_SHAPED_1);
                this.img.src = "./Images/ㅗ1.png";
                break;
        }
    }

    changeImg() {

    }

    init() {
        this.changeImg();
    }

}