import { UserData } from "../data/UserData";
import { posts } from "../data/database";

export class UserBusiness {
  private userData = new UserData();

  public getUserById(id: number) {
    if (isNaN(id)) {
      throw new Error("ID inválido. Deve ser um número.");
    }

    const user = this.userData.findUserById(id);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }

  public getUsersByAgeRange(min: number, max: number) {
    if (isNaN(min) || isNaN(max)) {
      throw new Error("Parâmetros 'min' e 'max' devem ser números.");
    }
    return this.userData.findUsersByAgeRange(min, max);
  }

  public cleanupInactiveUsers(confirm: string) {
    if (confirm !== "true") {
      throw new Error("Para confirmar, envie 'true' no parâmetro 'confirm'");
    }

    const inactiveUsers = this.userData.findInactiveUsers(posts);

    const activeUsers = this.userData
      .getAllUsers()
      .filter((user) => !inactiveUsers.includes(user));

    return inactiveUsers;
  }
}
