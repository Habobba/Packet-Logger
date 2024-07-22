import React, { useState } from "react";
import { FloatingWindow } from "../components/FloatingWindow";
import { Tab } from "../components/Tab";
import LoggerInjection from "./components/LoggerInjection.component";
import LoggerExtensions from "./components/LoggerExtensions.component";
import LoggerInfo from "./components/LoggerInfo.component";
import LoggerTools from "./components/LoggerTools.components";

export default function Logger(): JSX.Element {
    const [tab, setTab] = useState<string>("Ferramentas")

    return (
        <FloatingWindow.Root title="Habobba Logger">
            <FloatingWindow.Content>
                <Tab.Root>
                    <Tab.Item label="Injeção" onClick={() => setTab("Injeção")} active={tab === "Injeção"} />
                    <Tab.Item label="Ferramentas" onClick={() => setTab("Ferramentas")} active={tab === "Ferramentas"} />
                    <Tab.Item label="Agendador" onClick={() => setTab("Agendador")} active={tab === "Agendador"} />
                    <Tab.Item label="Extensões" onClick={() => setTab("Extensões")} active={tab === "Extensões"} />
                    <Tab.Item label="Extra" onClick={() => setTab("Extra")} active={tab === "Extra"} />
                    <Tab.Item label="Info" onClick={() => setTab("Info")} active={tab === "Info"} />
                </Tab.Root>
                {tab === "Injeção" && <LoggerInjection />}
                {tab === "Ferramentas" && <LoggerTools />}
                {tab === "Extensões" && <LoggerExtensions />}
                {tab === "Info" && <LoggerInfo />}
            </FloatingWindow.Content>
        </FloatingWindow.Root>
    )
}