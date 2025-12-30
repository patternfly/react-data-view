module.exports = {
  '/extensions/data-view/toolbar/react': {
    id: "Toolbar",
    title: "Data view toolbar",
    toc: [[{"text":"Toolbar example"}],{"text":"Toolbar actions"},[{"text":"Actions example"}],{"text":"Pagination"},[{"text":"Pagination state"},{"text":"Pagination example"}],{"text":"Selection"},[{"text":"Selection state"},{"text":"Selection example"}],{"text":"Filters"},[{"text":"Filters state"},{"text":"Filtering example"}],{"text":"All/selected data switch"},[{"text":"All/selected example"}]],
    examples: ["Toolbar example","Actions example","Pagination example","Selection example","Filtering example","All/selected example"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    sortValue: 2,
    Component: () => import(/* webpackChunkName: "extensions/data-view/toolbar/react/index" */ './extensions/data-view/toolbar/react')
  },
  '/extensions/data-view/table/react': {
    id: "Table",
    title: "Data view table",
    toc: [{"text":"Configuring rows and columns"},[{"text":"Table example"}],{"text":"Expandable rows"},[{"text":"Expandable rows example"}],{"text":"Sticky header and columns"},[{"text":"Sticky header and columns example"}],{"text":"Draggable rows"},[{"text":"Draggable rows example"},{"text":"Interactive example"},{"text":"Resizable columns"}],{"text":"Tree table"},[{"text":"Tree table example"}],{"text":"Sorting"},[{"text":"Sorting example"},{"text":"Sorting state"}],{"text":"States"},[{"text":"Empty"},{"text":"Error"},{"text":"Loading"}]],
    examples: ["Table example","Expandable rows example","Sticky header and columns example","Draggable rows example","Interactive example","Resizable columns","Tree table example","Sorting example","Empty","Error","Loading"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    sortValue: 3,
    Component: () => import(/* webpackChunkName: "extensions/data-view/table/react/index" */ './extensions/data-view/table/react')
  },
  '/extensions/data-view/overview/extensions': {
    id: "Overview",
    title: "Data view overview",
    toc: [{"text":"How to structure and implement the data view"},[{"text":"Layout"},{"text":"Modularity"}],{"text":"Events context"},[{"text":"Row click subscription example"}]],
    examples: ["Layout","Modularity","Row click subscription example"],
    section: "extensions",
    subsection: "Data view",
    source: "extensions",
    tabName: null,
    sortValue: 1,
    Component: () => import(/* webpackChunkName: "extensions/data-view/overview/extensions/index" */ './extensions/data-view/overview/extensions')
  }
};