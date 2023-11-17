use rusty_ytdl::{Video, VideoDetails};
use rusty_ytdl::search::YouTube;
use rusty_ytdl::search::Video as SearchVideo;

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
//#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rustx!", name)
}

#[tauri::command]
async fn download() -> VideoDetails {
    let video_url = "https://www.youtube.com/watch?v=FZ8BxMU3BYc"; // FZ8BxMU3BYc works too!
    let video = Video::new(video_url).unwrap();
    let video_info = video.get_info().await.unwrap();
    println!("{:#?}", video_info);
    return video_info.video_details;
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
        .invoke_handler(tauri::generate_handler![greet,download,search])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
