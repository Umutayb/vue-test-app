<template>
  <div class="page">
    <h1>Sortable</h1>
    <p class="page-desc">Drag items between the two lists</p>

    <div class="lists-layout">
      <div
        class="sort-list"
        data-testid="sortable-list-1"
        @drop.prevent="onDrop($event, 1)"
        @dragover.prevent
        @dragenter.prevent
      >
        <p class="list-title">First List <span class="list-count" data-testid="sortable-count-1">{{ getList(1).length }} items</span></p>
        <div
          class="sort-item"
          v-for="item in getList(1)"
          :key="item.id"
          :data-testid="`sortable-item-${item.id}`"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >{{ item.title }}</div>
      </div>

      <div
        class="sort-list"
        data-testid="sortable-list-2"
        @drop.prevent="onDrop($event, 2)"
        @dragover.prevent
        @dragenter.prevent
      >
        <p class="list-title">Second List <span class="list-count" data-testid="sortable-count-2">{{ getList(2).length }} items</span></p>
        <div
          class="sort-item"
          v-for="item in getList(2)"
          :key="item.id"
          :data-testid="`sortable-item-${item.id}`"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, title: 'Item A', list: 1 },
        { id: 2, title: 'Item B', list: 1 },
        { id: 3, title: 'Item C', list: 1 },
        { id: 4, title: 'Item D', list: 2 },
        { id: 5, title: 'Item E', list: 2 },
      ],
    };
  },
  methods: {
    getList(list) {
      return this.items.filter(item => item.list === list);
    },
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemID', item.id);
    },
    onDrop(event, newList) {
      const itemID = parseInt(event.dataTransfer.getData('itemID'), 10);
      const idx = this.items.findIndex(item => item.id === itemID);
      if (idx !== -1) {
        this.items[idx].list = newList;
      }
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.lists-layout { display: flex; gap: 1.5rem; }
.sort-list {
  flex: 1; min-height: 120px;
  background: var(--bg-sidebar); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 0.75rem;
}
.list-title { font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; display: flex; justify-content: space-between; }
.list-count { font-weight: 400; font-size: 0.8rem; color: var(--text-muted); }
.sort-item {
  background: var(--bg-primary); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 0.6rem 0.75rem;
  margin-bottom: 0.5rem; cursor: grab; color: var(--text-primary); font-size: 0.875rem;
}
.sort-item:active { cursor: grabbing; }
</style>
