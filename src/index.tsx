import React from 'react';
import App from './components/App';
import { createRoot } from 'react-dom/client';
import './index.css';

const elementId = 'draggable-windows-container';

const interval: NodeJS.Timeout = setInterval(() => {
    if (!document.getElementById(elementId)) return;

    clearInterval(interval);
    
    const container = document.getElementById(elementId);

    if(!container) throw new Error('Container not found');

    const root = createRoot(container);
    root.render(<App />)
}, 1000);
