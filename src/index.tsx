import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import './styles/style.css';

import { WebSocketProxy } from "./WebSocketProxy";
import { RoomUnitEvent } from './RoomUnitEvent';
import { Habobba } from './Habobba';
import { BinaryWriter } from './BinaryWriter';
import { RoomUnitStatusEvent } from './RoomUnitStatusEvent';

const styles: React.CSSProperties = {
    zIndex: 401,
    top: "calc(-290.5px + 50vh)",
    left: "calc(-127.5px + 50vw)",
    visibility: "visible"
};

if (window.location.search != '') {
    const response: { [key: string]: string } = {}
    for (const param of window.location.search.substring(1).split('&')) {
        let _ = param.split('=');
        response[_[0]] = _[1];
    }

    window.opener.postMessage({
        type: "SPOTIFY_AUTH",
        response
    });
    window.close();
}

const ALPHABET = 'áéíóúâêîôûãõüABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"ç#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ '

function generateKey(length: number) {
    let key = '';
    for (let i = 0; i < length; i++) {
        key += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return key;
}

function encrypt(message: string, key: string) {
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        let mIndex = ALPHABET.indexOf(message.charAt(i));
        let kIndex = ALPHABET.indexOf(key.charAt(i));
        let encryptedIndex = (mIndex + kIndex) % ALPHABET.length;
        encryptedMessage += ALPHABET.charAt(encryptedIndex);
    }
    return encryptedMessage;
}

function decrypt(encryptedMessage: string, key: string) {
    let decryptedMessage = '';
    for (let i = 0; i < encryptedMessage.length; i++) {
        let emIndex = ALPHABET.indexOf(encryptedMessage.charAt(i));
        let kIndex = ALPHABET.indexOf(key.charAt(i));
        let decryptedIndex = (emIndex - kIndex + ALPHABET.length) % ALPHABET.length;
        decryptedMessage += ALPHABET.charAt(decryptedIndex);
    }
    return decryptedMessage;
}

const defaultKey = '$!2bUyiuAT~lMSéxoDüzfC7xôGgA#û}D6Uf15lúR+N1ã&SE-q9BvxgOCõPCXcü7/jfTxãtzõ3DKd;^0hREKR9â@-);}Oêé&5úmut';

