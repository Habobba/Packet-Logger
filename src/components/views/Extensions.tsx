import React from 'react';

export default function Extensions() {
    const extensions = [
        { title: 'Extensions Store', description: 'Loja de extensões', author: 'CoreDuo', version: '1.0' },
        { title: 'Packet Logger', description: 'Packet Logger', author: 'CoreDuo', version: '1.0' }
    ];

    return (
        <div className="hb-flex hb-flex-col hb-h-full">
            <div className="hb-flex-1 hb-overflow-auto">
                <table className="hb-min-w-full hb-border-collapse hb-border hb-border-neutral-950">
                    <thead className="hb-text-sm">
                        <tr>
                            <th className="hb-border hb-bg-neutral-950 hb-border-gray-950 hb-p-2 hb-text-white">Título</th>
                            <th className="hb-border hb-bg-neutral-950 hb-border-gray-950 hb-p-2 hb-text-white">Descrição</th>
                            <th className="hb-border hb-bg-neutral-950 hb-border-gray-950 hb-p-2 hb-text-white">Autor</th>
                            <th className="hb-border hb-bg-neutral-950 hb-border-gray-950 hb-p-2 hb-text-white">Versão</th>
                            <th className="hb-border hb-bg-neutral-950 hb-border-gray-950 hb-p-2 hb-text-white">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {extensions.map((ext, index) => (
                            // <tr key={index} className="bg-cyan-800 odd:bg-cyan-100">
                            <tr key={index} className="hb-bg-neutral-800 hover:hb-bg-neutral-700 hb-text-sm">
                                <td className="hb-border hb-border-neutral-950 hb-p-2 hb-text-white">{ext.title}</td>
                                <td className="hb-border hb-border-neutral-950 hb-p-2 hb-text-white">{ext.description}</td>
                                <td className="hb-border hb-border-neutral-950 hb-p-2 hb-text-white">{ext.author}</td>
                                <td className="hb-border hb-border-neutral-950 hb-p-2 hb-text-white">{ext.version}</td>
                                <td className="hb-border hb-border-neutral-950 hb-p-2 hb-text-center">
                                    <button className="hb-text-green-500 hover:hb-text-green-700">
                                        <i className="fa-solid fa-play"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="hb-flex hb-justify-end hb-p-2">
                <button className="hb-bg-gray-300 hb-text-gray-600 hb-rounded hb-px-4 hb-py-2">Instalar</button>
            </div>
        </div>
    );
}