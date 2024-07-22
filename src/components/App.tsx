import React, { useState, useCallback, MouseEvent } from 'react';
import Injection from './views/Injection';
import Tools from './views/Tools';
import Scheduler from './views/Scheduler';
import Extensions from './views/Extensions';
import Extra from './views/Extra';
import About from './views/About';

function App() {
    const [minimal, setMinimal] = useState(false);
    const [activeTab, setActiveTab] = useState('injection');

    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const tabs = [
        { name: 'Injeção', key: 'injection', component: <Injection /> },
        { name: 'Ferramentas', key: 'tools', component: <Tools /> },
        { name: 'Agendador', key: 'scheduler', component: <Scheduler /> },
        { name: 'Extensões', key: 'extensions', component: <Extensions /> },
        { name: 'Extra', key: 'extra', component: <Extra /> },
        { name: 'Info', key: 'info', component: <About /> }
    ]

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

    return (
        <>
            <div
                id='habobba'
                className={`${minimal ? 'hb-h-[50px] hb-w-[300px]' : 'hb-h-[450px] hb-w-[750px]'} hb-overflow-hidden hb-transition hb-bg-neutral-950 hb-p-2 hb-flex hb-flex-col hb-absolute`}
                style={{ left: position.x, top: position.y }}
            >
                <section
                    className="hb-w-full hb-h-10 hb-rounded-lg hb-flex hb-items-center hb-justify-between hb-p-2"
                    onMouseDown={handleMouseDown}
                >
                    <span className="hb-text-white hb-text-sm hb-font-semibold">Habobba Logger</span>
                    <div className="hb-flex hb-gap-3">
                        <span className="hb-text-white hb-cursor-pointer hover:hb-text-blue-400" onClick={() => setMinimal(!minimal)}>
                            <i className={`fa-solid fa-sm ${minimal ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
                        </span>
                        <span className="hb-text-white hb-cursor-pointer hover:hb-text-red-400">
                            <i className="fa-solid fa-sm fa-times"></i>
                        </span>
                    </div>
                </section>

                <nav className="hb-w-full hb-flex hb-gap-4 hb-h-12">
                    { tabs.map(tab => (
                        <button
                            className={`hb-px-2 hb-text-sm hb-font-semibold ${activeTab === tab.key ? 'hb-text-blue-600 hb-border-b-2 hb-border-blue-600' : 'hb-text-white'} hb-h-12 hb-flex hb-items-center`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.name}
                        </button>
                    )) }
                </nav>

                <section className="hb-w-full hb-flex-1 hb-p-2 hb-bg-white/5 hb-rounded-lg hb-overflow-hidden">
                    {tabs.find(tab => tab.key === activeTab)?.component}
                </section>
            </div>
        </>
    );
}

export default App;
