// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import CategoryLayout from "@/components/categories/CategoryLayout.vue";
import ElementsPage from "@/views/categories/ElementsPage.vue";
import FormsPage from "@/views/categories/FormsPage.vue";
import AlertsFrameWindowsPage from "@/views/categories/AlertsFrameWindowsPage.vue";
import WidgetsPage from "@/views/categories/WidgetsPage.vue";
import InteractionsPage from "@/views/categories/InteractionsPage.vue";
import SelectablePage from "@/views/tools/SelectablePage.vue";

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
  { path: "/sortable", name: "sortable", component: InteractionsPage },
  { path: "/selectable", name: "selectable", component: SelectablePage },
  { path: "/resizable", name: "resizable", component: InteractionsPage },
  { path: "/droppable", name: "droppable", component: InteractionsPage },
  { path: "/draggable", name: "draggable", component: InteractionsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
