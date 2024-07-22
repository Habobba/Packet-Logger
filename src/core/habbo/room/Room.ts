import { RoomUnit } from "./unit/RoomUnit";


export class Room {

    units: RoomUnit[] = [];

    constructor() {
    }

    flush() {
        this.units = [];
    }    

    addUnit(unit: RoomUnit) {
        const hasUnit = this.getUnitById(unit.id);
        if (hasUnit) {
            hasUnit.figure = unit.figure;
            hasUnit.gender = unit.gender;
            hasUnit.username = unit.username;
        } else {
            this.units.push(unit);
        }
    }

    getUnitByRoomIndex(roomIndex: number) {
        return this.units.find(unit => unit.roomIndex == roomIndex);
    }

    getUnitById(id: number) {
        return this.units.find(unit => unit.id == id);
    }

    getUnitByUsername(username: string) {
        return this.units.find(unit => unit.username == username);
    }

}