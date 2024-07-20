

export class RoomUnit {

    public targetX: number;
    public targetY: number;
    public targetZ: number;

    constructor(
        public id: number,
        public roomIndex: number,
        public username: string,
        public gender: string,
        public figure: string,
        public x: number,
        public y: number,
        public z: number,
        public bodyDirection: number,
        public headDirection: number,
    ) {
        this.targetX = x;
        this.targetY = y;
        this.targetZ = z;
    }

}