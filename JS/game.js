window.onload = () => {
    console.log('lobby start');
    const game = new Game();
};

class Game {
    constructor() {
        console.log('Game obj created');
        this.lobby = document.querySelector('.lobby');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('reset');
        this.hintBtn = document.getElementById('hints');
        this.main = document.querySelector('.main');
        this.home = document.querySelector('.home');
        this.init();
        this.nowLoading = false;
        this.nowStarting = false;
        this.nowgetHints = false;

        this.pipeManager = new PipeManager(this);
    }

    init() {
        console.log('Game init...');
        this.startBtn.addEventListener('click', () => {
            //Game Start 버튼 클릭시 로비 UI를 숨기고 메인을 보이게 처리
            this.gameStart();
        });

        this.home.addEventListener('click', () => {
            //Game Start 버튼 클릭시 로비 UI를 숨기고 메인을 보이게 처리
            this.toHome();
        });


        this.resetBtn.addEventListener('click', () => {
            this.justReset();

        });

        this.hintBtn.addEventListener('click', () => {
            console.log('Get Hints');
            if (this.nowgetHints) {
                console.log('now get Hints...');
                return
            };
            this.nowgetHints = true;

            this.nowgetHints = this.pipeManager.getOneHints();
        });

    }

    gameStart() {
        console.log('Game Start!');
        if (this.nowStarting) {
            console.log('now starting...');
            return
        }
        this.nowStarting = true;
        this.lobby.classList.add('hidden');
        this.pipeManager.init();
        setTimeout(() => {
            Array.from(this.main.children).forEach(box => {
                box.classList.remove('hidden');
            });
            this.nowStarting = false;
            //this.main.classList.remove('hidden');
        }, 1000);
    }

    toHome() {
        console.log('Home btn');
        if (this.nowStarting) {
            console.log('now starting...');
            return
        }
        this.nowStarting = true;
        this.pipeManager.reset();
        Array.from(this.main.children).forEach(box => {
            box.classList.add('hidden');
        });
        setTimeout(() => {
            this.lobby.classList.remove('hidden');

            this.nowStarting = false;
        }, 1000);
    }

    justReset() {
        console.log('Game Reset');
        if (this.nowLoading) {
            console.log('now Loading...');
            return
        };
        this.nowLoading = true;

        this.nowLoading = this.pipeManager.reset();
    }

    restart() {

        Array.from(this.main.children).forEach(box => {
            box.classList.add('hidden');
        });
        setTimeout(() => {
            this.pipeManager.reset();
            this.pipeManager.init();
            Array.from(this.main.children).forEach(box => {
                box.classList.remove('hidden');
            });
        }, 1200);
    }


    lose() {
        if (confirm("패배 !\n 다시 하시겠습니까?")) {
            this.justReset();
        } else {
            this.toHome();
        }
    }

    win() {
        if (confirm("승리 !\n 다음 레벨로 넘어가시겠습니까?")) {
            this.restart();
        } else {
            this.toHome();
        }

    }

}