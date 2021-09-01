import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("home");
});

/* Rota de registro de usuário */
Route.group(() => {
  Route.post("", "User/RegistersController.store");
}).prefix("/register");

/* Rota de autenticação de usuário */
Route.group(() => {
  Route.post("/", "AuthController.store");
  Route.delete("/", "AuthController.destroy");
}).prefix("/auth");

/* Rota de gerenciamento de postagens */
Route.group(() => {
  Route.get("", "PostsController.index");
  Route.post("", "PostsController.store").middleware(["acl:admin"]);
  Route.put("", "PostsController.update").middleware(["acl:admin"]);
  Route.delete("", "PostsController.destroy").middleware(["acl:admin"]);
}).prefix("/posts");
