import React from "react"

type TagProps = {
    label: string;
    type?: "error" | "warning" | "success" | "info"
}

export default function Tag(props: TagProps): JSX.Element {
    const { label, type = "info" }: TagProps = props

    function renderStyle(type: typeof props["type"]): string {
        switch (type) {
            case "error":
                return "hb-text-red-400 hb-border-red-500 hb-bg-red-900";
            case "warning":
                return "hb-text-yellow-400 hb-border-yellow-500 hb-bg-yellow-900";
            case "success":
                return "hb-text-green-400 hb-border-green-400 hb-bg-green-900";
            case "info":
                return "hb-text-blue-400 hb-border-blue-500 hb-bg-blue-900";

            default:
                return "";
        }
    }

    return (
        <span className={`hb-block hb-w-min hb-whitespace-nowrap hb-px-2 hb-py-1 hb-text-xs hb-border hb-rounded-[4px] ${renderStyle(type)}`}>
            {label}
        </span>
    )
}