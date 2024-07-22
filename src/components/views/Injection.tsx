import React from 'react';
import FakeButton from '../ui/FakeButton';
import Button from '../ui/Button';

export default function Injection() {
    return (
        <div className="hb-flex hb-h-full">
            <div className="hb-flex-1 hb-flex hb-flex-col hb-p-1">
                <div className="hb-flex hb-justify-between hb-text-sm hb-mb-2">
                    <FakeButton type="success" message="Não corrompido" />
                    <div className="hb-text-gray-500 hb-h-full hb-flex hb-items-center hb-gap-7 hb-py-px hb-bg-neutral-800 hb-px-3 hb-border hb-rounded-md hb-border-neutral-600">
                        <span title="ID do Pacote"><i className="fa-solid fa-hashtag"></i> <b>0</b></span>
                        <span title="Comprimento"><i className="fa-solid fa-wave-square"></i> <b>0</b></span>
                    </div>
                </div>
                <textarea
                    className="hb-flex-1 hb-bg-neutral-800 hb-border hb-border-neutral-600 hb-rounded hb-p-2 hb-mb-1 hb-text-white focus:hb-outline-none hb-text-sm"
                    placeholder="Digite seu pacote aqui..."
                    spellCheck="false"
                ></textarea>
                <div className="hb-grid hb-grid-cols-2 hb-gap-2">
                    <Button type="info" message="Enviar para o Servidor" classes="hb-py-[8px] hb-font-bold" />
                    <Button type="success" message="Enviar para o Cliente" classes="hb-py-[8px] hb-font-bold" />
                </div>
            </div>
            <div className="hb-flex hb-flex-col hb-w-1/4 hb-p-1">
                <div className="hb-flex hb-justify-between hb-mb-[10px]">
                    <span className="hb-text-white hb-font-semibold">Histórico</span>
                    <a href="#" className="hb-text-red-400 hover:hb-text-red-500">
                        <i className="fa-solid fa-sm fa-trash"></i>
                    </a>
                </div>
                <div className="hb-flex-1 hb-bg-neutral-800 hb-p-2 hb-overflow-auto hb-rounded hb-border hb-border-neutral-600">
                    {/* Conteúdo do histórico */}
                </div>
            </div>
        </div>
    );
}