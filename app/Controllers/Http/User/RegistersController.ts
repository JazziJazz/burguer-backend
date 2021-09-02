import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { UserRegisterValidator } from "App/Validators/User/";
import Database from "@ioc:Adonis/Lucid/Database";
import Mail from "@ioc:Adonis/Addons/Mail";
import User from "App/Models/User";
import faker from "faker";
import UserKey from "App/Models/UserKey";

export default class RegistersController {
  public async store({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      /* Primeiramente nós pegamos os dados do request e armazenamos em requestData, após isso
      desestruturamos requestData retirando o atributo de redirectUrl criando uma cópia de
      requestData sem essa informação. Armazenamos essa nova const em data. */
      const requestData = await request.validate(UserRegisterValidator);
      const { redirectUrl, ...data } = requestData;

      // Criamos e salvamos as informações do usuário no nosso banco de dados.
      const user = new User();

      user.name = data.name;
      user.dateOfBirth = data.date_of_birth;
      user.cpf = data.cpf;
      user.email = data.email;
      user.password = data.password;

      user.useTransaction(trx);
      await user.save();

      /* Utilizamos a biblioteca faker para criar um novo dado do tipo identificador único universal
      (uuid). Somamos o tempo atual da máquina para garantir que essa uuid realmente será única.

      Por fim, pegamos o usuário e iremos até o seu relacionamento key, criando um novo dado
      dentro desse relacionamento, informando o uuid que haviamos criado anteriormente. */
      const myKey = faker.datatype.uuid() + new Date().getTime();
      user.related("key").create({ key: myKey });

      const linkToEmail = `${requestData.redirectUrl.replace(/\/$/, "")}/${myKey}`;

      await Mail.send((message) => {
        message.to(data.email);
        message.from("hamburgueria-zl@contato.zlburguer.com", "ZêEle Burguer");
        message.subject("ZêEle Burguer: Ativação de cadastro");
        message.htmlView("emails/register", { linkToEmail });
      });

      return response.ok({ sucess: { message: "Um e-mail de confirmação foi enviado." } });
    });
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail("key", params.key);
    const userToUpdate = await User.findByOrFail("id", userKey.id);

    await userToUpdate.merge({ confirmed: true }).save();
    const userInformation = await userKey.related("user").query().firstOrFail();

    const { confirmed, type, rememberMeToken, password, ...data } = userInformation.$original;

    return data;
  }
}
