import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import FormsPage from "@/views/categories/FormsPage.vue";
import AlertsFrameWindowsPage from "@/views/categories/AlertsFrameWindowsPage.vue";
import InteractionsPage from "@/views/categories/InteractionsPage.vue";
import SortablePage from "@/views/tools/SortablePage.vue";
import DropdownPage from "@/views/tools/DropDownPage.vue";
import TallPage from "@/views/tools/TallPage.vue";
import RadioButtonsPage from "@/views/tools/RadioButtonsPage.vue";

const componentMap = {
  radiobuttons: RadioButtonsPage,
  forms: FormsPage,
  dropDown: DropdownPage,
  alerts: AlertsFrameWindowsPage,
  sortable: SortablePage,
  draggable: InteractionsPage,
  droppable: InteractionsPage,
  resizable: InteractionsPage,
  tall: TallPage,
};

const descriptionMap = {
  radiobuttons: "Radio button interactions and state changes",
  forms: "A multi-field form with validation and submission modal",
  dropDown: "Country selector dropdown with search",
  alerts: "Click handlers, alerts, and window management",
  sortable: "Drag-and-drop sortable lists",
  draggable: "Draggable interaction components",
  droppable: "Droppable interaction components",
  resizable: "Resizable interaction components",
  tall: "Long scrollable page for scroll testing",
};

// Import navigation config for meta lookup
import { navigation } from "@/config/navigation";

// Build routes from navigation config
const pageRoutes = [];
for (const group of navigation) {
  for (const item of group.items) {
    const component = componentMap[item.routeName];
    if (component) {
      pageRoutes.push({
        path: item.path,
        name: item.routeName,
        component,
        meta: {
          category: group.category,
          description: descriptionMap[item.routeName] || "",
        },
      });
    }
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  // Redirects for old category-level routes
  { path: "/elements", redirect: "/radiobuttons" },
  { path: "/interactions", redirect: "/sortable" },
  { path: "/widgets", redirect: "/tabs" },
  ...pageRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
