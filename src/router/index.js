// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import CategoryLayout from "@/components/CategoryLayout.vue";
import ElementsPage from "@/views/ElementsPage.vue";
import FormsPage from "@/views/FormsPage.vue";
import AlertsFrameWindowsPage from "@/views/AlertsFrameWindowsPage.vue";
import WidgetsPage from "@/views/WidgetsPage.vue";
import InteractionsPage from "@/views/InteractionsPage.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
