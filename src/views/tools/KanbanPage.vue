<template>
  <div class="page">
    <h1>Kanban</h1>
    <p class="page-desc">Drag-and-drop Kanban board with three columns</p>

    <div class="kanban-board">
      <div
        v-for="(col, colKey) in columns"
        :key="colKey"
        class="kanban-column"
        :data-testid="`kanban-column-${colKey}`"
        @dragover.prevent
        @drop.prevent="onDrop(colKey)"
      >
        <div class="kanban-column-header">{{ col.label }}</div>

        <div
          v-for="card in col.cards"
          :key="card.id"
          class="kanban-card"
          :class="{ dragging: draggingId === card.id }"
          :data-testid="`kanban-card-${card.id}`"
          draggable="true"
          @dragstart="onDragStart(card.id, colKey)"
          @dragend="onDragEnd"
        >
          {{ card.text }}
        </div>

        <button
          class="kanban-add-btn"
          :data-testid="`kanban-add-${colKey}`"
          @click="addCard(colKey)"
        >
          + Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KanbanPage",
  data() {
    return {
      draggingId: null,
      sourceCol: null,
      columns: {
        todo: {
          label: "To Do",
          cards: [
            { id: 1, text: "Design wireframes" },
            { id: 2, text: "Write unit tests" },
            { id: 3, text: "Set up CI/CD" },
          ],
        },
        inprogress: {
          label: "In Progress",
          cards: [
            { id: 4, text: "Build login form" },
            { id: 5, text: "API integration" },
          ],
        },
        done: {
          label: "Done",
          cards: [
            { id: 6, text: "Project setup" },
            { id: 7, text: "Database schema" },
          ],
        },
      },
      nextId: 8,
    };
  },
  methods: {
    onDragStart(cardId, colKey) {
      this.draggingId = cardId;
      this.sourceCol = colKey;
    },
    onDragEnd() {
      this.draggingId = null;
      this.sourceCol = null;
    },
    onDrop(targetColKey) {
      if (!this.sourceCol || this.draggingId === null) return;
      const sourceCards = this.columns[this.sourceCol].cards;
      const idx = sourceCards.findIndex((c) => c.id === this.draggingId);
      if (idx === -1) return;
      const [card] = sourceCards.splice(idx, 1);
      this.columns[targetColKey].cards.push(card);
      this.draggingId = null;
      this.sourceCol = null;
    },
    addCard(colKey) {
      const id = this.nextId++;
      this.columns[colKey].cards.push({ id, text: `New card ${id}` });
    },
  },
};
</script>

<style scoped>
.kanban-board {
  display: flex;
  gap: 1rem;
}

.kanban-column {
  flex: 1;
  background: var(--bg-sidebar);
  border-radius: var(--radius);
  padding: 0.75rem;
}

.kanban-column-header {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.kanban-card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: grab;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.kanban-card.dragging {
  opacity: 0.5;
}

.kanban-add-btn {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.4rem 0;
  background: var(--bg-input);
  color: var(--text-secondary);
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.85rem;
}

.kanban-add-btn:hover {
  background: var(--accent-light);
  color: var(--accent);
  border-color: var(--accent);
}
</style>
