import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
  private postBusiness = new PostBusiness();

  public getAllPosts = (req: Request, res: Response) => {
    try {
      const allPosts = this.postBusiness.getAllPosts();
      res.status(200).send(allPosts);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };

  public createPost = (req: Request, res: Response) => {
    try {
      const { title, content, authorId } = req.body;
      const newPost = this.postBusiness.createPost(title, content, authorId);
      res.status(201).send(newPost);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };

  public updatePost = (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const dataToUpdate = req.body;
      const updatedPost = this.postBusiness.updatePost(id, dataToUpdate);
      res.status(200).send(updatedPost);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };

  public deletePost = (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = parseInt(req.headers["user-id"] as string);
      this.postBusiness.deletePost(postId, userId);
      res.status(200).send({ message: "Post deletado com sucesso." });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };
}
