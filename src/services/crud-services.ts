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
        return this.axiosInstanceWithoutTokenFakeAPI.post(
            `/${this.entityBaseUrl}/create`,
            payload
        );
    }

    update(payload: EntityUpdateModel, entityId: string) {
        return this.axiosInstanceWithoutTokenFakeAPI.put(
            `/${this.entityBaseUrl}/update/${entityId}`,
            payload
        );
    }

    // Promise<ApiResponse<Array<EntityModel>>>
    getList(payload?: any): Promise<any> {
        return this.axiosInstanceWithoutTokenFakeAPI.get(
            `/${this.entityBaseUrl}`,
            payload
        );
    }

    // Promise<ApiResponse<Array<EntityModel>>>
    getJustNameList(
        payload?: any
    ): Promise<any> {
        return this.axiosInstanceWithoutTokenFakeAPI.post(
            `/${this.entityBaseUrl}/short/list`,
            payload
        );
    }

    // Promise<ApiResponse<EntityModel>>
    getById(entityId: string): Promise<any> {
        return this.axiosInstanceWithoutTokenFakeAPI.get(
            `/${this.entityBaseUrl}/byId/${entityId}`
        );
    }

    delete(entityId: string) {
        return this.axiosInstanceWithoutTokenFakeAPI.delete(
            `/${this.entityBaseUrl}/${entityId}`
        );
    }

    logicDelete(entityId: string) {
        return this.axiosInstanceWithoutTokenFakeAPI.delete(
            `/${this.entityBaseUrl}/${entityId}`
        );
    }
}


// entity : user mange
// site.com/api/v1/manage-user/create
// site.com/api/v1/manage-user/update

// entity : link management
// site.com/api/v1/manage-link/create
// site.com/api/v1/manage-link/update
// site.com/api/v1/manage-link/create/post/links