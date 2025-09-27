import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  private userBusiness = new UserBusiness();

  public getUserById = (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = this.userBusiness.getUserById(id);
      res.status(200).send(user);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };

  public getUsersByAgeRange = (req: Request, res: Response) => {
    try {
      const min = parseInt(req.query.min as string);
      const max = parseInt(req.query.max as string);
      const users = this.userBusiness.getUsersByAgeRange(min, max);
      res.status(200).send(users);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };

  public cleanupInactiveUsers = (req: Request, res: Response) => {
    try {
      const confirm = req.query.confirm as string;
      const removedUsers = this.userBusiness.cleanupInactiveUsers(confirm);
      res.status(200).send(removedUsers);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };
}
