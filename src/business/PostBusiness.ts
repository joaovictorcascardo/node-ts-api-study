import { PostData } from "../data/Postdata";
import { UserData } from "../data/UserData";
import { Post } from "../types/types";

export class PostBusiness {
  private postData = new PostData();
  private userData = new UserData();

  public getAllPosts() {
    return this.postData.findAllPosts();
  }

  public createPost(title: string, content: string, authorId: number) {
    if (!title || !content || !authorId) {
      throw new Error(
        "Campos 'title', 'content' e 'authorId' são obrigatórios."
      );
    }
    if (typeof title !== "string" || title.length < 3) {
      throw new Error("O título deve ter no mínimo 3 caracteres.");
    }
    if (typeof content !== "string" || content.length < 10) {
      throw new Error("O conteúdo deve ter no mínimo 10 caracteres.");
    }

    const author = this.userData.findUserById(authorId);
    if (!author) {
      throw new Error("Autor não encontrado.");
    }

    const newId = this.postData.generateNewId();

    const newPost: Post = {
      id: newId,
      title,
      content,
      authorId,
      createdAt: new Date(),
      published: false,
    };

    this.postData.create(newPost);
    return newPost;
  }

  public updatePost(id: number, dataToUpdate: any) {
    if (isNaN(id)) {
      throw new Error("ID do post inválido.");
    }

    const post = this.postData.findById(id);
    if (!post) {
      throw new Error("Post não encontrado.");
    }

    if (
      dataToUpdate.id !== undefined ||
      dataToUpdate.authorId !== undefined ||
      dataToUpdate.createdAt !== undefined
    ) {
      throw new Error(
        "Não é permitido alterar os campos 'id', 'authorId' ou 'createdAt'."
      );
    }

    this.postData.update(id, dataToUpdate);
    return this.postData.findById(id);
  }

  public deletePost(postId: number, userId: number) {
    if (isNaN(postId) || isNaN(userId)) {
      throw new Error("IDs inválidos.");
    }

    const post = this.postData.findById(postId);
    if (!post) {
      throw new Error("Post não encontrado.");
    }

    const user = this.userData.findUserById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    if (post.authorId !== user.id && user.role !== "admin") {
      throw new Error("Você não tem permissão para deletar este post.");
    }

    this.postData.delete(postId);
  }
}
