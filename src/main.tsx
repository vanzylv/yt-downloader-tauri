import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import '@mantine/core/styles.css'
import '@mantine/core/styles/global.css'
import '@mantine/notifications/styles.css'
import { MantineProvider } from '@mantine/core'
import { NavigationContextProvider } from './context/NavigationContext.tsx'
import { SearchContextProvider } from './context/SearchContext.tsx'
import { NotificationContextProvider } from './context/NotificationContext.tsx'
import { Notifications } from '@mantine/notifications'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider
            theme={{
                fontFamily: 'Avenir, Helvetica',
            }}
        >
            <NotificationContextProvider>
                <NavigationContextProvider>
                    <SearchContextProvider>
                        <App />
                        <Notifications position="top-right" zIndex={1000} />
                    </SearchContextProvider>
                </NavigationContextProvider>
            </NotificationContextProvider>
        </MantineProvider>
    </React.StrictMode>
)
