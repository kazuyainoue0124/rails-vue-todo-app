/* tslint:disable */
/* eslint-disable */
/**
 * APIv1
 * APIv1 for todo-app rails
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface ApiV1TodosIndex200Response
 */
export interface ApiV1TodosIndex200Response {
    /**
     * 
     * @type {TodoListData}
     * @memberof ApiV1TodosIndex200Response
     */
    'data': TodoListData;
}
/**
 * 
 * @export
 * @interface Todo
 */
export interface Todo {
    /**
     * 
     * @type {number}
     * @memberof Todo
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof Todo
     */
    'title': string;
    /**
     * 
     * @type {boolean}
     * @memberof Todo
     */
    'done': boolean;
}
/**
 * Todoリスト情報
 * @export
 * @interface TodoListData
 */
export interface TodoListData {
    /**
     * Todoリスト配列
     * @type {Array<Todo>}
     * @memberof TodoListData
     */
    'list': Array<Todo>;
}
/**
 * 
 * @export
 * @interface TodoListResponse
 */
export interface TodoListResponse {
    /**
     * 
     * @type {TodoListData}
     * @memberof TodoListResponse
     */
    'data': TodoListData;
}

/**
 * TodoApi - axios parameter creator
 * @export
 */
export const TodoApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 全てのTodoを取得する
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1TodosIndex: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/todos/index`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TodoApi - functional programming interface
 * @export
 */
export const TodoApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TodoApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 全てのTodoを取得する
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1TodosIndex(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiV1TodosIndex200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiV1TodosIndex(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TodoApi - factory interface
 * @export
 */
export const TodoApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TodoApiFp(configuration)
    return {
        /**
         * 
         * @summary 全てのTodoを取得する
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1TodosIndex(options?: any): AxiosPromise<ApiV1TodosIndex200Response> {
            return localVarFp.apiV1TodosIndex(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TodoApi - object-oriented interface
 * @export
 * @class TodoApi
 * @extends {BaseAPI}
 */
export class TodoApi extends BaseAPI {
    /**
     * 
     * @summary 全てのTodoを取得する
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    public apiV1TodosIndex(options?: AxiosRequestConfig) {
        return TodoApiFp(this.configuration).apiV1TodosIndex(options).then((request) => request(this.axios, this.basePath));
    }
}


