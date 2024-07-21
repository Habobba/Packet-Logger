import React, { PropsWithChildren } from "react";

type FloatingWindowContentProps = PropsWithChildren<{}>;

export default function FloatingWindowContent(props: FloatingWindowContentProps): JSX.Element {
    const { children }: FloatingWindowContentProps = props;

    return (
        <div className="hb-flex hb-flex-col hb-flex-1 hb-overflow-y-scroll">
            {children}
        </div>
    );
}