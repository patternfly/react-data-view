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
  '/extensions/data-view/layout/react': {
    id: "Layout",
    title: "Layout",
    toc: [[{"text":"Layout example"},{"text":"Predefined layout components"}]],
    examples: ["Layout example","Predefined layout components"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    sortValue: 2,
    Component: () => import(/* webpackChunkName: "extensions/data-view/layout/react/index" */ './extensions/data-view/layout/react')
  },
  '/extensions/data-view/functionality/react': {
    id: "Functionality",
    title: "Functionality",
    toc: [[{"text":"Toolbar usage"},{"text":"Pagination state"},{"text":"Pagination example"},{"text":"Toolbar usage","id":"toolbar-usage-0"},{"text":"Selection state"},{"text":"Selection example"}]],
    examples: ["Pagination example","Selection example"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    sortValue: 3,
    Component: () => import(/* webpackChunkName: "extensions/data-view/functionality/react/index" */ './extensions/data-view/functionality/react')
  },
  '/extensions/data-view/components/react': {
    id: "Components",
    title: "Components",
    toc: [{"text":"Data view toolbar"},[{"text":"Basic example"}]],
    examples: ["Basic example"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    sortValue: 4,
    Component: () => import(/* webpackChunkName: "extensions/data-view/components/react/index" */ './extensions/data-view/components/react')
  }
};