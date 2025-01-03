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
    toc: [[{"text":"Toolbar usage"},{"text":"Pagination state"},{"text":"Pagination example"},{"text":"Toolbar usage","id":"toolbar-usage-0"},{"text":"Selection state"},{"text":"Selection example"},{"text":"Toolbar usage","id":"toolbar-usage-1"},{"text":"Filters state"},{"text":"Filtering example"},{"text":"Sort state"},{"text":"Sorting example"}]],
    examples: ["Pagination example","Selection example","Filtering example","Sorting example"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    sortValue: 3,
    Component: () => import(/* webpackChunkName: "extensions/data-view/functionality/react/index" */ './extensions/data-view/functionality/react')
  },
  '/extensions/data-view/events-context/react': {
    id: "Events context",
    title: "Events context",
    toc: [[{"text":"Row click subscription example"}]],
    examples: ["Row click subscription example"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    sortValue: 3,
    Component: () => import(/* webpackChunkName: "extensions/data-view/events-context/react/index" */ './extensions/data-view/events-context/react')
  },
  '/extensions/data-view/components/react': {
    id: "Components",
    title: "Components",
    toc: [{"text":"Data view toolbar"},[{"text":"Basic toolbar example"},{"text":"Actions configuration"},{"text":"Actions example"}],{"text":"Data view table"},[{"text":"Rows and columns customization"},{"text":"Tree table example"},{"text":"Empty state example"},{"text":"Error state example"},{"text":"Loading state example"}]],
    examples: ["Basic toolbar example","Actions example","Rows and columns customization","Tree table example","Empty state example","Error state example","Loading state example"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    sortValue: 4,
    Component: () => import(/* webpackChunkName: "extensions/data-view/components/react/index" */ './extensions/data-view/components/react')
  }
};