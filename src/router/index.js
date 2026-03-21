import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import FormsPage from "@/views/categories/FormsPage.vue";
import AlertsFrameWindowsPage from "@/views/categories/AlertsFrameWindowsPage.vue";
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
import ProgressPage from "@/views/tools/ProgressPage.vue";
import TablePage from "@/views/tools/TablePage.vue";
import ModalPage from "@/views/tools/ModalPage.vue";
import ToastPage from "@/views/tools/ToastPage.vue";
import TooltipPage from "@/views/tools/TooltipPage.vue";
import DrawerPage from "@/views/tools/DrawerPage.vue";
import KanbanPage from "@/views/tools/KanbanPage.vue";
import DropZonePage from "@/views/tools/DropZonePage.vue";
import InfiniteScrollPage from "@/views/tools/InfiniteScrollPage.vue";
import LoadingPage from "@/views/tools/LoadingPage.vue";
import DynamicFormPage from "@/views/tools/DynamicFormPage.vue";
import SliderIndicatorPage from "@/views/tools/SliderIndicatorPage.vue";
import DraggablePage from "@/views/tools/DraggablePage.vue";
import DroppablePage from "@/views/tools/DroppablePage.vue";
import ResizablePage from "@/views/tools/ResizablePage.vue";
import DragProgressPage from "@/views/tools/DragProgressPage.vue";
import GalleryPage from "@/views/tools/GalleryPage.vue";
import CarouselPage from "@/views/tools/CarouselPage.vue";

const componentMap = {
  radiobuttons: RadioButtonsPage,
  buttons: ButtonsPage,
  forms: FormsPage,
  dropDown: DropdownPage,
  alerts: AlertsFrameWindowsPage,
  sortable: SortablePage,
  draggable: DraggablePage,
  droppable: DroppablePage,
  resizable: ResizablePage,
  tall: TallPage,
  textInputs: TextInputsPage,
  checkboxes: CheckboxesPage,
  sliders: SlidersPage,
  fileUpload: FileUploadPage,
  autocomplete: AutocompletePage,
  tabs: TabsPage,
  accordion: AccordionPage,
  progress: ProgressPage,
  table: TablePage,
  modal: ModalPage,
  toast: ToastPage,
  tooltip: TooltipPage,
  drawer: DrawerPage,
  kanban: KanbanPage,
  dropzone: DropZonePage,
  infiniteScroll: InfiniteScrollPage,
  loading: LoadingPage,
  dynamicForm: DynamicFormPage,
  sliderIndicator: SliderIndicatorPage,
  dragProgress: DragProgressPage,
  gallery: GalleryPage,
  carousel: CarouselPage,
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
  progress: "Determinate and animated progress indicators",
  table: "Sortable, filterable, paginated data table with row selection",
  modal:          "Modal dialogs — open, close, confirm, dismiss",
  toast:          "Toast notifications — success, error, warning, info with auto-dismiss",
  tooltip:        "Hover tooltips and click-triggered popovers",
  drawer:         "Slide-in drawer panel from left or right",
  kanban:         "Drag-and-drop Kanban board with three columns",
  dropzone:       "Drag items between source list and drop target zone",
  infiniteScroll: "Scrollable list that loads more items at the bottom",
  loading:        "Spinner, skeleton, progress bar, and button loading states",
  dynamicForm:    "Form with dynamically added and removed fields",
  sliderIndicator: "Range slider with a floating value bubble that follows the thumb",
  dragProgress: "Click or drag on a progress bar to set its fill percentage",
  gallery:      "Image grid with click-to-zoom overlay",
  carousel:     "Auto-playing slideshow with prev/next navigation and dot indicators",
  loginForm:    "Login form with validation, error, and success states",
  piniaCounter: "Shared Pinia counter with increment, decrement, and reset",
  longList:     "200-item list with live search filter and count display",
  multistep:    "Three-step form wizard with validation and step indicators",
  stateViewer:  "Toggle between empty, loading, error, and populated UI states",
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
