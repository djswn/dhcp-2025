from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #어디서든 요청 허용 (웹/앱/서버)
    allow_credentials=True,  #쿠키, 토큰 등 요청 허용
    allow_methods=["*"],  # HTTP 요청 방식 허용
    allow_headers=["*"],  # 클라이언트가 보낸 헤더 허용
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    print("🔵 클라이언트 연결됨")

    while True:
        try:
            # 사용자가 보낸 메시지 받기
            message = await websocket.receive_text()
            # 터미널에 메시지 출력
            print(f"사용자 메시지: {message}")

            # 클라이언트에게 응답
            await websocket.send_text("네?")

        except Exception as e:
            print("연결 끊김:", e)
            break
