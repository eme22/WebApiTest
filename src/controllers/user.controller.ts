import { Get, Route, Tags,  Post, Body, Path, Delete, Inject, Patch } from "tsoa";
import {User} from '../models'
import {getUsers, createUser, updateUser, IUserPayload, getUser, deleteUser, userCount, userExist, userExist2} from '../repositories/user.repository'

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/all/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers()
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload,  @Inject() buffer: Buffer | undefined, @Inject() fileExtension: string): Promise<User> {
    return createUser(body, buffer, fileExtension)
  }

  @Patch("/")
  public async updateUser(@Body() body: IUserPayload,  @Inject() buffer: Buffer | undefined, @Inject() fileExtension: string): Promise<Boolean> {
    return updateUser(body, buffer, fileExtension)
  }

  @Get("/id/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return getUser(Number(id))
  }

  @Delete("/id/:id")
  public async deleteUser(@Path() id: string): Promise<Boolean | null> {
    return deleteUser(Number(id))
  }


  public async login(email: string, passwordHash: string):  Promise<User| null>  {
    return userExist(email, passwordHash)
  }

  @Get("/exist/:email")
  public async exist(@Path() email: string): Promise<Boolean> {
    return userExist2(email);
  }

  @Get("/count")
  public async count(): Promise<number> {
    return userCount()
  }
}