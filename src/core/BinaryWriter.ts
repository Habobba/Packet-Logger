

export class BinaryWriter {

    binary = new Uint8Array(0);
    offset = 0;

    constructor(header: number) {
        this.writeInt(0);
        this.writeShort(header);
    }

    resize(size: number) {
        const buffer = new Uint8Array(size);
        buffer.set(this.binary);

        this.binary = buffer;
    }

    writeInt(value: number) {
        if (this.offset + 4 > this.binary.length) {
            this.resize(this.offset + 4);
        }

        this.binary[this.offset++] = (value >> 24) & 0xFF;
        this.binary[this.offset++] = (value >> 16) & 0xFF;
        this.binary[this.offset++] = (value >> 8) & 0xFF;
        this.binary[this.offset++] = value & 0xFF;
        return this;
    }

    writeShort(value: number) {
        if (this.offset + 2 > this.binary.length) {
            this.resize(this.offset + 2);
        }

        this.binary[this.offset++] = (value >> 8) & 0xFF;
        this.binary[this.offset++] = value & 0xFF;
        return this;
    }

    writeString(value: string) {
        const data = new TextEncoder().encode(value);
        this.writeShort(data.length);

        if (this.offset + data.length > this.binary.length) {
            this.resize(this.offset + data.length);
        }

        for (let i = 0; i < data.length; i++) {
            this.binary[this.offset + i] = data[i];
        }
        this.offset += data.length;
        return this;
    }

    compose() {
        this.offset = 0;
        this.writeInt(this.binary.length - 4);
        return this.binary.buffer;
    }
}