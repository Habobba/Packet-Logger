import { BinaryReader } from "./BinaryReader";

export type InterceptionCallback = (reader: BinaryReader) => boolean | Promise<boolean>;

export class WebSocketProxy extends EventTarget {

    private static _incomingInterceptions: Record<number, InterceptionCallback[]> = {};
    private static _outgoingInterceptions: Record<number, InterceptionCallback[]> = {};
    private static WebSocket = WebSocket;
    static instance: WebSocket;
    static proxy: WebSocketProxy;

    set onmessage(value: any) {
        WebSocketProxy.instance.onmessage = value;
    }
    set onopen(value: any) {
        WebSocketProxy.instance.onopen = value;
    }
    set onerror(value: any) {
        WebSocketProxy.instance.onerror = value;
    }
    set onclose(value: any) {
        WebSocketProxy.instance.onclose = value;
    }

    constructor(endpoint: string) {
        super();

        WebSocketProxy.proxy = this;

        WebSocketProxy.instance = new WebSocketProxy.WebSocket(endpoint);
        WebSocketProxy.instance.binaryType = "arraybuffer";

        WebSocketProxy.instance.addEventListener("message", async (e) => {
            const reader = new BinaryReader(e.data);
            reader.skip(4); // Skip length
            const header = reader.readShort();

            const interceptors = WebSocketProxy._incomingInterceptions[header];
            if (interceptors) {
                for (const interceptor of interceptors) {
                    const ret = interceptor(reader);
                    let supress: boolean = false;

                    if (ret instanceof Promise) {
                        supress = await ret;
                    } else {
                        supress = ret;
                    }

                    if (supress) {
                        return;
                    }
                    reader.seek(6);
                }
            }

            this.dispatchEvent(
                new MessageEvent("message", {
                    data: e.data,
                })
            );
        });

        WebSocketProxy.instance.addEventListener("open", () => {
            this.dispatchEvent(
                new MessageEvent("open", {})
            );
        });

        WebSocketProxy.instance.addEventListener("close", () => {
            this.dispatchEvent(
                new MessageEvent("close", {})
            );
        });

        WebSocketProxy.instance.addEventListener("error", () => {
            this.dispatchEvent(
                new MessageEvent("error", {})
            );
        });
    }

    async send(data: ArrayBufferLike) {
        const reader = new BinaryReader(data);
        reader.skip(4); // Skip length
        const header = reader.readShort();

        const interceptors = WebSocketProxy._outgoingInterceptions[header];
        if (interceptors) {
            for (const interceptor of interceptors) {
                const ret = interceptor(reader);
                let supress: boolean = false;

                if (ret instanceof Promise) {
                    supress = await ret;
                } else {
                    supress = ret;
                }

                if (supress) {
                    return;
                }
                reader.seek(6);
            }
        }
        WebSocketProxy.instance.send(data);
    }

    static sendIncoming(data: ArrayBufferLike) {
        WebSocketProxy.proxy.dispatchEvent(
            new MessageEvent("message", { data })
        );
    }

    static sendOutgoing(data: ArrayBufferLike) {
        WebSocketProxy.instance.send(data);
    }

    static interceptIncoming(header: number, callback: InterceptionCallback) {
        if (!WebSocketProxy._incomingInterceptions[header]) {
            WebSocketProxy._incomingInterceptions[header] = [];
        }

        WebSocketProxy._incomingInterceptions[header].push(callback);
    }

    static interceptOutgoing(header: number, callback: InterceptionCallback) {
        if (!WebSocketProxy._outgoingInterceptions[header]) {
            WebSocketProxy._outgoingInterceptions[header] = [];
        }

        WebSocketProxy._outgoingInterceptions[header].push(callback);
    }

    static run() {
        (window as any).WebSocket = WebSocketProxy;
    }

}