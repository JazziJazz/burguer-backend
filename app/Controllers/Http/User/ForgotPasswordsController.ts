import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ForgotPasswordValidator, UpdatePasswordValidator } from "App/Validators/User";
import User from "App/Models/User";
import UserKey from "App/Models/UserKey";
import Mail from "@ioc:Adonis/Addons/Mail";
import faker from "faker";

export default class ForgotPasswordsController {
  public async store({ request, response }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(ForgotPasswordValidator);

    const user = await User.findByOrFail("email", email);
    const myKey = faker.datatype.uuid() + new Date().getTime();
    user.related("key").create({ key: myKey });

    const linkToEmail = `${redirectUrl.replace(/\/$/, "")}/${myKey}`;

    await Mail.send((message) => {
      message.to(email);
      message.from("hamburgueria-zl@contato.zlburguer.com", "ZêEle Burguer");
      message.subject("ZêEle Burguer: Recuperação de cadastro");
      message.htmlView("emails/forgotten_password", { linkToEmail });
    });

    return response.ok({
      message: "Um email de confirmação foi enviado ao proprietário da conta. "
    });
  }

  public async show({ params }: HttpContextContract) {
    await UserKey.findByOrFail("key", params.key);
  }

  public async update({ request }: HttpContextContract) {
    const { key, password } = await request.validate(UpdatePasswordValidator);

    const userKey = await UserKey.findByOrFail("key", key);

    await userKey.load("user");
    userKey.user.merge({ password });

    await userKey.user.save();
    await userKey.delete();

    return { message: "O password foi trocado com sucesso." };
  }
}