function msToTime(ms: number) {
    let seconds: number | string = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    seconds = (seconds - minutes * 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
}

async function getAccessToken(code: string, clientId: string, clientSecret: string) {
    const url = 'https://accounts.spotify.com/api/token';

    const data: { [key: string]: string } = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: "https://www.habblet.city/hotelv2"
    };

    const params = new URLSearchParams();

    for (const key in data) {
        params.append(key, data[key]);
    }

    const body = params.toString();

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${btoa(clientId + ':' + clientSecret)}`
        },
        body
    });

    return await response.json();
}

async function getCurrentPlayback(access_token: string) {
    const url = 'https://api.spotify.com/v1/me/player/currently-playing';

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    if (response.status === 204 || response.status > 400) {
        return null;
    }

    return await response.json();
}

function directionToVector(direction: number) {
    if (direction == 0) return { x: 0, y: -1 };
    if (direction == 1) return { x: 1, y: -1 };
    if (direction == 2) return { x: 1, y: 0 };
    if (direction == 3) return { x: 1, y: 1 };
    if (direction == 4) return { x: 0, y: 1 };
    if (direction == 5) return { x: -1, y: 1 };
    if (direction == 6) return { x: -1, y: 0 };
    return { x: -1, y: -1 };
}

const App = () => {
    const habobbaWindowRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const muteAllRef = useRef<HTMLInputElement>(null);
    const furniRenderRef = useRef<HTMLInputElement>(null);
    const antiAusRef = useRef<HTMLInputElement>(null);
    const criptographyRef = useRef<HTMLInputElement>(null);
    const criptographyKeyRef = useRef<HTMLInputElement>(null);
    const copyCheckBoxRef = useRef<HTMLInputElement>(null);
    const hideTypingRef = useRef<HTMLInputElement>(null);
    const spotifyCheckboxRef = useRef<HTMLInputElement>(null);

    const [playerSufix, setPlayerSufix] = useState('');
    const [criptographyKey, setCriptographyKey] = useState('');
    const [playerClientId, setPlayerClientId] = useState('');
    const [playerClientSec, setPlayerClientSec] = useState('');

    useEffect(() => {
        const headerElement = headerRef.current;
        const habobbaWindowElement = habobbaWindowRef.current;
        const muteAllElement = muteAllRef.current;
        const copyCheckBoxElement = copyCheckBoxRef.current;
        const criptographyElement = criptographyRef.current;
        const criptographyKeyElement = criptographyKeyRef.current;
        const furniRenderElement = furniRenderRef.current;
        const antiAusElement = antiAusRef.current;
        const hideTypingElement = hideTypingRef.current;

        const searcher = setInterval(() => {
            const element = document.querySelector(".icon-camera");

            const ads1 = document.querySelector("#ads1");

            if (ads1) {
                ads1.remove();
                document.querySelector("#ads2")?.remove();
            }

            if (element) {
                clearInterval(searcher);

                const div = document.createElement("div");
                div.innerHTML = `<div class="cursor-pointer navigation-item icon habobba-icon"></div>`
                const habobbaIcon = div.children[0] as HTMLDivElement;

                habobbaIcon.onclick = () => {
                    if (!habobbaWindowElement) return;
                    if (habobbaWindowElement.style.visibility == "hidden") {
                        habobbaWindowElement.style.visibility = "visible";
                        habobbaWindowElement.style.display = "block";
                    } else {
                        habobbaWindowElement.style.display = "none";
                        habobbaWindowElement.style.visibility = "hidden";
                    }
                }

                document.querySelector(".navigation-item")?.parentElement?.appendChild(habobbaIcon);
            }
        }, 100);

        WebSocketProxy.run();
        WebSocketProxy.interceptIncoming(1446, (reader) => {
            if (muteAllElement?.checked) {
                return true;
            }

            let roomIndex = reader.readInt();
            let message = reader.readString();
            let gesture = reader.readInt();
            let bubble = reader.readInt();

            if (criptographyElement?.checked && message.startsWith("ms!")) {
                const key = criptographyKey == '' ? defaultKey : criptographyKey;

                message = "[Anônimo] " + decrypt(message.substring(3), key);
                let length = new TextEncoder().encode(message).length;
                const p = new BinaryWriter(1446);
                p.writeInt(roomIndex);
                p.writeString(message);
                p.writeInt(gesture);
                p.writeInt(bubble);
                p.writeInt(0);
                p.writeInt(length);
                WebSocketProxy.sendIncoming(p.compose());

                return true;
            }

            return false;
        });

        WebSocketProxy.interceptIncoming(374, (reader) => {
            const event = new RoomUnitEvent(reader);

            for (const unit of event.units)
                Habobba.room.addUnit(unit);

            return false;
        });

        WebSocketProxy.interceptIncoming(1778, (reader) => {
            if (furniRenderElement?.checked) {
                return true;
            }

            return false;
        });

        WebSocketProxy.interceptOutgoing(1314, (reader) => {
            let message = reader.readString();
            let bubble = reader.readInt();
            let argv = message.split(" ");

            if (argv[0] == ":copy") {
                if (copyCheckBoxElement?.checked) {
                    const user = Habobba.room.getUnitByUsername(argv.slice(1).join(' '));
                    if (user) {
                        const packet = new BinaryWriter(2730);
                        packet.writeString(user.gender);
                        packet.writeString(user.figure);
                        const data = packet.compose();

                        WebSocketProxy.sendOutgoing(data);
                    }
                    return true;
                }
            } else if (argv[0] == ":cmds") {
                const values: { [key: string]: string } = {
                    "title": "Comandos",
                    "message":
                        ":copy username -> Copia um usuário ou bot sem restrições.\n" +
                        ":maxfloor -> Preencher o quarto inteiro com pisos no floor."
                }

                const packet = new BinaryWriter(1992);
                packet.writeString("");
                packet.writeInt(Object.keys(values).length);
                for (const key in values) {
                    packet.writeString(key);
                    packet.writeString(values[key]);
                }
                const data = packet.compose();

                WebSocketProxy.sendIncoming(data);
                return true;
            } else if (argv[0] == ":maxfloor") {
                const packet = new BinaryWriter(875);
                packet.writeString(
                    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "0000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000\r" +
                    "x000000000000000000000000000000000000000000000000000000000000000");
                packet.writeInt(3);
                packet.writeInt(5);
                packet.writeInt(2);
                packet.writeInt(0);
                packet.writeInt(0);
                packet.writeInt(-1);
                const data = packet.compose();

                WebSocketProxy.sendOutgoing(data);
                return true;
            } else if (criptographyElement?.checked && criptographyKeyElement) {
                const packet = new BinaryWriter(1314);
                const msg = message.length >= 100 ? message.substring(0, message.length - 3) : message;
                const key = criptographyKey == '' ? defaultKey : criptographyKey;
                packet.writeString(`ms!${encrypt(msg, key)}`);
                packet.writeInt(bubble);
                WebSocketProxy.sendOutgoing(packet.compose());
                return true;
            }

            return false;
        });

        WebSocketProxy.interceptIncoming(1640, (reader) => {
            const event = new RoomUnitStatusEvent(reader);

            for (const status of event.statuses) {
                const user = Habobba.room.getUnitByRoomIndex(status.id);
                if (user) {
                    user.x = status.x;
                    user.y = status.y;
                    user.z = status.z;
                    user.targetX = status.targetX;
                    user.targetY = status.targetY;
                    user.targetZ = status.targetZ;
                    user.bodyDirection = status.direction;
                    user.headDirection = status.headDirection;
                }
            }

            return false;
        });

        WebSocketProxy.interceptIncoming(2725, (reader) => {
            Habobba.userInfo.id = reader.readInt();
            Habobba.userInfo.username = reader.readString();
            Habobba.userInfo.figure = reader.readString();

            return false;
        });

        WebSocketProxy.interceptIncoming(758, (reader) => {
            Habobba.room.flush();
            return false;
        });

        WebSocketProxy.interceptIncoming(1797, (reader) => {
            if (antiAusElement?.checked) {
                // const packet = new BinaryWriter(2456);
                // packet.writeInt(3);

                const me = Habobba.room.getUnitByUsername(Habobba.userInfo.username);
                if (!me) return false;

                let offset = directionToVector(me.bodyDirection);

                const packet = new BinaryWriter(3301);
                packet.writeInt(me.x + offset.x);
                packet.writeInt(me.y + offset.y);
                WebSocketProxy.sendOutgoing(packet.compose());
            }

            return false;
        });

        WebSocketProxy.interceptOutgoing(1597, (reader) => {
            if (hideTypingElement?.checked) {
                return true;
            }

            return false;
        })

        let dragging = false;
        let offsetx = 0;
        let offsety = 0;
        const handleMouseDown = (e: MouseEvent) => {
            if (!habobbaWindowElement) return;

            if ((e.target as HTMLElement).classList.contains("nitro-card-header-close")) {
                habobbaWindowElement.style.display = "none";
                habobbaWindowElement.style.visibility = "hidden";
                return;
            }

            dragging = true;
            let bounds = habobbaWindowElement.getBoundingClientRect();

            offsetx = e.clientX - bounds.left;
            offsety = e.clientY - bounds.top;
        };

        const handleMouseUp = (e: MouseEvent) => {
            dragging = false;
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!habobbaWindowElement) return;

            if (dragging) {
                habobbaWindowElement.style.left = `${e.clientX - offsetx}px`;
                habobbaWindowElement.style.top = `${e.clientY - offsety}px`;
            }
        }

        let control = false;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key == "Control") {
                control = true;
            }
        }
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key == "Control") {
                control = false;
            } else if (e.key != "ArrowLeft" && e.key != "ArrowRight" && e.key != "ArrowUp" && e.key != "ArrowDown") {
                return;
            }

            if (!control) return;

            const me = Habobba.room.getUnitByUsername(Habobba.userInfo.username);
            if (!me) return false;
            let offset;

            // let bodyDirection = Math.floor(me.bodyDirection / 2) * 2;

            // if (e.key == "ArrowLeft") {
            //     offset = directionToVector((bodyDirection + 2) % 8);
            // } else {
            //     offset = directionToVector(bodyDirection - 2 < 0 ? 6 : me.bodyDirection - 2);
            // }

            if (e.key == "ArrowUp") {
                offset = directionToVector(6);
            } else if (e.key == "ArrowRight") {
                offset = directionToVector(0);
            } else if (e.key == "ArrowDown") {
                offset = directionToVector(2);
            } else {
                offset = directionToVector(4);
            }

            const packet = new BinaryWriter(3301);
            packet.writeInt(me.x + offset.x);
            packet.writeInt(me.y + offset.y);
            WebSocketProxy.sendOutgoing(packet.compose());
        }

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        if (headerElement) {
            headerElement.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousedown', handleMouseMove);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            if (headerElement) {
                headerElement.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, []);
    
    useEffect(() => {
        const spotifyCheckboxElement = spotifyCheckboxRef.current;

        const handleSpotifyCheckboxChange = () => {
            if (spotifyCheckboxElement?.checked) {
                const redirect_uri = "https://www.habblet.city/hotelv2";
                const scopes = 'user-read-playback-state';

                const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${playerClientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=abcdefghijklmnop`;

                const width = 450,
                    height = 730,
                    left = (screen.width / 2) - (width / 2),
                    top = (screen.height / 2) - (height / 2);

                // window.location = authUrl as any;
                window.open(authUrl, 'Spotify Authorization', `width=${width},height=${height},top=${top},left=${left}`);
            }
        }

        const handleWindowMessage = async (e: MessageEvent<any>) => {
            if (e.data.type == "SPOTIFY_AUTH") {
                spotifyCheckboxElement && (spotifyCheckboxElement.checked = true);
                const _ = await getAccessToken(e.data.response.code, playerClientId, playerClientSec);
                setInterval(async () => {
                    if (_ != null) {
                        const trackInfo = await getCurrentPlayback(_.access_token);

                        if (trackInfo && trackInfo.item != undefined) {
                            const name = ` [${trackInfo.item.name}] `;
                            const padcount = Math.max(Math.floor((26 - name.length) / 2), 0);

                            const tackerLength = 14;
                            const progress = trackInfo.progress_ms / trackInfo.item.duration_ms;
                            const pos = Math.floor(progress * tackerLength);
                            const motto = `${'>'.repeat(padcount)} [${trackInfo.item.name}] ${'<'.repeat(padcount)} ${msToTime(trackInfo.progress_ms)} ${'='.repeat(Math.max(pos - 1, 0))}O${'-'.repeat(tackerLength - pos)} ${msToTime(trackInfo.item.duration_ms)} ${playerSufix}`;

                            const packet = new BinaryWriter(2228);
                            packet.writeString(motto);
                            WebSocketProxy.sendOutgoing(packet.compose());
                            // access_token
                            // token_type
                            // expires_in
                            // refresh_token
                            // scope
                        }
                    }
                }, 1_000);
            }
        }

        spotifyCheckboxElement?.addEventListener("change", handleSpotifyCheckboxChange);
        window.addEventListener("message", handleWindowMessage);

        return () => {
            window.removeEventListener('message', handleWindowMessage);
            if (spotifyCheckboxElement) {
                spotifyCheckboxElement.removeEventListener('change', handleSpotifyCheckboxChange);
            }
        };
    }, [playerClientId, playerClientSec, playerSufix])

    const handlePlayerSufixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerSufix(event.target.value);
    };

    const handleCriptographyKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCriptographyKey(event.target.value);
    };

    const handlePlayerClientIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerClientId(event.target.value);
    };

    const handlePlayerClientSecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerClientSec(event.target.value);
    };

    return (
        <div ref={habobbaWindowRef} className='position-absolute draggable-window' style={styles}>
            <div className='d-flex overflow-hidden position-relative flex-column nitro-card theme-primary-slim nitro-room-construction-tool'>
                <div ref={headerRef} className='d-flex position-relative flex-column gap-2 align-items-center justify-content-center drag-handler container-fluid nitro-card-header'>
                    <div className='d-flex w-100 align-items-center justify-content-center'>
                        <span className="nitro-card-header-text">Habobba - Master Script</span>
                        <div className="position-absolute end-0 nitro-card-header-close"></div>
                    </div>
                </div>
                <div className='d-flex overflow-auto flex-column gap-2 container-fluid content-area text-black content'>
                    <div className="line">
                        <p className="header-text fw-bold">Diversão</p>
                    </div>

                    <div className="d-flex gap-2 align-items-center justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                            <label className="switch">
                                <input ref={spotifyCheckboxRef} type="checkbox" id="spotify" />
                                <span className="slider"></span>
                            </label>
                            <div className="d-inline text-black option-name">Player do Spotify na missão</div>
                        </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                            <input type="text" onChange={handlePlayerClientIdChange} className="form-control form-control-sm" placeholder="Client ID" value={playerClientId} />
                            <input type="text" onChange={handlePlayerClientSecChange} className="form-control form-control-sm" placeholder="Client Secret" value={playerClientSec} />
                            <input type="text" onChange={handlePlayerSufixChange} className="form-control form-control-sm" placeholder="Sufixo do player" value={playerSufix} />
                        </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                            <label className="switch">
                                <input ref={copyCheckBoxRef} type="checkbox" />
                                <span className="slider"></span>
                            </label>
                            <div className="d-inline text-black option-name">Comando :copy</div>
                        </div>
                    </div>

                    <div className="line">
                        <p className="header-text fw-bold">Privacidade</p>
                    </div>

                    <div className="d-flex gap-2 align-items-center justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                            <label className="switch">
                                <input ref={hideTypingRef} type="checkbox" />
                                <span className="slider"></span>
                            </label>
                            <div className="d-inline text-black option-name">Ocultar balão digitando</div>
                        </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                            <label className="switch">
                                <input ref={criptographyRef} type="checkbox" id="criptography" />
                                <span className="slider"></span>
                            </label>
                            <div className="d-inline text-black option-name">Conversa criptografada</div>
                        </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <input ref={criptographyKeyRef} type="text" onChange={handleCriptographyKeyChange} className="form-control form-control-sm" placeholder="Chave criptográfica" value={criptographyKey} />
                    </div>
                    <div className="line">
                        <p className="header-text fw-bold">Utilitários / Performance</p>
                    </div>
                    <div className="d-flex gap-2 align-items-center justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                            <label className="switch">
                                <input ref={muteAllRef} type="checkbox" />
                                <span className="slider"></span>
                            </label>
                            <div className="d-inline text-black option-name">Mutar todos da sala</div>
                        </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                            <label className="switch">
                                <input ref={furniRenderRef} type="checkbox" />
                                <span className="slider"></span>
                            </label>
                            <div className="d-inline text-black option-name">Não renderizar mobis da sala</div>
                        </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                            <label className="switch">
                                <input ref={antiAusRef} type="checkbox" />
                                <span className="slider"></span>
                            </label>
                            <div className="d-inline text-black option-name">Anti ausente</div>
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex gap-2">
                            <button className="btn btn-secondary">Adicionar todos do quarto</button>
                        </div>
                    </div>
                    <hr />
                    <div>
                        Status: <span style={{ color: "#1cbf23" }}>Ativo</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('draggable-windows-container'));
