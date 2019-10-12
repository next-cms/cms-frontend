export const ADD_PAGE = `
mutation addPage($projectId: String!) {
    addPage(projectId: $projectId) {
        slug
        key
        title
        path
        pathAs
        pathParam
    }
}`;

export const PROJECT_PAGES = `
query projectPages($projectId: String!) {
    allPages(projectId: $projectId) {
        slug
        key
        title
        path
        pathAs
        pathParam
    }
}`;

export const PAGE_SOURCE_CODE = `
  query pageSourceCode($projectId: String!, $page: String!) {
    pageSourceCode(projectId: $projectId, page: $page)
  }
`;
export const SAVE_PAGE_SOURCE_CODE = `
  mutation savePageSourceCode($sourceCode: String!, $projectId: String!, $page: String!) {
    savePageSourceCode(sourceCode: $sourceCode, projectId: $projectId, page: $page)
  }
`;

export const DELETE_PAGE = `
  mutation deletePage($projectId: String!, $page: String!) {
    deletePage(projectId: $projectId, page: $page)
  }
`;

export const SAVE_COMPONENT = `
mutation saveComponent($component: JSONObject!, $page: String!, $projectId: String!) {
  saveComponent(component: $component, page: $page, projectId: $projectId)
}`;

export const UPDATE_COMPONENT_PLACEMENT = `
mutation updateComponentPlacement($components: [JSONObject], $page: String!, $projectId: String!) {
  updateComponentPlacement(components: $components, page: $page, projectId: $projectId)
}`;

export const DEFAULT_AVAILABLE_COMPONENTS = `
query availableComponentQuery($limit: Int!, $skip: Int!) {
  allAvailableComponents(limit: $limit, skip: $skip) {
    id
    vendor
    importSignature
    name
    props
  }
  _allAvailableComponentsMeta {
    count
  }
}`;

export const AVAILABLE_COMPONENTS = `
query availableComponentQuery($projectId: String!, $limit: Int!, $skip: Int!) {
  allAvailableComponents(limit: $limit, skip: $skip) {
    id
    vendor
    importSignature
    name
    props
  }
  allProjectAvailableComponents(projectId: $projectId, limit: $limit, skip: $skip) {
    id
    vendor
    importSignature
    name
    props
  }
}`;

export const ADD_COMPONENT = `
mutation addComponents($componentIds: [String!], $parent: JSONObject, $projectId: String!, $page: String!) {
  addComponents(componentIds: $componentIds, parent: $parent, projectId: $projectId, page: $page)
}`;

export const DELETE_COMPONENT = `
mutation deleteComponent($component: JSONObject, $projectId: String!, $page: String!) {
  deleteComponent(component: $component, projectId: $projectId, page: $page)
}`;

export const PAGE_DETAILS = `
query pageDetailsQuery($projectId: String!, $page: String!) {
    page(projectId: $projectId, page: $page) {
        key
        name
        slug
        children
        hooks
        effects
    }
}`;

export const UPDATE_PAGE_DETAILS = `
mutation updatePageDetails($pageDetails: PageDetailsInput, $projectId: String!, $page: String!) {
    updatePage(pageDetails: $pageDetails, projectId: $projectId, page: $page) {
        slug
        key
        title
        path
        pathAs
        pathParam
    }
}`;

export const PROJECT_DETAILS = `
query projectDetailsQuery($projectId: String!) {
    project(id: $projectId) {
        id
        title
        description
        websiteUrl
        brand {
            icon
            siteTitle
        }
        siteMeta
        modifiedAt
    }
}`;

export const DELETE_PROJECT = `
mutation DeleteProject($id: ID!){
    deleteProject(id: $id)
}`;

export const CREATE_PROJECT = `
mutation createProject($title: String!, $description: String, $websiteUrl: String!) {
  createProject(title: $title, description: $description, websiteUrl: $websiteUrl) {
    id
    title
    description
    websiteUrl
    createdAt
  }
}`;

export const UPDATE_PROJECT = `
mutation UpdateProject($id: String!, $title: String!, $description: String, $websiteUrl: String!, $siteMeta: String, $brand: BrandInput) {
  updateProject(id: $id, title: $title, description: $description, websiteUrl: $websiteUrl, siteMeta: $siteMeta, brand: $brand) {
    id
  }
}`;

export const RECENT_PROJECTS = `
  query recentProjectsQuery($limit: Int!, $skip: Int!) {
    projects(limit: $limit, skip: $skip) {
      id
      title
      description
      websiteUrl
      modifiedAt
    }
    _projectsMeta {
      count
    }
  }`;

export const ALL_PROJECTS_QUERY = `
  query projectsQuery($limit: Int!, $skip: Int!) {
      projects(limit: $limit, skip: $skip) {
          id
          title
          description
          websiteUrl
          modifiedAt
        }
        _projectsMeta {
      count
    }
}`;

export const SIGNUP = `
mutation signUp($name: String!, $email: String!, $password: String!) {
  signUp(name: $name, email: $email, password: $password) {
    name 
    email
    password
  }
}`;

export const ALL_MEDIA = `
query allMedia($projectId: String!, $limit: Int!, $skip: Int!) {
  allMedia(projectId: $projectId, limit: $limit, skip: $skip) {
    name
    src
    height
    width
  }
}`;
