import React, { ComponentPropsWithoutRef, MouseEvent } from "react"

type TabItemProps = {
    label: string;
    active?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    buttonProps?: Omit<ComponentPropsWithoutRef<'button'>, "onClick">;
};

export default function TabItem(props: TabItemProps): JSX.Element {
    const { label, active, onClick, buttonProps }: TabItemProps = props;

    return (
        <button
            role="tab"
            className={`hb-px-2 hb-text-sm hb-font-semibold hover:hb-bg-neutral-900 hb-transition-all ${active ? 'hb-text-blue-600 hb-border-b-2 hb-border-blue-600' : 'hb-text-white'} hb-h-12 hb-flex hb-items-center`}
            onClick={onClick}
            {...buttonProps}
        >
            {label}
        </button>
    )
}