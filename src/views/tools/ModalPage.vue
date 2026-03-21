<template>
  <div class="page">
    <h1>Modal</h1>
    <p class="page-desc">Modal dialogs — open, close, confirm, dismiss</p>

    <div class="modal-demo">
      <button class="btn btn-primary" data-testid="modal-open" @click="openModal">
        Open Modal
      </button>

      <p class="status-line">
        Status: <span data-testid="modal-status">{{ status }}</span>
      </p>
    </div>

    <div
      v-if="isOpen"
      class="modal-overlay"
      data-testid="modal-overlay"
      @click.self="cancel"
    >
      <div class="modal-dialog" data-testid="modal-dialog">
        <div class="modal-header">
          <h2 class="modal-title" data-testid="modal-title">Confirm Action</h2>
          <button class="modal-close" data-testid="modal-cancel" @click="cancel">✕</button>
        </div>

        <div class="modal-body" data-testid="modal-body">
          Are you sure you want to proceed? This action cannot be undone.
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" data-testid="modal-cancel" @click="cancel">
            Cancel
          </button>
          <button class="btn btn-primary" data-testid="modal-confirm" @click="confirm">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalPage",
  data() {
    return {
      status: "idle",
      isOpen: false,
    };
  },
  methods: {
    openModal() {
      this.status = "open";
      this.isOpen = true;
    },
    confirm() {
      this.isOpen = false;
      this.status = "confirmed";
    },
    cancel() {
      this.isOpen = false;
      this.status = "cancelled";
    },
  },
};
</script>

<style scoped>
.modal-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.status-line {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  background: var(--bg-primary);
  border-radius: var(--radius);
  padding: 1.5rem;
  min-width: 320px;
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--text-muted);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius);
  transition: color 0.15s;
}

.modal-close:hover {
  color: var(--text-primary);
}

.modal-body {
  color: var(--text-secondary);
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
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
