import React, { MouseEvent, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";

type FloatingWindowRootProps = PropsWithChildren<{
    title: string;
}>

export default function FloatingWindowRoot(props: FloatingWindowRootProps): JSX.Element {
    const { children, title }: FloatingWindowRootProps = props;

    const [dragging, setDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const initialPosition = useRef<{ x: number, y: number }>({ x: 0, y: 0});

    function onMouseDown(e: MouseEvent<HTMLElement>): void {
        setDragging(true);
        initialPosition.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    }

    const onMouseMove = useCallback((e: globalThis.MouseEvent): void => {
        if (!dragging) return;

        const dx = e.clientX - initialPosition.current.x;
        const dy = e.clientY - initialPosition.current.y;

        setPosition({ x: dx, y: dy });
    }, [dragging]);
    
    function onMouseUp(): void {
        setDragging(false);
    }
    
    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
    }, [onMouseMove])

    return (
        <div
            className="hb-min-h-[450px] hb-w-[750px] hb-bg-neutral-950 hb-flex hb-flex-col hb-absolute"
            style={{ left: position.x, top: position.y }}
        >
            <header
                className="hb-w-100 hb-h-10 hb-bg-white/5 hb-flex hb-items-center hb-justify-between hb-p-4"
                onMouseDown={onMouseDown}
            >
                <span className="hb-text-white hb-text-sm hb-font-semibold">{title}</span>
                <div className="hb-flex hb-gap-3 hb-items-center">
                    <span className="hb-text-white hb-cursor-pointer hover:hb-text-blue-400">
                        <i className="fa-solid fa-sm fa-chevron-down"></i>
                    </span>
                    <span className="hb-text-white hb-cursor-pointer hover:hb-text-red-400">
                        <i className="fa-solid fa-sm fa-times"></i>
                    </span>
                </div>
            </header>
            {children}
        </div>
    );
}