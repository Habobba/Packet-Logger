import React from "react"

export default function LoggerExtensions(): JSX.Element {
    const extensions = [
        { title: 'Extensions Store', description: 'Loja de extensões', author: 'CoreDuo', version: '1.0' },
        { title: 'Packet Logger', description: 'Packet Logger', author: 'CoreDuo', version: '1.0' }
    ];

    return (
        <div className="hb-p-2 hb-flex-1 hb-flex hb-flex-col hb-gap-2 hb-bg-neutral-900 hb-m-2 hb-rounded-sm">
            <table className="hb-min-w-full hb-border-collapse hb-rounded-[4px] hb-overflow-hidden hb-border hb-border-neutral-950">
                <thead>
                    <tr>
                        <th className="hb-border hb-bg-neutral-950 hb-border-none hb-p-2 hb-text-white">Título</th>
                        <th className="hb-border hb-bg-neutral-950 hb-border-none hb-p-2 hb-text-white">Descrição</th>
                        <th className="hb-border hb-bg-neutral-950 hb-border-none hb-p-2 hb-text-white">Autor</th>
                        <th className="hb-border hb-bg-neutral-950 hb-border-none hb-p-2 hb-text-white">Versão</th>
                        <th className="hb-border hb-bg-neutral-950 hb-border-none hb-p-2 hb-text-white">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {extensions.map((ext, index) => (
                        <tr key={index} className="hb-bg-neutral-800 hover:hb-bg-white/10 hb-transition-all">
                            <td className="hb-border hb-border-none hb-px-2 hb-py-3 hb-text-white">{ext.title}</td>
                            <td className="hb-border hb-border-none hb-px-2 hb-py-3 hb-text-white">{ext.description}</td>
                            <td className="hb-border hb-border-none hb-px-2 hb-py-3 hb-text-white">{ext.author}</td>
                            <td className="hb-border hb-border-none hb-px-2 hb-py-3 hb-text-white hb-text-center">{ext.version}</td>
                            <td className="hb-border hb-border-none hb-p-2 hb-text-center">
                                <button className="hb-text-neutral-500 hover:hb-text-blue-800 hb-transition-all">
                                    <i className="fas fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="hb-flex hb-justify-end hb-mt-auto">
                <button className="hb-p-2 hb-bg-green-800 hb-text-white hb-rounded hb-py-2 hover:hb-bg-green-700 hb-transition-colors active:hb-bg-green-950">
                    Adicionar extensão
                </button>
            </div>
        </div>
    )
}