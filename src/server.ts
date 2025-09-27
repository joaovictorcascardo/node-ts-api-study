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

console.log(users);

app.get("/users/age-range", (req: Request, res: Response) => {
  const min = parseInt(req.query.min as string);
  const max = parseInt(req.query.max as string);
  if (isNaN(min) || isNaN(max)) {
    return res.status(400).send("Parâmetros 'min' e 'max' devem ser números.");
  }
  const filteredUsers = users.filter(
    (user) => user.age >= min && user.age <= max
  );
  res.status(200).send(filteredUsers);
});

app.get("/users/:id", (req, res) => {
  let userId = parseInt(req.params.id);
  let user = users.find((u) => u.id === userId);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send(user);
  }
});

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}

let posts: Post[] = [];

app.post("/posts", (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).send({
      message: "Está faltando um campo: 'title', 'content' ou 'authorId'.",
    });
  }

  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    typeof authorId !== "number"
  ) {
    return res.status(400).send({
      message:
        "Verifique se 'title' e 'content' são texto, e 'authorId' é um número.",
    });
  }

  if (title.length < 3) {
    return res
      .status(400)
      .send({ message: "O título precisa de no mínimo 3 caracteres." });
  }

  if (content.length < 10) {
    return res
      .status(400)
      .send({ message: "O conteúdo precisa de no mínimo 10 caracteres." });
  }

  const autorDoPost = users.find((user) => user.id === authorId);
  if (!autorDoPost) {
    return res
      .status(404)
      .send({ message: "O autor com esse ID não foi encontrado." });
  }

  const novoId =
    posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1;

  const novoPost: Post = {
    id: novoId,
    title: title,
    content: content,
    authorId: authorId,
    createdAt: new Date(),
    published: false,
  };

  posts.push(novoPost);

  res.status(201).send(novoPost);
});

app.patch("/posts/:id", (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const { title, content, published } = req.body;

  const postToUpdate = posts.find((post) => post.id === postId);

  if (!postToUpdate) {
    return res.status(404).send({ message: "Post não encontrado" });
  }

  if (
    req.body.id !== undefined ||
    req.body.authorId !== undefined ||
    req.body.createdAt !== undefined
  ) {
    return res.status(400).send({
      message:
        "Não é permitido alterar os campos 'id', 'authorId' ou 'createdAt'.",
    });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.length < 3) {
      return res.status(400).send({
        message:
          "O campo 'title' deve ser um texto com no mínimo 3 caracteres.",
      });
    }
    postToUpdate.title = title;
  }

  if (content !== undefined) {
    if (typeof content !== "string" || content.length < 10) {
      return res.status(400).send({
        message:
          "O campo 'content' deve ser um texto com no mínimo 10 caracteres.",
      });
    }
    postToUpdate.content = content;
  }

  if (published !== undefined) {
    if (typeof published !== "boolean") {
      return res.status(400).send({
        message:
          "O campo 'published' deve ser um valor booleano (true ou false).",
      });
    }
    postToUpdate.published = published;
  }
  res.status(200).send(postToUpdate);
  console.log(posts);
});

app.delete("/posts/:id", (req: Request, res: Response) => {
  const postIdToDelete = parseInt(req.params.id);

  const userId = parseInt(req.headers["user-id"] as string);

  const postToDelete = posts.find((post) => post.id === postIdToDelete);
  if (!postToDelete) {
    return res.status(404).send({ message: "Post não encontrado." });
  }

  const requestingUser = users.find((user) => user.id === userId);
  if (!requestingUser) {
    return res
      .status(404)
      .send({ message: "Usuário autor da requisição não encontrado." });
  }
  if (
    postToDelete.authorId !== requestingUser.id &&
    requestingUser.role !== "admin"
  ) {
    return res
      .status(403)
      .send({ message: "Você não tem permissão para deletar este post." });
  }
  posts = posts.filter((post) => post.id !== postIdToDelete);

  res.status(200).send({ message: "Post deletado com sucesso." });
});

app.delete("/users/cleanup-inactive", (req, res) => {
  const confirm = req.query.confirm;

  if (confirm !== "true") {
    return res
      .status(400)
      .send(
        "Para confirmar a limpeza, envie 'true' no parâmetro de consulta 'confirm'"
      );
  }

  const usersToRemove = users.filter((user) => {
    const hasPosts = posts.some((post) => post.authorId === user.id);
    return !hasPosts && user.role !== "admin";
  });

  users = users.filter((user) => !usersToRemove.includes(user));

  return res.status(200).json(usersToRemove);
});
