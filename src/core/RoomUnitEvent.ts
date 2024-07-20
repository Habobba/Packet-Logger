import { BinaryReader } from "./BinaryReader";
import { RoomUnit } from "./room/RoomUnit";

export class RoomUnitEvent {

    units: RoomUnit[] = [];

    constructor(reader: BinaryReader) {
        this.parse(reader);
    }

    parse(reader: BinaryReader) {
        for (let i = reader.readInt(); i > 0; i--) {
            const id = reader.readInt();
            const username = reader.readString();
            const motto = reader.readString();
            const figure = reader.readString();
            const roomIndex = reader.readInt();
            const x = reader.readInt();
            const y = reader.readInt();
            const z = parseFloat(reader.readString());
            const direction = reader.readInt();
            const type = reader.readInt();
            let unit: any = null;

            if (type == 1) {
                unit = {
                    group: {},
                    parse() {
                        this.gender = reader.readString();
                        this.group.id = reader.readInt();
                        this.group.status = reader.readInt();
                        this.group.name = reader.readString();
                        const _swimFigure = reader.readString();

                        this.achievementScore = reader.readInt();
                        this.isModerator = reader.readBoolean();
                    }
                }
            } else if (type == 4) {
                unit = {
                    skills: [],
                    parse() {
                        this.gender = reader.readString();
                        this.ownerId = reader.readInt();
                        this.ownerName = reader.readString();
                        const totalSkills = reader.readInt();
                        for (let i = 0; i < totalSkills; i++) {
                            this.skills.push(reader.readShort());
                        }
                    }
                }
            } else if (type == 2) {
                unit = {
                    parse() {
                        this.subType = reader.readInt().toString();
                        this.ownerId = reader.readInt();
                        this.ownerName = reader.readString();
                        this.rarityLevel = reader.readInt();
                        this.hasSaddle = reader.readBoolean();
                        this.isRiding = reader.readBoolean();
                        this.canBreed = reader.readBoolean();
                        this.canHarvest = reader.readBoolean();
                        this.canRevive = reader.readBoolean();
                        this.hasBreedingPermission = reader.readBoolean();
                        this.petLevel = reader.readInt();
                        this.petPosture = reader.readString();
                    }
                }
            } else {
                console.log(`Error! UnitType => ${type}`);
                return;
            }

            unit.id = id;
            unit.type = type;
            unit.username = username;
            unit.motto = motto;
            unit.figure = figure;
            unit.roomIndex = roomIndex;
            unit.x = x;
            unit.y = y;
            unit.z = z;
            unit.targetX = x;
            unit.targetY = y;
            unit.targetZ = z;
            unit.bodyDirection = direction;
            unit.headDirection = direction;

            unit.parse(reader);

            if (type == 1 || type == 4) {
                this.units.push(new RoomUnit(id, roomIndex, username, unit.gender, figure, x, y, z, direction, direction));
            }

            // let index;
            // if (!window.habobba.room.users.find((user, i) => { return (index = i, user.id == id); })) {
            //     window.habobba.room.users.push(unit);
            // } else {
            //     window.habobba.room.users[index] = unit;
            // }
        }
    }
}