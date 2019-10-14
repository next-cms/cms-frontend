/**
 * <html>
 * This file is meant to be loaded by next.config.js to populate the runtimeConfig. It is not meant to be imported
 * to be compiled by webpack. <b>Changes made in this file need to restart the server to get the change reflections.</b>
 * </html>
 */
module.exports = function getURLConstants(env) {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    // ---------------- API ---------------- //
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    const API_BASE_URL = env.API_BASE_URL || "//localhost:5000";
    const GRAPHQL_URL = `${API_BASE_URL}${env.GRAPHQL_PATH || "/graphql"}`;
    const API_NEXT_PROJECT_URL = `${API_BASE_URL}${env.NEXT_PROJECT_PATH || "/next-project"}`;
    const RESOLVE_USER_URL = `${API_BASE_URL}/auth/resolve`;
    const API_LOGIN_URL = `${API_BASE_URL}/auth/login`;
    const UPLOAD_IMAGE_URL = `${API_BASE_URL}/files/upload/image`;
    const UPLOAD_MULTIPLE_IMAGE_URL = `${API_BASE_URL}/files/upload/images`;

    return {
        API_BASE_URL,
        GRAPHQL_URL,
        API_NEXT_PROJECT_URL,
        RESOLVE_USER_URL,
        API_LOGIN_URL,
        UPLOAD_IMAGE_URL,
        UPLOAD_MULTIPLE_IMAGE_URL
    };
};
