import { createContext, ReactNode, useState } from 'react'

export enum NotificationType {
    success = 'success',
    error = 'error',
    notice = 'notice',
}

export type NotificationContextType = {
    display: boolean
    type: NotificationType
    message: string
    displayNotification: (type: NotificationType, message: string) => void
    hide: () => void
}

export const NotificationContext = createContext<NotificationContextType>({
    display: false,
    type: NotificationType.success,
    message: '',
    displayNotification: () => {},
    hide: () => {},
})

type NavigationProviderProps = {
    children: ReactNode
}

export const NotificationContextProvider = ({
    children,
}: NavigationProviderProps) => {
    const [display, setDisplay] = useState<boolean>(false)
    const [type, setType] = useState<NotificationType>(NotificationType.success)
    const [message, setMessage] = useState<string>('')
    const displayNotification = (type: NotificationType, message: string) => {
        setDisplay(true)
        setType(type)
        setMessage(message)
    }



    return (
        <NotificationContext.Provider
            value={{
                displayNotification,
                display,
                type,
                message,
                hide: () => setDisplay(false),
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}
