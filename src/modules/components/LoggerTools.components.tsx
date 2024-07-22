import React from "react"
import { Fields } from "../../components/Fields"
import Button from "../../components/Button/Button"

export default function LoggerTools(): JSX.Element {
    return (
        <div className="hb-p-2 hb-flex-1 hb-flex hb-flex-col hb-gap-4 hb-bg-neutral-900 hb-m-2 hb-rounded-sm">
            <fieldset className="hb-flex hb-flex-col hb-gap-2 hb-rounded-[4px] hb-border hb-border-neutral-800 hb-p-2">
                <div className="hb-flex hb-flex-row hb-gap-4 hb-items-center hb-text-neutral-100">
                    <Fields.Text label="Inteiro decodificado" />
                    <span>&#x21c4;</span>
                    <Fields.Text label="Inteiro codificado" />
                </div>
                <div className="hb-flex hb-flex-row hb-gap-4 hb-items-center hb-text-neutral-100">
                    <Fields.Text label="UShort codificado" />
                    <span className="hb-flex hb-items-center">&#x21c4;</span>
                    <Fields.Text label="UShort decodificado" />
                </div>
                <div className="hb-flex hb-flex-row hb-gap-4">
                    <Button message="Codificar" type="neutral" />
                    <Button message="Decodificar" type="neutral" />
                </div>
            </fieldset>
            <fieldset className="hb-flex hb-flex-col hb-gap-2 hb-rounded-[4px] hb-border hb-border-neutral-800 hb-p-2">
                <div className="hb-flex hb-flex-row hb-gap-4">
                    <Fields.Text label="Pacote" />
                    <div className="hb-flex hb-flex-col hb-gap-4">
                        <Button message="&#x21e2;" type="neutral" />
                        <Button message="&#x21e0;" type="neutral" />
                    </div>
                    <Fields.Text label="Expressão" />
                </div>
            </fieldset>
        </div>
    )
}