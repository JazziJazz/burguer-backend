import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.string("name").notNullable();
      table.string("date_of_birth", 10).notNullable();
      table.string("cpf", 14).unique().notNullable();
      table.string("email").unique().notNullable();
      table.string("password", 180).notNullable();
      table.enu("type", ["normal", "admin"]).defaultTo("normal").notNullable();
      table.string("remember_me_token").nullable();

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
