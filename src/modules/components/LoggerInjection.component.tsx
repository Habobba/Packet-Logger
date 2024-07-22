import React from "react"
import Tag from "../../components/Tag/Tag.component"
import Button from "../../components/Button/Button"

export default function LoggerInjection(): JSX.Element {
    return (
        <div className="hb-p-2 hb-flex-1 hb-flex hb-flex-row hb-gap-2 hb-flex-nowrap hb-bg-neutral-900 hb-m-2 hb-rounded-sm">
            <div className="hb-flex-[2_1_0%] hb-flex hb-flex-col hb-gap-2">
                <div className="hb-flex hb-justify-between hb-items-center hb-text-sm hb-h-7">
                    <Tag label="Não corrompido" type="success" />
                    <div className="hb-bg-neutral-800 hb-border hb-border-neutral-600 hb-rounded-[4px] hb-px-2 hb-py-1 hb-text-neutral-100 hb-flex hb-gap-4">
                        <span title="ID do Pacote" className="hb-text-gray-300 hb-text-sm hb-flex hb-items-center hb-gap-1">
                            <i className="fa-solid fa-hashtag"></i>
                            0
                        </span>
                        <span title="Comprimento" className="hb-text-gray-300 hb-text-sm hb-flex hb-items-center hb-gap-1">
                            <i className="fa-solid fa-ruler-horizontal"></i>
                            0
                        </span>
                    </div>
                </div>
                <textarea
                    className="hb-flex-1 hb-bg-neutral-800 hb-border hb-border-neutral-600 hb-rounded-[4px] hb-px-2 hb-py-1 hb-text-neutral-100 hb-outline-none focus:hb-border-neutral-400 hb-text-sm"
                    placeholder="Digite seu pacote aqui..."
                    spellCheck="false"
                ></textarea>
                <div className="hb-grid hb-grid-cols-2 hb-gap-2">
                    <Button type="info" message="Enviar para o servidor" classes="hb-py-[8px]" />
                    <Button type="success" message="Enviar para o cliente" classes="hb-py-[8px]" />
                </div>
            </div>
            <div className="hb-flex-1 hb-flex hb-flex-col hb-gap-2">
                <div className="hb-flex hb-justify-between hb-items-center hb-h-7">
                    <p className="hb-text-white">Histórico:</p>
                    <a href="#" className="hb-text-red-400 hover:hb-text-red-500">
                        <i className="fa-solid fa-sm fa-trash"></i>
                    </a>
                </div>
                <div className="hb-flex-1 hb-bg-neutral-800 hb-p-2 hb-overflow-auto hb-rounded-[4px] hb-border hb-border-neutral-600">
                    {/* Conteúdo do histórico */}
                </div>
            </div>
        </div>
    )
}