import {Double, getRepository} from "typeorm";
import {Category} from '../models'

import fs from 'fs';

export interface ICategoryPayload {
  id: number;
  name: string;
  description: string;
  data: File;
}

export const getCategorys  = async () :Promise<Array<Category>> => {
  const categoryRepository = getRepository(Category);
  return categoryRepository.find()
}

export const updateCategory = async (payload: ICategoryPayload, buffer: Buffer, extension: string) :Promise<Boolean> => {
  const categoryRepository = getRepository(Category);

  var category = await categoryRepository.update({id: payload.id} , {
    name: payload.name,
    description: payload.description,
  });

  if (category == null) return false;

  const image = "/img/category/"+payload.id+extension;

  fs.writeFileSync("./public"+ image, buffer);

  await categoryRepository.update(payload.id, {image})

  return category.affected != 0;

}

export const createCategory  = async (payload: ICategoryPayload, buffer: Buffer, extension: string) :Promise<Category> => {
  const categoryRepository = getRepository(Category);
  var category = new Category()

  category = await categoryRepository.save({
    ...category,
    ...payload
  })

  const image = "/img/category/"+category.id+extension;

  fs.writeFileSync("./public"+ image, buffer);

  category.image = image;

  await categoryRepository.update(category.id, category)

  return category

}

export const getCategory  = async (id: number) :Promise<Category | null> => {
  const categoryRepository = getRepository(Category);
  const category = await categoryRepository.findOne({id})
  if (!category) return null
  return category
}


export const deleteCategory  = async (category: number | Category) :Promise<Boolean> => {
    const categoryRepository = getRepository(Category);
    const category2 = await categoryRepository.delete(category)
    if (!category2) return false;
    return category2.affected != 0;
}