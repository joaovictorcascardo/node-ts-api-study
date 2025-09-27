export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  role: "admin" | "user";
};

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}
