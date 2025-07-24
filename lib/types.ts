
export interface Idea {
  id: string | number;
  content: string;
  tags: string[] | string;
  likes: number;
  created_at?: string | Date;
}
