import { Post } from "../types/types";
import { posts } from "./database";

export class PostData {
  public findAllPosts = () => {
    return posts;
  };

  public findById = (id: number) => {
    return posts.find((p) => p.id === id);
  };

  public generateNewId = () => {
    return posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1;
  };

  public create = (newPost: Post) => {
    posts.push(newPost);
  };

  public update = (
    id: number,
    data: { title?: string; content?: string; published?: boolean }
  ) => {
    const post = this.findById(id);
    if (post) {
      if (data.title !== undefined) post.title = data.title;
      if (data.content !== undefined) post.content = data.content;
      if (data.published !== undefined) post.published = data.published;
    }
  };

  public delete = (id: number) => {
    const index = posts.findIndex((p) => p.id === id);
    if (index > -1) {
      posts.splice(index, 1);
    }
  };
}
