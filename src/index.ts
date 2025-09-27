import { app } from "./app";
import { postRouter } from "./routes/postRoutes";
import { userRouter } from "./routes/userRouter";

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});
