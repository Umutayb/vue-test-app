<template>
  <div class="page">
    <h1>Draggable</h1>
    <p class="page-desc">Freely reposition elements by dragging them around the canvas</p>

    <p class="status-text">Dragging: <span data-testid="draggable-status">{{ draggingId !== null ? `item-${draggingId}` : 'none' }}</span></p>

    <div
      class="canvas"
      data-testid="draggable-canvas"
      @mousemove="onPointerMove"
      @mouseup="onPointerUp"
      @mouseleave="onPointerUp"
      @touchmove.prevent="onTouchMove"
      @touchend="onPointerUp"
      @touchcancel="onPointerUp"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="drag-item"
        :data-testid="`draggable-item-${item.id}`"
        :style="{ left: item.x + 'px', top: item.y + 'px' }"
        @mousedown.prevent="onPointerDown($event, item)"
        @touchstart.prevent="onTouchStart($event, item)"
      >{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, label: 'Block A', x: 40,  y: 40 },
        { id: 2, label: 'Block B', x: 200, y: 40 },
        { id: 3, label: 'Block C', x: 40,  y: 160 },
        { id: 4, label: 'Block D', x: 200, y: 160 },
      ],
      draggingId: null,
      offsetX: 0,
      offsetY: 0,
    };
  },
  methods: {
    onPointerDown(event, item) {
      this.draggingId = item.id;
      this.offsetX = event.clientX - item.x;
      this.offsetY = event.clientY - item.y;
    },
    onTouchStart(event, item) {
      const touch = event.touches[0];
      this.draggingId = item.id;
      this.offsetX = touch.clientX - item.x;
      this.offsetY = touch.clientY - item.y;
    },
    onPointerMove(event) {
      this.moveItem(event.clientX, event.clientY);
    },
    onTouchMove(event) {
      const touch = event.touches[0];
      this.moveItem(touch.clientX, touch.clientY);
    },
    moveItem(clientX, clientY) {
      if (this.draggingId === null) return;
      const canvas = this.$el.querySelector('.canvas');
      const rect = canvas.getBoundingClientRect();
      const item = this.items.find(i => i.id === this.draggingId);
      if (!item) return;
      item.x = Math.max(0, Math.min(rect.width - 80, clientX - this.offsetX));
      item.y = Math.max(0, Math.min(rect.height - 40, clientY - this.offsetY));
    },
    onPointerUp() {
      this.draggingId = null;
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1rem; }
.status-text { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem; }
.status-text span { font-weight: 600; color: var(--text-primary); }
.canvas {
  position: relative; width: 100%; height: 280px;
  border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-sidebar); user-select: none; overflow: hidden;
  touch-action: none;
}
.drag-item {
  position: absolute; width: 80px; height: 40px;
  background: var(--bg-primary); border: 1px solid var(--accent);
  border-radius: var(--radius); cursor: grab;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 600; color: var(--text-primary);
}
.drag-item:active { cursor: grabbing; }
</style>
