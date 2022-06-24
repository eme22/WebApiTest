import { ISearchResult, searchForData } from "../repositories/search.repository";
import { Get, Path, Route, Tags } from "tsoa";


@Route("search")
@Tags("Search")
export default class SearchController {

    @Get("/:query")
    public async search(@Path() query: string): Promise<Array<ISearchResult> | null> {
      return searchForData(query);
    }

 }