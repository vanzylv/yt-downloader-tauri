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
import { Store } from 'tauri-plugin-store-api'
import { VideoContextProvider } from './context/VideoContext.tsx'

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
                        <VideoContextProvider>
                            <App />
                            <Notifications
                                position="top-right"
                                zIndex={1000}
                            />
                        </VideoContextProvider>
                    </SearchContextProvider>
                </NotificationContextProvider>
            </ModalContextProvider>
        </MantineProvider>
    </React.StrictMode>
)
