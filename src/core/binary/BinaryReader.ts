
export class BinaryReader {

    private view: DataView;
    private binary = new Uint8Array(0);
    private offset = 0;

    constructor(binary: ArrayBuffer) {
        this.binary = new Uint8Array(binary);
        this.view = new DataView(binary);
        this.offset = 0;
    }

    seek(offset: number) {
        this.offset = offset;
    }

    skip(size: number) {
        this.offset += size;
    }

    readInt() {
        const value = this.view.getInt32(this.offset);
        this.offset += 4;
        return value;
    }

    readShort() {
        const value = this.view.getInt16(this.offset);
        this.offset += 2;
        return value;
    }

    readBoolean() {
        return !!this.binary[this.offset++];
    }

    readString() {
        const length = this.readShort();
        const str = new TextDecoder().decode(this.binary.slice(this.offset, this.offset + length));
        this.offset += length;
        return str;
    }
}