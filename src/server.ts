import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  role: "admin" | "user";
};

let users: User[] = [
  { id: 1, name: "Alice", email: "alice@email.com", age: 28, role: "admin" },
  { id: 2, name: "Bob", email: "bob@email.com", age: 32, role: "user" },
  { id: 3, name: "Charlie", email: "charlie@email.com", age: 25, role: "user" },
];

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});
