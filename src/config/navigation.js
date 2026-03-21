export const navigation = [
  {
    category: "Elements",
    items: [
      { label: "Radio Buttons", routeName: "radiobuttons", path: "/radiobuttons" },
    ]
  },
  {
    category: "Forms",
    items: [
      { label: "Full Form", routeName: "forms", path: "/forms" },
      { label: "Dropdown", routeName: "dropDown", path: "/dropdown" },
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
      { label: "Widgets", routeName: "widgets", path: "/widgets" },
    ]
  },
  {
    category: "Interactions",
    items: [
      { label: "Sortable", routeName: "sortable", path: "/sortable" },
      { label: "Draggable", routeName: "draggable", path: "/draggable" },
      { label: "Droppable", routeName: "droppable", path: "/droppable" },
      { label: "Resizable", routeName: "resizable", path: "/resizable" },
      { label: "Tall Page", routeName: "tall", path: "/tall" },
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
