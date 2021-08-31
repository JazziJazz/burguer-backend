import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("", "UsersController.store");
}).prefix("/register");
