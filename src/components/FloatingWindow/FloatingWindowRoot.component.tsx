import React, { PropsWithChildren } from "react";

type FloatingWindowRootProps = PropsWithChildren<{}>

export default function FloatingWindowRoot(props: FloatingWindowRootProps): JSX.Element {
    const { children }: FloatingWindowRootProps = props;

    return (
        
        <div className="hb-min-h-[450px] hb-w-[750px] hb-bg-neutral-950 hb-flex hb-flex-col">
            {children}
        </div>
    );
}