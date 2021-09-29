import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersSchema extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table.string("name").notNullable();
      table.string("cpf", 14).unique().notNullable();
      table.string("email").unique().notNullable();
      table.string("password", 180).notNullable();
      table.enu("type", ["normal", "admin"]).defaultTo("normal").notNullable();
      table.enu("confirmed", [true, false]).defaultTo(false).notNullable();

      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
