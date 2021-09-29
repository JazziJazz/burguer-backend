import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public city: string;

  @column()
  public uf: string;

  @column()
  public cep: string;

  @column()
  public address: string;

  @column()
  public number: number;

  @column()
  public userId: number;

  @belongsTo(() => User, { foreignKey: "id" })
  public author: BelongsTo<typeof User>;
}
