// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import CategoryLayout from "@/components/categories/CategoryLayout.vue";
import ElementsPage from "@/views/categories/ElementsPage.vue";
import FormsPage from "@/views/categories/FormsPage.vue";
import AlertsFrameWindowsPage from "@/views/categories/AlertsFrameWindowsPage.vue";
import WidgetsPage from "@/views/categories/WidgetsPage.vue";
import InteractionsPage from "@/views/categories/InteractionsPage.vue";
import SortablePage from "@/views/tools/SortablePage.vue";
import DropdownPage from "@/views/tools/DropDownPage.vue";
import TallPage from "@/views/tools/TallPage.vue";
import QuestionsPage from "@/views/tools/QuestionsPage.vue";

const routes = [
  {
    path: '/',
    component: CategoryLayout,
    children: [
      { path: '', name: 'categoryLayout', component: CategoryLayout },
    ],
  },
  { path: "/elements", name: "elements", component: ElementsPage },
  { path: "/forms", name: "forms", component: FormsPage },
  { path: "/alerts", name: "alerts", component: AlertsFrameWindowsPage },
  { path: "/widgets", name: "widgets", component: WidgetsPage },
  { path: "/interactions", name: "interactions", component: InteractionsPage },
  { path: "/sortable", name: "sortable", component: SortablePage },
  { path: "/dropDown", name: "dropDown", component: DropdownPage },
  { path: "/resizable", name: "resizable", component: InteractionsPage },
  { path: "/droppable", name: "droppable", component: InteractionsPage },
  { path: "/draggable", name: "draggable", component: InteractionsPage },
  { path: "/tall", name: "tall", component: TallPage },
  { path: "/questions", name: "questions", component: QuestionsPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
