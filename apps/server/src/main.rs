use axum::{Router};
use std::net::SocketAddr;
use axum::response::{Html, IntoResponse, Response};


#[tokio::main]
async fn main() {
    let routes_hello = Router::new().route("/", axum::routing::get(|| async {Html("Hello, world")}));
    let addr = SocketAddr::from(([127,0,0,1], 7878));
    axum::Server::bind(&addr).serve(routes_hello.into_make_service()).await.unwrap();
}
