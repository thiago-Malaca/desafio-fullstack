import React, { ReactNode } from 'react';
import ThemeProvider from './theme';
import { Provider as ReduxProvider } from "react-redux"
import { persistor, store } from '../redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SWRProvider } from './swr';

type ProvidersProps = { children: ReactNode };

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <SWRProvider>{children}</SWRProvider>
                </ThemeProvider>
            </PersistGate>

        </ReduxProvider>

    )
}

export default Providers;