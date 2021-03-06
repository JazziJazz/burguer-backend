import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class UserKey extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public key: string;

  @column()
  public userId: number;

  @belongsTo(() => User, {})
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
}
