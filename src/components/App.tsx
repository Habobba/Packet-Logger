import React, { useState, useCallback, MouseEvent } from 'react';

function App() {
    const [activeTab, setActiveTab] = useState('Info');
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const extensions = [
        { title: 'Extensions Store', description: 'Loja de extensões', author: 'CoreDuo', version: '1.0' },
        { title: 'Packet Logger', description: 'Packet Logger', author: 'CoreDuo', version: '1.0' }
    ];

    const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
        setDragging(true);
        setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (dragging) {
                setPosition({
                    x: e.clientX - startPosition.x,
                    y: e.clientY - startPosition.y
                });
            }
        },
        [dragging, startPosition]
    );

    const handleMouseUp = () => {
        setDragging(false);
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove as any);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove as any);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Injeção':
                return (
                    <div className="hb-flex hb-h-full">
                        <div className="hb-flex-1 hb-flex hb-flex-col hb-p-1">
                            <div className="hb-flex hb-justify-between hb-text-sm hb-mb-2">
                                <span className="hb-text-red-500">estaCorrompido: Verdadeiro</span>
                                <span className="hb-text-gray-500">cabeçalho (id:NULL, comprimento: 0)</span>
                            </div>
                            <textarea
                                className="hb-flex-1 hb-bg-neutral-800 hb-rounded hb-p-2 hb-mb-1 hb-text-white focus:hb-outline-none"
                                placeholder="Digite seu pacote aqui..."
                                spellCheck="false"
                            ></textarea>
                            <div className="hb-flex hb-gap-2">
                                <button className="hb-flex-1 hb-bg-blue-600 hb-text-white hb-rounded hb-py-2 hover:hb-bg-blue-700 hb-transition-colors">
                                    Enviar para o servidor
                                </button>
                                <button className="hb-flex-1 hb-bg-green-600 hb-text-white hb-rounded hb-py-2 hover:hb-bg-green-700 hb-transition-colors">
                                    Enviar para o cliente
                                </button>
                            </div>
                        </div>
                        <div className="hb-flex hb-flex-col hb-w-1/4 hb-p-1">
                            <div className="hb-flex hb-justify-between hb-mb-1">
                                <span className="hb-text-white">Histórico</span>
                                <a href="#" className="hb-text-blue-400 hover:hb-underline">Limpar</a>
                            </div>
                            <div className="hb-flex-1 hb-bg-neutral-800 hb-p-2 hb-overflow-auto hb-rounded">
                                {/* Conteúdo do histórico */}
                            </div>
                        </div>
                    </div>
                );
            case 'Ferramentas':
                return <div>Conteúdo da guia Ferramentas</div>;
            case 'Agendador':
                return <div>Conteúdo da guia Agendador</div>;
            case 'Extensões':
                return (
                    <div className="hb-flex hb-flex-col hb-h-full">
                        <div className="hb-flex-1 hb-overflow-auto">
                            <table className="hb-min-w-full hb-border-collapse hb-border hb-border-neutral-950">
                                <thead>
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
                                        <tr key={index} className="hb-bg-cyan-800">
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
            case 'Extra':
                return <div>Conteúdo da guia Extra</div>;
            case 'Info':
                return (
                    <div className="hb-flex hb-flex-col hb-gap-4 hb-p-4">
                        <div className="hb-flex hb-items-center">
                            <img
                                src="data:image/webp;base64,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"
                                alt="Habobba Logo"
                                className="hb-w-16 hb-h-16 hb-mr-4"
                            />
                            <div>
                                <h2 className="hb-text-xl hb-font-bold hb-text-white">Habobba 1.0.0</h2>
                                <p className="hb-text-gray-400">
                                    Manipulador de pacotes de Habbo Piratas.
                                </p>
                            </div>
                        </div>
                        <div className="hb-flex hb-flex-col hb-gap-2">
                            <h3 className="hb-text-lg hb-font-semibold hb-text-white">Criado por:</h3>
                            <a href='https://github.com/Cor3Duo' className="hb-text-gray-400">CoreDuo</a>
                        </div>
                        <div className="hb-flex hb-flex-col hb-gap-2">
                            <h3 className="hb-text-lg hb-font-semibold hb-text-white">Contribuidores:</h3>
                            <div className="hb-grid hb-grid-cols-2 hb-gap-x-4 hb-gap-y-2">
                                <a href='https://github.com/nicollassilva' className="hb-text-gray-400">nicollassilva</a>
                                <a href='https://github.com/henriqFerreira' className="hb-text-gray-400">henriqFerreira</a>
                            </div>
                        </div>
                        <div className="hb-flex hb-flex-col hb-gap-2">
                            <h3 className="hb-text-lg hb-font-semibold hb-text-white">Links:</h3>
                            <a
                                href="https://discord.gg/9vWNdR2Dd8"
                                className="hb-text-blue-400 hover:hb-underline"
                            >
                                Discord
                            </a>
                            <a
                                href="https://github.com/Habobba/Packet-Logger"
                                className="hb-text-blue-400 hover:hb-underline"
                            >
                                Github - Habobba Logger
                            </a>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div
                id='habobba'
                className="hb-w-[750px] hb-h-[450px] hb-bg-neutral-950 hb-p-2 hb-flex hb-flex-col hb-absolute"
                style={{ left: position.x, top: position.y }}
            >
                <section
                    className="hb-w-full hb-h-10 hb-rounded-lg hb-flex hb-items-center hb-justify-between hb-p-2"
                    onMouseDown={handleMouseDown}
                >
                    <span className="hb-text-white hb-text-sm hb-font-semibold">Habobba Logger</span>
                    <div className="hb-flex hb-gap-3">
                        <span className="hb-text-white hb-cursor-pointer hover:hb-text-blue-400">
                            <i className="fa-solid fa-sm fa-chevron-down"></i>
                        </span>
                        <span className="hb-text-white hb-cursor-pointer hover:hb-text-red-400">
                            <i className="fa-solid fa-sm fa-times"></i>
                        </span>
                    </div>
                </section>

                <section className="hb-w-full hb-flex hb-gap-4 hb-h-12">
                    <button
                        className={`hb-px-2 hb-text-sm hb-font-semibold ${activeTab === 'Injeção' ? 'hb-text-blue-600 hb-border-b-2 hb-border-blue-600' : 'hb-text-white'} hb-h-12 hb-flex hb-items-center`}
                        onClick={() => setActiveTab('Injeção')}
                    >
                        Injeção
                    </button>
                    <button
                        className={`hb-px-2 hb-text-sm hb-font-semibold ${activeTab === 'Ferramentas' ? 'hb-text-blue-600 hb-border-b-2 hb-border-blue-600' : 'hb-text-white'} hb-h-12 flex hb-items-center`}
                        onClick={() => setActiveTab('Ferramentas')}
                    >
                        Ferramentas
                    </button>
                    <button
                        className={`hb-px-2 hb-text-sm hb-font-semibold ${activeTab === 'Agendador' ? 'hb-text-blue-600 hb-border-b-2 hb-border-blue-600' : 'hb-text-white'} hb-h-12 hb-flex hb-items-center`}
                        onClick={() => setActiveTab('Agendador')}
                    >
                        Agendador
                    </button>
                    <button
                        className={`hb-px-2 hb-text-sm hb-font-semibold ${activeTab === 'Extensões' ? 'hb-text-blue-600 hb-border-b-2 hb-border-blue-600' : 'hb-text-white'} hb-h-12 hb-flex hb-items-center`}
                        onClick={() => setActiveTab('Extensões')}
                    >
                        Extensões
                    </button>
                    <button
                        className={`hb-px-2 hb-text-sm hb-font-semibold ${activeTab === 'Extra' ? 'hb-text-blue-600 hb-border-b-2 hb-border-blue-600' : 'hb-text-white'} hb-h-12 hb-flex hb-items-center`}
                        onClick={() => setActiveTab('Extra')}
                    >
                        Extra
                    </button>
                    <button
                        className={`hb-px-2 hb-text-sm hb-font-semibold ${activeTab === 'Info' ? 'hb-text-blue-600 hb-border-b-2 hb-border-blue-600' : 'hb-text-white'} hb-h-12 hb-flex hb-items-center`}
                        onClick={() => setActiveTab('Info')}
                    >
                        Info
                    </button>
                </section>

                <section className="hb-w-full hb-flex-1 hb-p-2 hb-bg-white/5 hb-rounded-lg hb-overflow-hidden">
                    {renderContent()}
                </section>
            </div>
        </>
    );
}

export default App;
