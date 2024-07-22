import React, { ComponentPropsWithoutRef } from 'react'

type ButtonProps = {
    message: string;
    type?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
    classes?: string;
    buttonProps?: ComponentPropsWithoutRef<'button'>;
}

export default function Button(props: ButtonProps) {
    const { message, type = "info", classes = "", buttonProps }: ButtonProps = props;

    const colors: Record<string, string> = {
        success: 'hb-bg-green-800 hover:hb-bg-green-700 active:hb-bg-green-900',
        danger: 'hb-bg-red-800 hover:hb-bg-red-700 active:hb-bg-red-900',
        warning: 'hb-bg-yellow-800 hover:hb-bg-yellow-700 active:hb-bg-yellow-900',
        info: 'hb-bg-blue-800 hover:hb-bg-blue-700 active:hb-bg-blue-900',
        neutral: 'hb-bg-neutral-800 hover:hb-bg-neutral-700 active:hb-bg-neutral-900',
    };

    return (
        <button className={`hb-text-white hb-rounded hb-px-5 hb-py-2 hb-transition-colors ${colors[type]} ${classes}`} {...buttonProps}>
            {message}
        </button>
    )
}