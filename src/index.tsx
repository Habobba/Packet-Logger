import React from 'react';
import App from './components/App';
import { createRoot } from 'react-dom/client';
import './index.css';

const container = document.getElementById('draggable-windows-container');

if(!container) {
    throw new Error('Container not found');
}

const root = createRoot(container);
root.render(<App />);
