import getConfig from "next/config";
import BaseService from "./BaseService";

const {publicRuntimeConfig} = getConfig();
const {UPLOAD_IMAGE_URL} = publicRuntimeConfig;

export default class FileService {
    static uploadImages = (images, onSuccess, onFailed) => {
        console.log("FileService uploadImages");
        return BaseService.post(UPLOAD_IMAGE_URL, images, onSuccess, onFailed);
    };
}
