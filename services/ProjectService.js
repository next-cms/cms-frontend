import getConfig from "next/config";
import BaseService from "./BaseService";

const {publicRuntimeConfig} = getConfig();
const {DEPLOY_PROJECT_URL} = publicRuntimeConfig;

export default class ProjectService {
    static deployProject = (projectId, onSuccess, onFailed) => {
        console.log("FileService uploadImages");
        return BaseService.post(`${DEPLOY_PROJECT_URL}?projectId=${projectId}`, {}, onSuccess, onFailed);
    };
}
