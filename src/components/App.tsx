import React, { useEffect } from 'react';
import Logger from '../modules/Logger.module';
import { WebSocketProxy } from '../core/WebSocketProxy';

function App(): JSX.Element {

    useEffect(() => {
        if (process.env.NODE_ENV != 'development') {
            WebSocketProxy.run();
        }
    }, []);

    return <Logger />;
}

export default App;
