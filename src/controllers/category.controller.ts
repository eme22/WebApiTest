import { Get, Route, Tags,  Post, Body, Path, Delete, Inject } from "tsoa";
import {Category} from '../models'
import {getCategorys, createCategory, ICategoryPayload, getCategory, deleteCategory, updateCategory} from '../repositories/category.repository'

@Route("categories")
@Tags("Category")
export default class CategoryController {
  @Get("/")
  public async getCategorys(): Promise<Array<Category>> {
    return getCategorys()
  }

  @Post("/")
  public async createCategory(@Body() body: ICategoryPayload, @Inject() buffer: Buffer,  @Inject() fileExtension: string): Promise<Category> {
    return createCategory(body, buffer, fileExtension)
  }

  @Patch("/")
  public async updateCategory(@Body() body: ICategoryPayload,  @Inject() buffer: Buffer, @Inject() fileExtension: string): Promise<Boolean> {
    return updateCategory(body, buffer, fileExtension)
  }

  @Get("/:id")
  public async getCategory(@Path() id: string): Promise<Category | null> {
    return getCategory(Number(id))
  }

  @Delete("/:id")
  public async deleteCategory(@Path() id: string): Promise<Boolean | null> {
    return deleteCategory(Number(id))
  }
}