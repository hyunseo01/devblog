import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export type ChatMessage = {
  id: number;
  content: string;
  createdAt: string;
  nickname: string;
  userId: number;
};

export const connectSocket = (
  token: string,
  onMessage?: (msg: ChatMessage) => void,
  onReconnect?: () => void,
) => {
  if (socket && socket.connected) {
    console.log("이미 연결된 소켓");
    return;
  }

  console.log("[소켓 연결 시작]");

  // 새 소켓 생성
  socket = io(process.env.NEXT_PUBLIC_API_URL!, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("소켓 연결됨");
  });

  socket.on("disconnect", (reason) => {
    console.warn("소켓 연결 끊김:", reason);
  });

  socket.on("reconnect_attempt", (attempt) => {
    console.log(`재연결 시도 (${attempt})`);
    if (socket) {
      socket.auth = { token };
    }
  });

  socket.on("reconnect", () => {
    console.log("소켓 재연결 성공");
    onReconnect?.(); // 외부에서 fetchMessages 등 연결
  });

  socket.on("reconnect_error", (err) => {
    console.error("소켓 재연결 실패:", err);
  });

  // 메시지 수신 핸들링
  socket.on("chat", (msg) => {
    console.log("메시지 수신:", msg);

    // 중복 메시지 필터링 없이 raw 전달
    onMessage?.(msg);
  });
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error(
      "Socket is not connected. Call connectSocket(token) first.",
    );
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    console.log("소켓 연결 해제");
    socket.disconnect();
    socket = null;
  }
};
