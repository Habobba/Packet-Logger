
class ByteBuffer {

    data: Uint8Array;
    offset: number;

    constructor(size: number) {
        this.data = new Uint8Array(size);
        this.offset = 0;
    }

    putInt(value: number) {
        this.data[this.offset++] = (value >> 24) & 0xFF;
        this.data[this.offset++] = (value >> 16) & 0xFF;
        this.data[this.offset++] = (value >> 8) & 0xFF;
        this.data[this.offset++] = value & 0xFF;

        return this;
    }

    putShort(value: number) {
        this.data[this.offset++] = (value >> 8) & 0xFF;
        this.data[this.offset++] = value & 0xFF;

        return this;
    }

    toString() {
        return Array.from(this.data, byte => {
            if (byte < 32 || (byte > 126 && byte < 160)) {
                return `[${byte}]`
            }
            return String.fromCharCode(byte);
        }).join('');
    }

}

export default class HPacket {

    headerId: number;
    private offset = 0;

    constructor(public data: Uint8Array) {
        this.skip(4);
        this.headerId = this.readShort();
    }

    seek(offset: number) {
        this.offset = offset;
    }

    skip(size: number) {
        this.offset += size;
    }

    readInt() {
        return (this.data[this.offset++] << 24) |
            (this.data[this.offset++] << 16) |
            (this.data[this.offset++] << 8) |
            this.data[this.offset++];
    }

    readShort() {
        return (this.data[this.offset++] << 8) |
            this.data[this.offset++];
    }

    static fromString(packet: string) {
        let fixLengthLater = false;
        if (packet.startsWith("{h:")) {
            fixLengthLater = true;
        }

        // note: in String expressions {s:"string"}, character " needs to be backslashed -> \" if used in string
        packet = packet.replace(/{i:(-?\d+)}/g, (match, p1) =>
            new ByteBuffer(4).putInt(parseInt(p1)).toString()
        );

        // packet = packet.replace(/\\{l:(-?[0-9]+)}/g, (match, p1) =>
        //     new ByteBuffer(8).putLong(parseInt(p1)).toString()
        // );

        // packet = packet.replace(/\\{d:(-?[0-9]*\\.[0-9]*)}/g, (match, p1) =>
        //     new ByteBuffer(8).putDouble(parseInt(p1)).toString()
        // );

        packet = packet.replace(/{u:([0-9]+)}/g, (match, p1) =>
            "[" + ((parseInt(p1) >> 8) & 0xFF) + "][" + (parseInt(p1) & 0xFF) + "]"
        );

        packet = packet.replace(/{h:(-?[0-9]+)}/g, (match, p1) =>
            new ByteBuffer(2).putShort(parseInt(p1)).toString()
        );

        packet = packet.replace(/{b:([Ff]alse|[Tt]rue)}/g, (match, p1) =>
            p1.toLowerCase() == "true" ? "[1]" : "[0]"
        );

        packet = packet.replace(/{b:([0-9]{1,3})}/g, (match, p1) =>
            `[${parseInt(p1) & 0xFF}]`
        );

        while (packet.includes("{s:\"")) {
            let start = packet.indexOf("{s:\"");
            let end = -1;
            let valid = false;
            do {
                end = packet.indexOf("\"}", end + 1);

                valid = false;
                if (end != -1) {
                    let amountBackslashes = 0;
                    let pos = end - 1;

                    while (pos >= start + 4 && packet.charAt(pos) == '\\') {
                        amountBackslashes++;
                        pos -= 1;
                    }

                    valid = amountBackslashes % 2 == 0;
                }
            } while (end != -1 && !valid);

            if (end == -1) {
                // throw new Error("InvalidPacketException");
                return null;
            }

            let match = packet.substring(start + 4, end);

            let strBytes = new TextEncoder().encode(match);

            packet = packet.substring(0, start) +
                `${new ByteBuffer(2).putShort(strBytes.length)}${new TextDecoder('iso-8859-1').decode(strBytes)}` +
                packet.substring(end + 2);
        }

        let identifier: string | null = null;
        if (!fixLengthLater && packet.startsWith("{")) {
            packet = packet.replace(/^\\{((in|out):[^:{}]*)}/g, (match, p1) => {
                identifier = p1;
                return "[255][255]";
            });
        }
        if (identifier != null) fixLengthLater = true;

        if (packet.includes("{") || packet.includes("}")) {
            // throw new Error("InvalidPacketException");
            return null;
        }

        let corrupted = false;
        packet = packet.replace(/\[([0-9]{1,3})\]/g, (match, p1) => {
            let b = parseInt(p1);
            if (b < 0 || b >= 256) {
                corrupted = true;
                return "";
            }
            return new TextDecoder('iso-8859-1').decode(new Uint8Array([b > 127 ? b - 256 : b]));
        });

        if (corrupted) {
            // throw new Error("InvalidPacketException");
            return null;
        }

        let bytes = new Uint8Array(packet.split('').map(x => x.charCodeAt(0)))

        if (fixLengthLater) {
            let fixed = new Uint8Array(bytes.length + 4);
            fixed.set(new ByteBuffer(4).putInt(bytes.length).data);
            fixed.set(bytes, 4);

            bytes = fixed;
        }

        const hPacket = new HPacket(bytes);

        return hPacket;
    }

}