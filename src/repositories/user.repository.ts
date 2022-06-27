import {getRepository} from "typeorm";
import {User} from '../models'

import fs from 'fs';
import { address } from "faker";

export interface IUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  address: string;
  phone: number;
  admin: boolean;
  data: Buffer;
}

export const getUsers  = async () :Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find()
}

export const createUser  = async (payload: IUserPayload, buffer: Buffer | undefined, extension: string) :Promise<User> => {
  const userRepository = getRepository(User);
  var user = new User()


  user = await userRepository.save({
    ...user,
    ...payload
  })

  if (buffer !== undefined) {
    const image = "/img/user/"+user.id+extension;
    fs.writeFileSync("./public"+ image, buffer);
    user.image = image;
    await userRepository.update(user.id, user)
  }

  return user

}

export const updateUser  = async (payload: IUserPayload, buffer: Buffer | undefined, extension: string) :Promise<Boolean> => {
  const userRepository = getRepository(User);
  var user = await userRepository.findOne( {email: payload.email});

  if (user == null)
    return false;

  let update = (await userRepository.update({id: user.id}, {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    passwordHash: payload.passwordHash,
    phone: payload.phone,
    address: payload.address
  })).affected != 0;


  if (update && buffer !== undefined) {
    const image = "/img/user/"+user.id+extension;
    fs.writeFileSync("./public"+ image, buffer);
    await userRepository.update(user.id, {image})
  }

  return update

}

export const getUser  = async (id: number) :Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({id})
  if (!user) return null
  return user
}

export const deleteUser  = async (user: number | User) :Promise<Boolean> => {
  const userRepository = getRepository(User);
  const user2 = await userRepository.delete(user)
  if (!user2) return false;
  return user2.affected != 0;
}

export const userExist  = async (email: string, passwordHash: string) :Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({email, passwordHash})
  if (!user) return null;
  return user;
}

export const userExist2  = async (email: string) :Promise<Boolean> => {
  if (!email) return false;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({email})
  if (!user) return false;
  return true;
}

export const userCount  = async () :Promise<number> => {
  const userRepository = getRepository(User);
  const user = await userRepository.count()
  return user;
}