import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("home");
});

Route.get("/register-confirmation", async ({ view }) => {
  return view.render("emails/register");
});

/* Rota de controle do usuário */
Route.group(() => {
  // Rotas de registro do usuário.
  Route.post("/register", "Register/RegistersController.store");
  Route.get("/register/:key", "Register/RegistersController.show");

  // Rotas de recuperação de cadastro.
  Route.post("/forgotten-password", "User/ForgotPasswordsController.store");
  Route.get("/forgotten-password/:key", "User/ForgotPasswordsController.show");
  Route.put("/forgotten-password", "User/ForgotPasswordsController.update");
});

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
