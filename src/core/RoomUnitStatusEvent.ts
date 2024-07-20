import { BinaryReader } from "./BinaryReader";
import { RoomUnitStatusAction } from "./RoomUnitStatusAction";
import { RoomUnitStatusMessage } from "./RoomUnitStatusMessage";


export class RoomUnitStatusEvent {

    statuses: RoomUnitStatusMessage[] = [];

    constructor(reader: BinaryReader) {
        this.parse(reader);
    }

    parse(reader: BinaryReader) {
        let i = reader.readInt();
        for (; i > 0; i--) {
            this.parseStatus(reader);
        }
    }

    private parseStatus(reader: BinaryReader) {
        const unitId = reader.readInt();
        const x = reader.readInt();
        const y = reader.readInt();
        const z = parseFloat(reader.readString());
        const headDirection = reader.readInt() % 8;
        const direction = reader.readInt() % 8;
        const actions = reader.readString();

        let targetX = 0;
        let targetY = 0;
        let targetZ = 0;
        let height = 0;
        let canStandUp = false;
        let didMove = false;
        const isSlide = false;

        if (actions) {
            const actionParts = actions.split('/');
            const statusActions: RoomUnitStatusAction[] = [];

            for (const action of actionParts) {
                const parts = action.split(' ');

                if (parts[0] === '') continue;

                if (parts.length >= 2) {
                    switch (parts[0]) {
                        case 'mv': {
                            const values = parts[1].split(',');

                            if (values.length >= 3) {
                                targetX = parseInt(values[0]);
                                targetY = parseInt(values[1]);
                                targetZ = parseFloat(values[2]);
                                didMove = true;
                            }

                            break;
                        }
                        case 'sit': {
                            const sitHeight = parseFloat(parts[1]);

                            if (parts.length >= 3) canStandUp = (parts[2] === '1');

                            height = sitHeight;

                            break;
                        }
                        case 'lay': {
                            const layHeight = parseFloat(parts[1]);

                            height = Math.abs(layHeight);

                            break;
                        }
                    }

                    statusActions.push(new RoomUnitStatusAction(parts[0], parts[1]));
                }
            }

            this.statuses.push(new RoomUnitStatusMessage(unitId, x, y, z, height, headDirection, direction, targetX, targetY, targetZ, didMove, canStandUp, statusActions));
        }
    }

}