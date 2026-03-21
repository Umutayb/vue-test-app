<template>
  <div class="dropzone-page">
    <h2>Drop Zone</h2>
    <div class="dropzone-layout">
      <div class="source-list">
        <p class="list-label">Source Items</p>
        <div
          v-for="(item, index) in sourceItems"
          :key="item"
          :data-testid="`dropzone-source-${index + 1}`"
          class="source-item"
          draggable="true"
          @dragstart="onDragStart(item)"
        >
          {{ item }}
        </div>
      </div>
      <div
        class="drop-target"
        :class="{ 'drag-over': isDragging }"
        data-testid="dropzone-target"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="onDrop"
      >
        <p class="list-label">Drop Zone</p>
        <div
          v-for="(item, index) in droppedItems"
          :key="index"
          :data-testid="`dropzone-dropped-${index + 1}`"
          class="dropped-item"
        >
          {{ item }}
        </div>
        <p v-if="droppedItems.length === 0" class="empty-hint">Drop items here</p>
      </div>
    </div>
    <div class="dropzone-footer">
      <span data-testid="dropzone-count">{{ countLabel }}</span>
      <button data-testid="dropzone-clear" @click="droppedItems = []">Clear</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropZonePage',
  data() {
    return {
      sourceItems: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
      droppedItems: [],
      dragging: null,
      isDragging: false,
    };
  },
  computed: {
    countLabel() {
      const n = this.droppedItems.length;
      return n === 1 ? '1 item in zone' : `${n} items in zone`;
    },
  },
  methods: {
    onDragStart(item) {
      this.dragging = item;
    },
    onDrop() {
      if (this.dragging !== null) {
        this.droppedItems.push(this.dragging);
        this.dragging = null;
      }
      this.isDragging = false;
    },
  },
};
</script>

<style scoped>
.dropzone-page {
  padding: 1.5rem;
  color: var(--text-primary);
}

.dropzone-layout {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.source-list {
  flex: 1;
}

.list-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.source-item {
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  cursor: grab;
  color: var(--text-primary);
}

.source-item:active {
  cursor: grabbing;
}

.drop-target {
  flex: 1;
  min-height: 160px;
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  padding: 0.75rem;
}

.drop-target.drag-over {
  background: var(--accent-light);
  border-color: var(--accent);
}

.dropped-item {
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.empty-hint {
  color: var(--text-muted);
  font-style: italic;
}

.dropzone-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.dropzone-footer button {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  padding: 0.4rem 1rem;
  cursor: pointer;
}

.dropzone-footer button:hover {
  background: var(--accent-hover);
}
</style>
