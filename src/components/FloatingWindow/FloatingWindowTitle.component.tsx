import React from "react";

type FloatingWindowTitleProps = {
    title: string;
}

export default function FloatingWindowTitle(props: FloatingWindowTitleProps): JSX.Element {
    const { title }: FloatingWindowTitleProps = props;

    return (
        <header className="hb-w-100 hb-h-10 hb-bg-white/5 hb-flex hb-items-center hb-justify-between hb-p-4">
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
    );
}