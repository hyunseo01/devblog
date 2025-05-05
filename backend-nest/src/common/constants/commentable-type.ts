/** 상수 enum 정의 (다형성 타입) */
export const COMMENTABLE_TYPES = ['work', 'board'] as const;
export type CommentableType = (typeof COMMENTABLE_TYPES)[number];
