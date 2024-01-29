class Pipe {
    static type = {
        VERTICAL: 0,
        HORIZONTAL: 1,
        L_SHAPED_1: 2,
        L_SHAPED_2: 3,
        L_SHAPED_3: 4,
        L_SHAPED_4: 5,
        T_SHAPED_1: 6,
        T_SHAPED_2: 7
    };

    constructor(type) {
        this.shape = type;
        this.setPos();
        //console.log(this.shape);
    }

    setPos() {

        // 1 상 2 하 3 좌 4 우
        //파이프마다 연결될 수 있는 방향을 1,2,3,4로 표시하여 설정함.
        this.movable = [];
        switch (this.shape) {
            case Pipe.type.VERTICAL:
                this.movable.push(1, 2); //상 하  0
                break;
            case Pipe.type.HORIZONTAL:
                this.movable.push(3, 4); //좌 우  1
                break;
            case Pipe.type.L_SHAPED_1:
                this.movable.push(2, 3); // 하 좌    2
                break;
            case Pipe.type.L_SHAPED_2:
                this.movable.push(2, 4); // 하 우  3
                break;
            case Pipe.type.L_SHAPED_3:
                this.movable.push(1, 4); // 상 우  4
                break;
            case Pipe.type.L_SHAPED_4:
                this.movable.push(1, 3) //상 좌  5
                break;
            case Pipe.type.T_SHAPED_1:
                this.movable.push(1, 3, 4) //상 좌 우   6
                break;
            case Pipe.type.T_SHAPED_2:
                this.movable.push(2, 3, 4) //하 좌 우   7
                break;
        }
        Object.freeze(this.movable);
        //console.log(this.movable);
    }



}