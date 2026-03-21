import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import FormsPage from "@/views/categories/FormsPage.vue";
import AlertsFrameWindowsPage from "@/views/categories/AlertsFrameWindowsPage.vue";
import InteractionsPage from "@/views/categories/InteractionsPage.vue";
import SortablePage from "@/views/tools/SortablePage.vue";
import DropdownPage from "@/views/tools/DropDownPage.vue";
import TallPage from "@/views/tools/TallPage.vue";
import RadioButtonsPage from "@/views/tools/RadioButtonsPage.vue";
import ButtonsPage from "@/views/tools/ButtonsPage.vue";
import TextInputsPage from "@/views/tools/TextInputsPage.vue";
import CheckboxesPage from "@/views/tools/CheckboxesPage.vue";
import SlidersPage from "@/views/tools/SlidersPage.vue";
import FileUploadPage from "@/views/tools/FileUploadPage.vue";
import AutocompletePage from "@/views/tools/AutocompletePage.vue";
import TabsPage from "@/views/tools/TabsPage.vue";
import AccordionPage from "@/views/tools/AccordionPage.vue";

const componentMap = {
  radiobuttons: RadioButtonsPage,
  buttons: ButtonsPage,
  forms: FormsPage,
  dropDown: DropdownPage,
  alerts: AlertsFrameWindowsPage,
  sortable: SortablePage,
  draggable: InteractionsPage,
  droppable: InteractionsPage,
  resizable: InteractionsPage,
  tall: TallPage,
  textInputs: TextInputsPage,
  checkboxes: CheckboxesPage,
  sliders: SlidersPage,
  fileUpload: FileUploadPage,
  autocomplete: AutocompletePage,
  tabs: TabsPage,
  accordion: AccordionPage,
};

const descriptionMap = {
  radiobuttons: "Radio button interactions and state changes",
  buttons: "Button variants, states, and sizes",
  forms: "A multi-field form with validation and submission modal",
  dropDown: "Country selector dropdown with search",
  alerts: "Click handlers, alerts, and window management",
  sortable: "Drag-and-drop sortable lists",
  draggable: "Draggable interaction components",
  droppable: "Droppable interaction components",
  resizable: "Resizable interaction components",
  tall: "Long scrollable page for scroll testing",
  textInputs: "Text, password, email, number, and textarea inputs with states",
  checkboxes: "Checkbox and toggle switch states",
  sliders: "Range sliders — single, dual-handle, and stepped",
  fileUpload: "Single, multiple, and drag-and-drop file inputs",
  autocomplete: "Input with filtered dropdown suggestions and keyboard navigation",
  tabs: "Tab navigation with switchable content panels",
  accordion: "Collapsible accordion items with expand/collapse controls",
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
