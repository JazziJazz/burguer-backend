import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { StoreValidator, UpdateValidator } from "App/Validators/Post";
import Post from "App/Models/Post";

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.query().orderBy("id", "asc").preload("author");

    return posts;
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator);
    const user = await auth.authenticate();

    const post = await Post.create({ authorId: user.id, ...data });
    await post.load("author");

    return post;
  }

  public async show({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id);

    return post;
  }

  public async update({ request, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id);
    const data = await request.validate(UpdateValidator);

    post.merge(data);
    await post.save();
    await post.load("author");

    return post;
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id);

    await post.delete();
  }
}
