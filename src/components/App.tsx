import React, { useState } from 'react';

function App() {
    const [activeTab, setActiveTab] = useState('Injeção');

    const renderContent = () => {
        switch(activeTab) {
            case 'Injeção':
                return <div>Conteúdo da guia Injeção</div>;
            case 'Ferramentas':
                return <div>Conteúdo da guia Ferramentas</div>;
            case 'Agendador':
                return <div>Conteúdo da guia Agendador</div>;
            case 'Extensões':
                return <div>Conteúdo da guia Extensões</div>;
            case 'Extra':
                return <div>Conteúdo da guia Extra</div>;
            case 'Info':
                return <div>Conteúdo da guia Info</div>;
            default:
                return null;
        }
    }

    return (
        <>
            <div className="w-[750px] h-[450px] bg-neutral-950 p-2">
                <section className="w-100 h-10 bg-white/5 rounded-lg flex items-center justify-between p-2">
                    <span className="text-white text-sm font-semibold">Habobba Logger</span>
                    <div className="flex gap-3">
                        <span className="text-white cursor-pointer hover:text-blue-400">
                            <i className="fa-solid fa-sm fa-chevron-down"></i>
                        </span>
                        <span className="text-white cursor-pointer hover:text-red-400">
                            <i className="fa-solid fa-sm fa-times"></i>
                        </span>
                    </div>
                </section>

                <section className="w-100 flex gap-4 h-12">
                    <a 
                        href="#" 
                        className={`px-2 text-sm font-semibold ${activeTab === 'Injeção' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-white'} h-12 flex items-center`} 
                        onClick={() => setActiveTab('Injeção')}
                    >
                        Injeção
                    </a>
                    <a 
                        href="#" 
                        className={`px-2 text-sm font-semibold ${activeTab === 'Ferramentas' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-white'} h-12 flex items-center`} 
                        onClick={() => setActiveTab('Ferramentas')}
                    >
                        Ferramentas
                    </a>
                    <a 
                        href="#" 
                        className={`px-2 text-sm font-semibold ${activeTab === 'Agendador' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-white'} h-12 flex items-center`} 
                        onClick={() => setActiveTab('Agendador')}
                    >
                        Agendador
                    </a>
                    <a 
                        href="#" 
                        className={`px-2 text-sm font-semibold ${activeTab === 'Extensões' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-white'} h-12 flex items-center`} 
                        onClick={() => setActiveTab('Extensões')}
                    >
                        Extensões
                    </a>
                    <a 
                        href="#" 
                        className={`px-2 text-sm font-semibold ${activeTab === 'Extra' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-white'} h-12 flex items-center`} 
                        onClick={() => setActiveTab('Extra')}
                    >
                        Extra
                    </a>
                    <a 
                        href="#" 
                        className={`px-2 text-sm font-semibold ${activeTab === 'Info' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-white'} h-12 flex items-center`} 
                        onClick={() => setActiveTab('Info')}
                    >
                        Info
                    </a>
                </section>

                <section className="w-100 h-full p-2 bg-white/5 rounded-lg">
                    {renderContent()}
                </section>
            </div>
        </>
    );
}

export default App;
