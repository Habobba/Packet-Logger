import React from "react";
import { ComponentPropsWithoutRef } from "react"

type TextFieldProps = {
    label: string;
    classes?: string;
    inputProps?: ComponentPropsWithoutRef<"input">
}

export default function TextField(props: TextFieldProps): JSX.Element {
    const { label, classes = "", inputProps }: TextFieldProps = props

    return (
        <label htmlFor="hb-inp-cod-integer" className="hb-flex-1 hb-flex hb-flex-col hb-gap-2 hb-text-neutral-100">
            <span>{label}</span>
            <input
                id="hb-inp-cod-integer"
                type="text"
                className={`hb-px-3 hb-py-2 hb-bg-neutral-800 hb-border hb-border-neutral-600 hb-rounded-[4px] hb-text-neutral-400 hb-outline-none focus:hb-border-neutral-400 focus:hb-text-white ${classes}`}
                {...inputProps}
            />
        </label>
    )
}