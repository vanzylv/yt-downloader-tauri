import { createContext, ReactNode } from 'react'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { rem } from '@mantine/core'

export enum NotificationType {
    success = 'success',
    error = 'error',
    notice = 'notice',
}

export type NotificationContextType = {
    displayNotification: (type: NotificationType, message: string) => void
}

export const NotificationContext = createContext<NotificationContextType>({
    displayNotification: () => {},
})

type NavigationProviderProps = {
    children: ReactNode
}

export const NotificationContextProvider = ({
    children,
}: NavigationProviderProps) => {
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />

    const displayNotification = (type: NotificationType, message: string) => {
        const color =
            type === NotificationType.success
                ? 'green'
                : type === NotificationType.error
                  ? 'red'
                  : 'blue'
        const icon =
            type === NotificationType.success ||
            type === NotificationType.notice
                ? checkIcon
                : xIcon
        const title =
            type === NotificationType.success
                ? 'Success'
                : type === NotificationType.notice
                  ? 'Notice'
                  : 'Oops'

        notifications.show({
            title,
            message,
            color,
            autoClose: 3000,
            icon,
        })
    }

    return (
        <NotificationContext.Provider
            value={{
                displayNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}
