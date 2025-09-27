import { Post, User } from "../types/types";

export let users: User[] = [
  { id: 1, name: "Alice", email: "alice@email.com", age: 28, role: "admin" },
  { id: 2, name: "Bob", email: "bob@email.com", age: 32, role: "user" },
  { id: 3, name: "Charlie", email: "charlie@email.com", age: 25, role: "user" },
];

export let posts: Post[] = [];
