<template>
  <div class="page">
    <h1>Drawer</h1>
    <p class="page-desc">Slide-in drawer panel from left or right</p>

    <div class="drawer-demo">
      <div class="button-group">
        <button class="btn btn-primary" data-testid="drawer-open-left" @click="openLeft">
          Open Left Drawer
        </button>
        <button class="btn btn-primary" data-testid="drawer-open-right" @click="openRight">
          Open Right Drawer
        </button>
      </div>

      <p class="status-line">
        Status: <span data-testid="drawer-status">{{ status }}</span>
      </p>
    </div>

    <div
      v-if="isOpen"
      class="drawer-overlay"
      data-testid="drawer-overlay"
      @click="close"
    ></div>

    <div
      v-if="isOpen"
      class="drawer-panel"
      :class="drawerSide === 'left' ? 'drawer-left' : 'drawer-right'"
      data-testid="drawer-panel"
    >
      <h2 class="drawer-heading">{{ drawerSide === 'left' ? 'Left Drawer' : 'Right Drawer' }}</h2>
      <p class="drawer-body">
        This is the {{ drawerSide }} drawer. Click the button below or the backdrop to close it.
      </p>
      <button class="btn btn-secondary" data-testid="drawer-close" @click="close">
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawerPage",
  data() {
    return {
      drawerSide: "left",
      isOpen: false,
    };
  },
  computed: {
    status() {
      return this.isOpen ? this.drawerSide : "closed";
    },
  },
  methods: {
    openLeft() {
      this.drawerSide = "left";
      this.isOpen = true;
    },
    openRight() {
      this.drawerSide = "right";
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.drawer-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.button-group {
  display: flex;
  gap: 0.75rem;
}

.status-line {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.drawer-panel {
  position: fixed;
  top: 0;
  height: 100%;
  width: 280px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  padding: 1.5rem;
  z-index: 101;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.drawer-left {
  left: 0;
}

.drawer-right {
  right: 0;
}

.drawer-heading {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.drawer-body {
  color: var(--text-secondary);
  line-height: 1.5;
}

.btn {
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background 0.15s;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-secondary {
  background: var(--bg-input);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--bg-sidebar);
}
</style>
