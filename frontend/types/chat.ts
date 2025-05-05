export type ChatMessage = {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  isAdmin: boolean;
};
