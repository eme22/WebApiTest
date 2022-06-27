import { Get, Route, Tags,  Post, Body, Path, Delete, Inject, Patch } from "tsoa";
import {Item} from '../models'
import {getItems, createItem, IItemPayload, getItem, deleteItem, getItemsByCategory, updateItem} from '../repositories/item.repository'

@Route("items")
@Tags("Item")
export default class ItemController {
  @Get("/all/")
  public async getItems(): Promise<Array<Item>> {
    return getItems()
  }

  @Post("/")
  public async createItem(@Body() body: IItemPayload, @Inject() buffer: Buffer, @Inject() fileExtension: string): Promise<Item> {
    return createItem(body, buffer, fileExtension)
  }

  @Patch("/")
  public async updateItem(@Body() body: IItemPayload,  @Inject() buffer: Buffer, @Inject() fileExtension: string): Promise<Boolean> {
    return updateItem(body, buffer, fileExtension)
  }

  @Get("/id/:id")
  public async getItem(@Path() id: string): Promise<Item | null> {
    return getItem(Number(id))
  }

  @Delete("/id/:id")
  public async deleteItem(@Path() id: string): Promise<Boolean | null> {
    return deleteItem(Number(id))
  }

  @Get("category/:categoryId")
  public async getItemByCategory(@Path() categoryId: string): Promise<Array<Item>> {
    return getItemsByCategory(Number(categoryId))
  }

  
}