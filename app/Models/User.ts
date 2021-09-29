import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  CherryPick
} from "@ioc:Adonis/Lucid/Orm";
import UserKey from "./UserKey";
import Address from "./Address";
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public type: "normal" | "admin";

  @column()
  public confirmed: true | false;

  @hasMany(() => UserKey)
  public key: HasMany<typeof UserKey>;

  @hasOne(() => Address)
  public address: HasOne<typeof Address>;

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toFormat("dd/MM/yyyy HH:mm:ss");
    }
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat("dd/MM/yyyy HH:mm:ss");
    }
  })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  public serialize(cherryPick?: CherryPick) {
    return {
      ...this.serializeAttributes(cherryPick?.fields, false),
      ...this.serializeComputed(cherryPick?.fields),
      ...this.serializeRelations(
        {
          author: {
            fields: ["id", "name", "email", "type"]
          }
        },
        false
      )
    };
  }
}
