module.exports = {
  '/extensions/data-view/about-data-view/extensions': {
    id: "About data view",
    title: "About data view",
    toc: [],
    section: "extensions",
    subsection: "Data view",
    source: "extensions",
    tabName: null,
    sortValue: 1,
    Component: () => import(/* webpackChunkName: "extensions/data-view/about-data-view/extensions/index" */ './extensions/data-view/about-data-view/extensions')
  },
  '/extensions/data-view/hooks/react': {
    id: "Hooks",
    title: "Hooks",
    toc: [[{"text":"useDataViewPagination()"}]],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    Component: () => import(/* webpackChunkName: "extensions/data-view/hooks/react/index" */ './extensions/data-view/hooks/react')
  },
  '/extensions/data-view/data-view-toolbar/react': {
    id: "Data view toolbar",
    title: "Data view toolbar",
    toc: [[{"text":"Basic example"}]],
    examples: ["Basic example"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    Component: () => import(/* webpackChunkName: "extensions/data-view/data-view-toolbar/react/index" */ './extensions/data-view/data-view-toolbar/react')
  },
  '/extensions/data-view/data-view-layout/react': {
    id: "Data view layout",
    title: "Data view layout",
    toc: [[{"text":"Layout example"},{"text":"Predefined layout components"}]],
    examples: ["Layout example","Predefined layout components"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    Component: () => import(/* webpackChunkName: "extensions/data-view/data-view-layout/react/index" */ './extensions/data-view/data-view-layout/react')
  }
};