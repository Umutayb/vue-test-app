export const navigation = [
  {
    category: "Elements",
    items: [
      { label: "Radio Buttons",       routeName: "radiobuttons", path: "/radiobuttons" },
      { label: "Buttons",             routeName: "buttons",      path: "/buttons" },
      { label: "Text Inputs",         routeName: "textInputs",   path: "/text-inputs" },
      { label: "Checkboxes & Toggles", routeName: "checkboxes",  path: "/checkboxes" },
      { label: "Sliders",             routeName: "sliders",      path: "/sliders" },
    ]
  },
  {
    category: "Forms",
    items: [
      { label: "Full Form",    routeName: "forms",        path: "/forms" },
      { label: "Dropdown",     routeName: "dropDown",     path: "/dropdown" },
      { label: "File Upload",  routeName: "fileUpload",   path: "/file-upload" },
      { label: "Autocomplete", routeName: "autocomplete", path: "/autocomplete" },
    ]
  },
  {
    category: "Alerts, Frame & Windows",
    items: [
      { label: "Alerts", routeName: "alerts", path: "/alerts" },
    ]
  },
  {
    category: "Widgets",
    items: [
      { label: "Tabs",      routeName: "tabs",      path: "/tabs" },
      { label: "Accordion", routeName: "accordion", path: "/accordion" },
      { label: "Progress",  routeName: "progress",  path: "/progress" },
      { label: "Table",     routeName: "table",     path: "/table" },
    ]
  },
  {
    category: "Interactions",
    items: [
      { label: "Sortable",  routeName: "sortable",  path: "/sortable" },
      { label: "Draggable", routeName: "draggable", path: "/draggable" },
      { label: "Droppable", routeName: "droppable", path: "/droppable" },
      { label: "Resizable", routeName: "resizable", path: "/resizable" },
      { label: "Tall Page", routeName: "tall",       path: "/tall" },
    ]
  },
];

/**
 * Look up a nav item by route name.
 * Returns { label, routeName, path, category } or undefined.
 */
export function findNavItem(routeName) {
  for (const group of navigation) {
    const item = group.items.find(i => i.routeName === routeName);
    if (item) return { ...item, category: group.category };
  }
  return undefined;
}
