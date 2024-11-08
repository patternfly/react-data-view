module.exports = {
  '/extensions/data-view/about-data-view/extensions': {
    id: "About data view",
    title: "About data view",
    toc: [{"text":"Data view toolbar"},[{"text":"Basic toolbar example"},{"text":"Actions configuration"},{"text":"Actions example"}],{"text":"Data view table"},[{"text":"Rows and columns customization"},{"text":"Tree table example"},{"text":"Empty state example"},{"text":"Error state example"},{"text":"Loading state example"},{"text":"Layout example"},{"text":"Predefined layout components"},{"text":"Row click subscription example"},{"text":"Toolbar usage"},{"text":"Pagination state"},{"text":"Pagination example"},{"text":"Toolbar usage","id":"toolbar-usage-0"},{"text":"Selection state"},{"text":"Selection example"}]],
    examples: ["Basic toolbar example","Actions example","Rows and columns customization","Tree table example","Empty state example","Error state example","Loading state example","Layout example","Predefined layout components","Row click subscription example","Pagination example","Selection example"],
    section: "extensions",
    subsection: "Data view",
    source: "extensions",
    tabName: null,
    sortValue: 1,
    Component: () => import(/* webpackChunkName: "extensions/data-view/about-data-view/extensions/index" */ './extensions/data-view/about-data-view/extensions')
  },
  '/extensions/data-view/data-view/extensions': {
    id: "Data view",
    title: "Data view",
    toc: [[{"text":"Untitled example"}],{"text":"Basic toolbar"},[{"text":"Toolbar actions"},{"text":"Selection"},{"text":"Pagination"}],{"text":"Basic table"},[{"text":"Tree table"},{"text":"Empty state"},{"text":"Error state"},{"text":"Loading state"},{"text":"Events context hook"}]],
    examples: ["Untitled example","Toolbar actions","Selection","Pagination","Tree table","Empty state","Error state","Loading state","Events context hook"],
    section: "extensions",
    subsection: "Data view",
    source: "extensions",
    tabName: null,
    Component: () => import(/* webpackChunkName: "extensions/data-view/data-view/extensions/index" */ './extensions/data-view/data-view/extensions')
  }
};