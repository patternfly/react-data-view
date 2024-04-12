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
  '/extensions/data-view/data-view/react': {
    id: "Data view",
    title: "Data view",
    toc: [[{"text":"Basic example"}]],
    examples: ["Basic example"],
    section: "extensions",
    subsection: "Data view",
    source: "react",
    tabName: null,
    Component: () => import(/* webpackChunkName: "extensions/data-view/data-view/react/index" */ './extensions/data-view/data-view/react')
  }
};