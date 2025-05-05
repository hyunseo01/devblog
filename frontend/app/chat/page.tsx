// "use client";
//
// import { useEffect, useRef, useState } from "react";
// import { useAuth } from "@/libs/store/useAuth";
// import { connectSocket, getSocket } from "@/libs/socket/chatSocket";
// import SimpleLoginForm from "@/components/SimpleLoginForm";
//
// type ChatMessage = {
//   id: number;
//   content: string;
//   createdAt: string;
//   nickname: string;
//   userId: number;
// };
//
// export default function ChatPage() {
//   const { token } = useAuth();
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState("");
//   const [connected, setConnected] = useState(false);
//   const bottomRef = useRef<HTMLDivElement | null>(null);
//
//   useEffect(() => {
//     if (!token) return;
//
//     connectSocket(token);
//     fetchMessages();
//
//     const socket = getSocket();
//     socket.on("connect", () => setConnected(true));
//     socket.on("disconnect", () => setConnected(false));
//     socket.on("chat", (msg: ChatMessage) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//
//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("chat");
//     };
//   }, [token]);
//
//   const fetchMessages = async () => {
//     if (!token) return;
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/chat/messages`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       },
//     );
//     const data = await res.json();
//     if (res.ok) setMessages(data);
//   };
//
//   const sendMessage = () => {
//     if (!input.trim()) return;
//     const socket = getSocket();
//     socket.emit("chat", { content: input });
//     setInput("");
//   };
//
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);
//
//   const isMine = (userId: number) => userId === getUserIdFromToken(token ?? "");
//
//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">
//         실시간 채팅(방명록)(기능테스트 임시용)
//       </h1>
//
//       {!token ? (
//         <>
//           <p className="text-gray-600 mb-2">
//             닉네임을 입력하고 채팅을 시작하세요.
//           </p>
//           <SimpleLoginForm onSuccess={() => window.location.reload()} />
//         </>
//       ) : (
//         <>
//           <div className="border h-[400px] overflow-y-auto p-2 space-y-2 bg-gray-50 rounded">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${isMine(msg.userId) ? "justify-end" : "justify-start"}`}
//               >
//                 <div className="bg-white px-3 py-2 rounded shadow text-sm max-w-[70%]">
//                   {!isMine(msg.userId) && (
//                     <div className="font-semibold text-gray-600 mb-1">
//                       {msg.nickname}
//                     </div>
//                   )}
//                   <div>{msg.content}</div>
//                 </div>
//               </div>
//             ))}
//             <div ref={bottomRef} />
//           </div>
//
//           <div className="flex mt-4 gap-2">
//             <input
//               type="text"
//               className="flex-1 border p-2 rounded"
//               placeholder="메시지를 입력하세요"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               disabled={!connected || !input.trim()}
//               className="bg-black text-white px-4 rounded disabled:opacity-50"
//             >
//               전송
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
//
// // JWT에서 userId 추출
// function getUserIdFromToken(token: string): number | null {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.sub;
//   } catch {
//     return null;
//   }
// }

import ChatLayout from "@/components/chat/ChatLayout";

export default function ChatPage() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4 space-y-4">
      <h1 className="text-xl font-semibold text-gray-700 text-center">
        자유롭게 의견을 나누는 공간입니다. <br />
        닉네임만으로 채팅에 참여할 수 있어요!
      </h1>
      <ChatLayout />
    </main>
  );
}
