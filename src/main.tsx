import './events/events.ts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import '@mantine/core/styles.css'
import '@mantine/core/styles/global.css'
import '@mantine/notifications/styles.css'
import { MantineProvider } from '@mantine/core'
import { SearchContextProvider } from './context/SearchContext.tsx'
import { NotificationContextProvider } from './context/NotificationContext.tsx'
import { Notifications } from '@mantine/notifications'
import { ModalContextProvider } from './context/ModalContext.tsx'
import SettingsModal from './components/Settings/SettingsModal.tsx'
import { Store } from 'tauri-plugin-store-api'

export const store = new Store('.settings.dat')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider
            theme={{
                fontFamily: 'Avenir, Helvetica',
            }}
        >
            <ModalContextProvider>
                <NotificationContextProvider>
                    <SearchContextProvider>
                        <App />
                        <Notifications position="bottom-right" zIndex={1000} />
                        <SettingsModal />
                    </SearchContextProvider>
                </NotificationContextProvider>
            </ModalContextProvider>
        </MantineProvider>
    </React.StrictMode>
)
