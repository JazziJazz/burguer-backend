import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class FirstUserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: "Rodrigo Siliunas",
        dateOfBirth: "12/08/1998",
        cpf: "000.000.000-90",
        email: "rodrigo.siliunas12@gmail.com",
        password: "Rodrigo123"
      },
      {
        name: "Silvio Rodrigo",
        dateOfBirth: "12/08/1988",
        cpf: "000.000.000-80",
        email: "silvio.rodrigo12@gmail.com",
        password: "Silvio123",
        type: "admin"
      }
    ]);
  }
}
