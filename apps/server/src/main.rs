use axum::{
  extract::{Path, State, Json},
  routing::{get, post, put, delete},
  Router,
  http::{StatusCode, header::{HeaderValue, CONTENT_TYPE, AUTHORIZATION}},
};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tower_http::cors::{CorsLayer, Any};


#[derive(Debug, Clone, Serialize, Deserialize)]
struct Article {
  id: u64,
  title: String,
  content: String,
}


type Db = Arc<Mutex<Vec<Article>>>;

#[derive(Debug, Deserialize)]
struct ArticlePayload {
  title: String,
  content: String,
}

#[tokio::main]
async fn main() {
  let articles: Db = Arc::new(Mutex::new(Vec::new()));

  let cors = CorsLayer::new()
  .allow_methods(Any)
  .allow_headers([CONTENT_TYPE, AUTHORIZATION])
  .allow_origin(HeaderValue::from_static("http://localhost:3000"));

  let app = Router::new()
      .route("/articles", post(create_article).get(list_articles))
      .route("/articles/{id}", get(get_article).put(update_article).delete(delete_article))
      .with_state(articles)
      .layer(cors); // Apply the CorsLayer directly here

  let listener = tokio::net::TcpListener::bind("0.0.0.0:4000")
      .await
      .unwrap();

  axum::serve(listener, app).await.unwrap();
}

// POST /articles
async fn create_article(
  State(db): State<Db>,
  Json(payload): Json<ArticlePayload>,
) -> Json<Article> {
  let mut store = db.lock().unwrap();
  let id = store.len() as u64;
  let article = Article {
      id,
      title: payload.title,
      content: payload.content,
  };
  store.push(article.clone());
  Json(article)
}

// GET /articles
async fn list_articles(State(db): State<Db>) -> Json<Vec<Article>> {
  let store = db.lock().unwrap();
  Json(store.clone())
}

// GET /articles/:id
async fn get_article(
  Path(id): Path<u64>,
  State(db): State<Db>,
) -> Result<Json<Article>, StatusCode> {
  let store = db.lock().unwrap();
  store.iter().find(|a| a.id == id).cloned()
      .map(Json)
      .ok_or(StatusCode::NOT_FOUND)
}

// PUT /articles/:id
async fn update_article(
  Path(id): Path<u64>,
  State(db): State<Db>,
  Json(payload): Json<ArticlePayload>,
) -> Result<Json<Article>, StatusCode> {
  let mut store = db.lock().unwrap();
  if let Some(article) = store.iter_mut().find(|a| a.id == id) {
      article.title = payload.title;
      article.content = payload.content;
      return Ok(Json(article.clone()));
  }
  Err(StatusCode::NOT_FOUND)
}

// DELETE /articles/:id
async fn delete_article(
  Path(id): Path<u64>,
  State(db): State<Db>,
) -> StatusCode {
  let mut store = db.lock().unwrap();
  let len_before = store.len();
  store.retain(|a| a.id != id);
  if store.len() < len_before {
      StatusCode::NO_CONTENT
  } else {
      StatusCode::NOT_FOUND
  }
}
