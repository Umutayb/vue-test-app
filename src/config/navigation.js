export const navigation = [
  {
    category: "Elements",
    icon: "◎",
    items: [
      { label: "Radio Buttons", routeName: "radiobuttons", path: "/radiobuttons" },
      { label: "Buttons", routeName: "buttons", path: "/buttons" },
      { label: "Text Inputs", routeName: "textInputs", path: "/text-inputs" },
      { label: "Checkboxes & Toggles", routeName: "checkboxes", path: "/checkboxes" },
      { label: "Sliders", routeName: "sliders", path: "/sliders" },
      { label: "Slider Indicator", routeName: "sliderIndicator", path: "/slider-indicator" },
      { label: "Drag Progress", routeName: "dragProgress", path: "/drag-progress" },
    ]
  },
  {
    category: "Forms",
    icon: "📝",
    items: [
      { label: "Submission Form", routeName: "forms", path: "/forms" },
      { label: "Dropdown", routeName: "dropDown", path: "/dropdown" },
      { label: "File Upload", routeName: "fileUpload", path: "/file-upload" },
      { label: "Autocomplete", routeName: "autocomplete", path: "/autocomplete" },
      { label: "OTP Input", routeName: "otpInput", path: "/otp-input" },
    ]
  },
  {
    category: "Alerts, Frame & Windows",
    icon: "🔔",
    items: [
      { label: "Alerts", routeName: "alerts", path: "/alerts" },
      { label: "Modal", routeName: "modal", path: "/modal" },
      { label: "Toast", routeName: "toast", path: "/toast" },
      { label: "Tooltip & Popover", routeName: "tooltip", path: "/tooltip" },
      { label: "Drawer", routeName: "drawer", path: "/drawer" },
    ]
  },
  {
    category: "Widgets",
    icon: "📊",
    items: [
      { label: "Tabs", routeName: "tabs", path: "/tabs" },
      { label: "Accordion", routeName: "accordion", path: "/accordion" },
      { label: "Progress", routeName: "progress", path: "/progress" },
      { label: "Table", routeName: "table", path: "/table" },
    ]
  },
  {
    category: "Interactions",
    icon: "🔀",
    items: [
      { label: "Sortable", routeName: "sortable", path: "/sortable" },
      { label: "Draggable", routeName: "draggable", path: "/draggable" },
      { label: "Droppable", routeName: "droppable", path: "/droppable" },
      { label: "Resizable", routeName: "resizable", path: "/resizable" },
      { label: "Tall Page", routeName: "tall", path: "/tall" },
      { label: "Kanban", routeName: "kanban", path: "/kanban" },
      { label: "Drop Zone", routeName: "dropzone", path: "/dropzone" },
      { label: "Infinite Scroll", routeName: "infiniteScroll", path: "/infinite-scroll" },
      { label: "Loading States", routeName: "loading", path: "/loading" },
      { label: "Dynamic Form", routeName: "dynamicForm", path: "/dynamic-form" },
    ]
  },
  {
    category: "Media",
    icon: "🖼️",
    items: [
      { label: "Image Gallery", routeName: "gallery", path: "/gallery" },
      { label: "Carousel", routeName: "carousel", path: "/carousel" },
      { label: "Product Carousel", routeName: "productCarousel", path: "/product-carousel" },
    ]
  },
  {
    category: "Auth & State",
    icon: "🔐",
    items: [
      { label: "Login Form", routeName: "loginForm", path: "/login-form" },
      { label: "Pinia Counter", routeName: "piniaCounter", path: "/pinia-counter" },
    ]
  },
  {
    category: "Edge Cases",
    icon: "⚡",
    items: [
      { label: "Long List", routeName: "longList", path: "/long-list" },
      { label: "Multi-step Form", routeName: "multistep", path: "/multistep" },
      { label: "State Viewer", routeName: "stateViewer", path: "/state-viewer" },
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

/**
 * Derive a slug from a category name for use in data-testid attributes.
 * e.g., "Alerts, Frame & Windows" → "alerts-frame-windows"
 */
export function categorySlug(categoryName) {
  return categoryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
