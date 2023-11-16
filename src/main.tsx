import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import '@mantine/core/styles.css'
import '@mantine/core/styles/global.css'
import { MantineProvider } from '@mantine/core'
import { NavigationContextProvider } from './context/NavigationContext.tsx'
import { SearchContextProvider } from './context/SearchContext.tsx'
import {NotificationContextProvider} from "./context/NotificationContext.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider>
            <NotificationContextProvider>
                <NavigationContextProvider>
                    <SearchContextProvider>
                        <App />
                    </SearchContextProvider>
                </NavigationContextProvider>
            </NotificationContextProvider>
        </MantineProvider>
    </React.StrictMode>
)
