import { Category, Item } from "../models";
import { getRepository, ILike } from "typeorm";

export class ISearchResult {
    name!: string;
    category!: string;
    id!: number;
    image!: string;

    constructor(name: string, category: string, id: number, image: string) {
        this.name = name;
        this.category = category;
        this.id = id;
        this.image = image;
      }
}


  export const searchForData  = async (query : String) :Promise<Array<ISearchResult>> => {

    const itemRepository = getRepository(Item);
    const categoryRepository = getRepository(Category);

    var items = await itemRepository.find({ where: { name: ILike(`%${query}%`)}});

    var categories = await categoryRepository.find({ where: { name: ILike(`%${query}%`)} });

    let result: Array<ISearchResult> = new Array();

    items.forEach(item => {
        result.push(new ISearchResult(item.name, 'item', item.id, item.image))
    });

    categories.forEach(category => {
        result.push(new ISearchResult(category.name, 'category', category.id, category.image))
    });


    return result;
  }