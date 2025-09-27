import { Post } from "../types/types";
import { users } from "./database";

export class UserData {
  public getAllUsers = () => {
    return users;
  };

  public findUserById = (id: number) => {
    return users.find((u) => u.id === id);
  };

  public findUsersByAgeRange = (min: number, max: number) => {
    return users.filter((user) => user.age >= min && user.age <= max);
  };

  public findInactiveUsers = (allPosts: Post[]) => {
    return users.filter((user) => {
      const hasPosts = allPosts.some((post) => post.authorId === user.id);
      return !hasPosts && user.role !== "admin";
    });
  };
}
