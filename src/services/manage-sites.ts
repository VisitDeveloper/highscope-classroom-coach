// custom
// import {
//   KeywordEntityCreateModel,
//   KeywordEntityModel,
//   KeywordEntityUpdateModel,
// } from "../model/entity/keyword.model";
import { CrudService } from "./crud-services";

export class ManageSiteService extends CrudService<
    any,
    any,
    any
> {
    entityBaseUrl = "posts";

    //   addCategory(
    //     keywordId: string,
    //     listOfCategoriesIds: Array<string>
    //   ): Promise<any> {
    //     return this.axiosInstanceWithToken.post(
    //       `/${this.entityBaseUrl}/${keywordId}/addCategory`,
    //       listOfCategoriesIds
    //     );
    //   }

    //   removeCategory(
    //     keywordId: string,
    //     listOfCategoriesIds: Array<string>
    //   ): Promise<any> {
    //     return this.axiosInstanceWithToken.post(
    //       `/${this.entityBaseUrl}/${keywordId}/removeCategory`,
    //       listOfCategoriesIds
    //     );
    //   }

    //   toggleKeywordInBookmarks(keywordId: string): Promise<any> {
    //     return this.axiosInstanceWithToken.head(
    //       `/${this.entityBaseUrl}/toggleFavorite/${keywordId}`
    //     );
    //   }
    //   getKeywordSubCategory(id: string): Promise<any> {
    //     return this.axiosInstanceWithToken.get(
    //       `/${this.entityBaseUrl}/subCategory?category=${id}`
    //     );
    //   }
}
