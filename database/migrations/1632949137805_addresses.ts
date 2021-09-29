import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Addresses extends BaseSchema {
  protected tableName = "addresses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table.string("city").notNullable();
      table.string("uf").notNullable();
      table.string("cep").notNullable();
      table.string("address").notNullable();
      table.integer("number").notNullable();

      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
