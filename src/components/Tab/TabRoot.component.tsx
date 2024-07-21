import React, { PropsWithChildren } from "react"

type TabRootProps = PropsWithChildren<{}>

export default function TabRoot(props: TabRootProps): JSX.Element {
    const { children }: TabRootProps = props;

    return (
        <div role="tablist" className="hb-w-full hb-flex hb-gap-4 hb-h-12">
            {children}
        </div>
    )
}