import {getRepository} from "typeorm";
import {Item} from '../models'

import fs from 'fs';

export interface IItemPayload {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  price: number;
  promoId: number;
  data: File;
}

export const getItems  = async () :Promise<Array<Item>> => {
  const itemRepository = getRepository(Item);
  return itemRepository.find()
}

export const updateItem  = async (payload: IItemPayload, buffer: Buffer, extension: string) :Promise<Boolean> => {
  const itemRepository = getRepository(Item);

  var item = await itemRepository.update({id: payload.id} ,payload);

  if (item == null) return false;

  const image = "/img/item/"+payload.id+extension;

  fs.writeFileSync("./public"+ image, buffer);

  await itemRepository.update(payload.id, {image})

  return item.affected != 0;

}

export const createItem  = async (payload: IItemPayload, buffer: Buffer, extension: string) :Promise<Item> => {
  const itemRepository = getRepository(Item);
  var item = new Item()

  item = await itemRepository.save({
    ...item,
    ...payload
  })

  const image = "/img/item/"+item.id+extension;

  fs.writeFileSync("./public"+ image, buffer);

  item.image = image;

  await itemRepository.update(item.id, item)

  return item

}

export const getItem  = async (id: number) :Promise<Item | null> => {
  const itemRepository = getRepository(Item);
  const item = await itemRepository.findOne({id})
  if (!item) return null
  return item
}

export const deleteItem  = async (item: number | Item) :Promise<Boolean> => {
  const itemRepository = getRepository(Item);
  const item2 = await itemRepository.delete(item)
  if (!item2) return false;
  return item2.affected != 0;
}

export const getItemsByCategory  = async (categoryId: number) :Promise<Array<Item>> => {
  const itemRepository = getRepository(Item);
  const item = await itemRepository.find({categoryId})
  return item
}