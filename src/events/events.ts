import { listen } from '@tauri-apps/api/event'
import { appWindow } from '@tauri-apps/api/window'
export enum Event {
    DOWNLOAD_PROGRESS = 'download://progress',
}

await appWindow.listen(Event.DOWNLOAD_PROGRESS, (event) => {
    console.log(event.payload, Event.DOWNLOAD_PROGRESS)
})

await listen(Event.DOWNLOAD_PROGRESS, (event) => {
    console.log(event.payload, Event.DOWNLOAD_PROGRESS)
})
