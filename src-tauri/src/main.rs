use std::path::{Path, PathBuf};

use rusty_ytdl::{DownloadOptions, Video, VideoOptions, VideoQuality, VideoSearchOptions};
use rusty_ytdl::search::Video as SearchVideo;
use rusty_ytdl::search::YouTube;
use sanitize_filename::sanitize_with_options;
use tauri::{AppHandle, Manager, Window, Wry};
use tauri_plugin_store::{StoreCollection, with_store};

#[derive(Clone, serde::Serialize)]
struct ProgressPayload {
    id: String,
    progress: u64,
    total: u64,
}

#[tauri::command]
async fn download(id: String, window: Window, app: AppHandle) {
    println!("id: {}", id);

    let stores = app.state::<StoreCollection<Wry>>();
    let path = PathBuf::from(".settings.dat");

    let download_dir = with_store(app.app_handle().to_owned(), stores, path, |store| {
        Ok(store
            .get("downloadDirectory")
            .and_then(|val| val.as_str().map(|s| s.to_string()))
            .unwrap())
    }).unwrap();

    println!("download_dir: {}", download_dir);
    let video_options = VideoOptions {
        quality: VideoQuality::Highest,
        filter: VideoSearchOptions::VideoAudio,
        download_options: DownloadOptions {
            dl_chunk_size: Some(1024 * 1024 * 5_u64),
        },
        ..Default::default()
    };

    let video = Video::new_with_options(&id, video_options).unwrap();
    let stream = video.stream().await.unwrap();
    let total = stream.content_length();

    println!("total: {}", total);


    let video_info = video.get_info().await.unwrap();
    println!("formats{:?}", video_info.formats);


    while let Some(chunk) = stream.chunk().await.unwrap() {
        let window = window.clone();
        let id = id.clone();

        std::thread::spawn(move || {
            window.emit(
                "download://progress",
                ProgressPayload {
                    id,
                    progress: chunk.len() as u64,
                    total: total as u64,
                },
            ).unwrap();
        });
    }

    let mut clean_file_name = sanitize_with_options(video_info.video_details.title, sanitize_filename::Options {
        truncate: true,
        replacement: "_",
        windows: true,
        ..Default::default()
    });
    clean_file_name.push_str(".mp4");
    let path = Path::new(&download_dir).join(&clean_file_name);

    video.download(path).await.unwrap();

    println!("done");
}

#[tauri::command]
async fn search(query: &str) -> Result<Vec<SearchVideo>, ()> {
    let youtube = YouTube::new().unwrap();
    let res = youtube.search(r#query, None).await.unwrap();

    let mut video_results: Vec<SearchVideo> = Vec::new();
    for search_result in res {
        if let rusty_ytdl::search::SearchResult::Video(video) = search_result {
            video_results.push(video)
        }
    }

    return Ok(video_results);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download,search])
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
