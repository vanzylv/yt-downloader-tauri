import {useContext, useEffect} from 'react'
import {
    NotificationContext,
    NotificationContextType,
    NotificationType,
} from '../context/NotificationContext.tsx'
import { IconCheck, IconX } from '@tabler/icons-react'
import { Notification, rem } from '@mantine/core'

const Notify = () => {
    const { display, type, message, hide } =
        useContext<NotificationContextType>(NotificationContext)
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />
    const timeout = 3000

    useEffect(() => {
        if (display) {
            setTimeout(() => {
                hide()
            }, timeout)
        }
    }, [display]);


    const color =
        type === NotificationType.success
            ? 'green'
            : type === NotificationType.error
              ? 'red'
              : 'blue'
    const icon =
        type === NotificationType.success || type === NotificationType.notice
            ? checkIcon
            : xIcon
    const title =
        type === NotificationType.success
            ? 'Success'
            : type === NotificationType.notice
              ? 'Notice'
              : 'Oops'

    return display ? (
        <Notification withCloseButton={false} icon={icon} color={color} title={title}>
            {message.toString()}
        </Notification>
    ) : (
        <></>
    )
}

export default Notify
