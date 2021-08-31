import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator);
    const user = await User.create(data);

    return user;
  }
}
