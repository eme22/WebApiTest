import { Get, Route, Tags,  Post, Body, Path, Delete, Inject } from "tsoa";
import {Item} from '../models'
import {getItems, createItem, IItemPayload, getItem, deleteItem} from '../repositories/item.repository'

@Route("items")
@Tags("Item")
export default class ItemController {
  @Get("/")
  public async getItems(): Promise<Array<Item>> {
    return getItems()
  }

  @Post("/")
  public async createItem(@Body() body: IItemPayload, @Inject() buffer: Buffer, @Inject() fileExtension: string): Promise<Item> {
    return createItem(body, buffer, fileExtension)
  }

  @Get("/:id")
  public async getItem(@Path() id: string): Promise<Item | null> {
    return getItem(Number(id))
  }

  @Delete("/:id")
  public async deleteItem(@Path() id: string): Promise<Boolean | null> {
    return deleteItem(Number(id))
  }
}