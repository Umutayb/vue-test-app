<template>
  <div class="page">
    <h1>Toast Notifications</h1>
    <p class="page-desc">Toast notifications — success, error, warning, info with auto-dismiss</p>

    <div class="toast-controls">
      <button class="btn btn-success" data-testid="toast-trigger-success" @click="addToast('success')">
        Success
      </button>
      <button class="btn btn-error" data-testid="toast-trigger-error" @click="addToast('error')">
        Error
      </button>
      <button class="btn btn-warning" data-testid="toast-trigger-warning" @click="addToast('warning')">
        Warning
      </button>
      <button class="btn btn-info" data-testid="toast-trigger-info" @click="addToast('info')">
        Info
      </button>
    </div>

    <div class="toast-container" data-testid="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
        :data-testid="`toast-${toast.id}`"
      >
        <span class="toast-message">{{ toast.message }}</span>
        <button
          class="toast-close"
          :data-testid="`toast-close-${toast.id}`"
          @click="removeToast(toast.id)"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const MESSAGES = {
  success: "Operation completed successfully",
  error: "Something went wrong",
  warning: "Please check your input",
  info: "Here is some information",
};

export default {
  name: "ToastPage",
  data() {
    return {
      toasts: [],
      nextId: 1,
      timers: {},
    };
  },
  methods: {
    addToast(type) {
      const id = this.nextId++;
      this.toasts.push({ id, type, message: MESSAGES[type] });
      this.timers[id] = setTimeout(() => {
        this.removeToast(id);
      }, 3000);
    },
    removeToast(id) {
      clearTimeout(this.timers[id]);
      delete this.timers[id];
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
  },
  beforeUnmount() {
    for (const id of Object.keys(this.timers)) {
      clearTimeout(this.timers[id]);
    }
  },
};
</script>

<style scoped>
.toast-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  transition: opacity 0.15s;
}

.btn:hover {
  opacity: 0.85;
}

.btn-success {
  background: #22c55e;
}

.btn-error {
  background: #ef4444;
}

.btn-warning {
  background: #f59e0b;
}

.btn-info {
  background: var(--accent);
}

.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  background: var(--bg-primary);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  min-width: 260px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toast--success {
  border-left: 4px solid #22c55e;
}

.toast--error {
  border-left: 4px solid #ef4444;
}

.toast--warning {
  border-left: 4px solid #f59e0b;
}

.toast--info {
  border-left: 4px solid var(--accent);
}

.toast-message {
  color: var(--text-primary);
  font-size: 0.9rem;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--text-muted);
  padding: 0 0.25rem;
  margin-left: 0.75rem;
  line-height: 1;
  transition: color 0.15s;
}

.toast-close:hover {
  color: var(--text-primary);
}
</style>
