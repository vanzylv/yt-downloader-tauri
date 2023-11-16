import { Button } from '@mantine/core'
import { useContext } from 'react'
import {
    NotificationContext,
    NotificationContextType,
    NotificationType,
} from '../context/NotificationContext.tsx'

export default function Settings() {
    const { displayNotification } =
        useContext<NotificationContextType>(NotificationContext)

    return (
        <div>
            <Button
                onClick={() =>
                    displayNotification(
                        NotificationType.error,
                        'This is an error'
                    )
                }
            >
                Error
            </Button>
            <Button
                onClick={() =>
                    displayNotification(
                        NotificationType.notice,
                        'This is a notice'
                    )
                }
            >
                Notice
            </Button>
            <Button
                onClick={() =>
                    displayNotification(
                        NotificationType.success,
                        'This is a success message'
                    )
                }
            >
                Success
            </Button>
        </div>
    )
}
