import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { UserRegisterValidator } from "App/Validators/User/";
import faker from "faker";

export default class UserRegisterController {
  public async store({ request }: HttpContextContract) {
    /* Primeiramente nós pegamos os dados do request e armazenamos em requestData, após isso
    desestruturamos requestData retirando o atributo de redirectUrl criando uma cópia de requestData sem essa informação. Armazenamos essa nova const em data. */
    const requestData = await request.validate(UserRegisterValidator);
    const { redirectUrl, ...data } = requestData;

    // Criamos e salvamos as informações do usuário no nosso banco de dados.
    const user = await User.create(data);
    await user.save();

    /* Utilizamos a biblioteca faker para criar um novo dado do tipo identificador único universal (uuid). Somamos o tempo atual da máquina para garantir que essa uuid realmente será única.

    Por fim, pegamos o usuário e iremos até o seu relacionamento key, criando um novo dado dentro desse relacionamento, informando o uuid que haviamos criado anteriormente. */
    const myKey = faker.datatype.uuid() + new Date().getTime();
    user.related("key").create({ key: myKey });

    // const linkToEmail = `${requestData.redirectUrl.replace(/\/$/, "")}/${myKey}`;

    return user;
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}
}
