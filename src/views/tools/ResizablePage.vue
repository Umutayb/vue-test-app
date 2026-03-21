<template>
  <div class="page">
    <h1>Resizable</h1>
    <p class="page-desc">Drag the handle on the right edge to resize the panel</p>

    <p class="width-text">Width: <span data-testid="resizable-width">{{ panelWidth }}px</span></p>

    <div class="resizable-wrapper">
      <div
        class="resizable-panel"
        data-testid="resizable-panel"
        :style="{ width: panelWidth + 'px' }"
      >
        <div class="panel-content" data-testid="resizable-content">
          Drag the handle on the right edge to resize this panel. The current width is shown above.
        </div>
        <div
          class="resize-handle"
          data-testid="resizable-handle"
          @mousedown.prevent="startResize"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panelWidth: 300,
      isResizing: false,
      startX: 0,
      startWidth: 300,
    };
  },
  mounted() {
    this._onMouseMove = this.onMouseMove.bind(this);
    this._onMouseUp = this.onMouseUp.bind(this);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
  },
  methods: {
    startResize(event) {
      this.isResizing = true;
      this.startX = event.clientX;
      this.startWidth = this.panelWidth;
    },
    onMouseMove(event) {
      if (!this.isResizing) return;
      const delta = event.clientX - this.startX;
      this.panelWidth = Math.max(150, Math.min(600, this.startWidth + delta));
    },
    onMouseUp() {
      this.isResizing = false;
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; }
.page-desc { color: var(--text-secondary); margin-bottom: 1rem; }
.width-text { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem; }
.width-text span { font-weight: 600; color: var(--text-primary); }
.resizable-wrapper { overflow: visible; }
.resizable-panel {
  position: relative; height: 200px; min-width: 150px; max-width: 600px;
  background: var(--bg-sidebar); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1rem;
}
.panel-content { color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5; }
.resize-handle {
  position: absolute; right: -5px; top: 0; bottom: 0; width: 10px;
  cursor: col-resize; display: flex; align-items: center; justify-content: center;
  border-radius: 0 var(--radius) var(--radius) 0;
}
.resize-handle::after {
  content: ''; width: 4px; height: 40px;
  background: var(--accent); border-radius: 2px; opacity: 0.6;
}
.resize-handle:hover::after { opacity: 1; }
</style>
