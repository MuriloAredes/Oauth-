import { Request, Response } from "express";
import { AppDataSource } from "./../../database/connect";
import User from "./../models/user";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { IsNull } from "typeorm";

class AuthController {
  index(request: Request, response: Response) {
    return response.json({userId: request.userId});
  }
  async authenticate(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(User);
    const { email, password } = request.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return response.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    const token = Jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

    user.password = "";

    return response.json({
      user,
      token,
    });
  }
}

export default new AuthController();
