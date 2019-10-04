import ProjectSettings from "../components/editor_components/ProjectSettings";
import ProjectPages from "../components/editor_components/ProjectPages";
import ProjectDataStore from "../components/editor_components/ProjectDataStore";
import ProjectMediaGallery from "../components/editor_components/ProjectMediaGallery";
import ErrorPage from "../components/error_page/ErrorPage";
import React from "react";

const ProjectSubRoutes = {
    "default": ProjectSettings,
    "pages": ProjectPages,
    "datastore": ProjectDataStore,
    "gallery": ProjectMediaGallery,
};

export const getComponentForRoute = ({ component }) => {
    if (!component) return ProjectSubRoutes.default;
    const comp = ProjectSubRoutes[component];
    if (!comp) return () => <ErrorPage status={404} subTitle="Sorry, Page not found." />;
    return comp;
};
