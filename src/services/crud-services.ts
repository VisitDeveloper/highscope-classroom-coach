// custom
// import { ApiPayload } from "../model/service/api-payload.model";
// import { ApiResponse } from "../model/service/api-response.model";
import { BaseService } from "./base-Services";

export abstract class CrudService<
    EntityModel,
    EntityCreateModel,
    EntityUpdateModel
> extends BaseService {
    abstract entityBaseUrl: string;

    create(payload: EntityCreateModel) {
        return this.axiosInstanceWithoutToken.post(
            `/${this.entityBaseUrl}/create`,
            payload
        );
    }

    update(payload: EntityUpdateModel, entityId: string) {
        return this.axiosInstanceWithoutToken.put(
            `/${this.entityBaseUrl}/update/${entityId}`,
            payload
        );
    }

    // Promise<ApiResponse<Array<EntityModel>>>
    getList(payload?: any): Promise<any> {
        return this.axiosInstanceWithoutToken.get(
            `/${this.entityBaseUrl}`,
            payload
        );
    }

    // Promise<ApiResponse<Array<EntityModel>>>
    getJustNameList(
        payload?: any
    ): Promise<any> {
        return this.axiosInstanceWithToken.post(
            `/${this.entityBaseUrl}/short/list`,
            payload
        );
    }

    // Promise<ApiResponse<EntityModel>>
    getById(entityId: string): Promise<any> {
        return this.axiosInstanceWithToken.get(
            `/${this.entityBaseUrl}/byId/${entityId}`
        );
    }

    delete(entityId: string) {
        return this.axiosInstanceWithToken.delete(
            `/${this.entityBaseUrl}/remove/${entityId}`
        );
    }

    logicDelete(entityId: string) {
        return this.axiosInstanceWithToken.delete(
            `/${this.entityBaseUrl}/remove/logic/${entityId}`
        );
    }
}
