import React from 'react';

function App() {
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
                    <a href="#" className="px-2 text-sm font-semibold text-blue-600 border-b-2 border-blue-600 h-12 flex items-center">Injeção</a>
                    <a href="#" className="px-2 text-sm font-semibold text-white h-12 flex items-center">Ferramentas</a>
                    <a href="#" className="px-2 text-sm font-semibold text-white h-12 flex items-center">Agendador</a>
                    <a href="#" className="px-2 text-sm font-semibold text-white h-12 flex items-center">Extensões</a>
                    <a href="#" className="px-2 text-sm font-semibold text-white h-12 flex items-center">Extra</a>
                    <a href="#" className="px-2 text-sm font-semibold text-white h-12 flex items-center">Info</a>
                </section>
            </div>
        </>
    );
}

export default App;
