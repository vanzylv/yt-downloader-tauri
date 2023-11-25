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
import { Store } from 'tauri-plugin-store-api'
import { VideoContextProvider } from './context/VideoContext.tsx'
import { SettingsContextProvider } from './context/SettingsContext.tsx'

export const store = new Store('.settings.dat')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider
            theme={{
                fontFamily: 'Avenir, Helvetica',
            }}
        >
            <SettingsContextProvider>
                <NotificationContextProvider>
                    <SearchContextProvider>
                        <VideoContextProvider>
                            <App />
                            <Notifications position="top-right" zIndex={1000} />
                        </VideoContextProvider>
                    </SearchContextProvider>
                </NotificationContextProvider>
            </SettingsContextProvider>
        </MantineProvider>
    </React.StrictMode>
)
