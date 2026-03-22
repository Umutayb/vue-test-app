<template>
  <div class="page">
    <h1>Droppable</h1>
    <p class="page-desc">Drag items to matching colored drop zones</p>

    <p class="status-text">Status: <span data-testid="droppable-status">{{ status }}</span></p>

    <div class="source-section">
      <h2>Source Items</h2>
      <div class="source-row">
        <div
          v-for="item in sourceItems"
          :key="item.id"
          class="drop-item"
          :class="`item-${item.type}`"
          :data-testid="`droppable-item-${item.id}`"
          draggable="true"
          @dragstart="onDragStart($event, item)"
          @touchstart.prevent="onTouchStart($event, item)"
        >{{ item.label }}</div>
      </div>
    </div>

    <div class="zones-row">
      <div
        v-for="zone in zones"
        :key="zone.type"
        class="drop-zone"
        :class="`zone-${zone.type}`"
        :data-testid="`droppable-zone-${zone.type}`"
        @dragover.prevent
        @drop.prevent="onDrop($event, zone.type)"
      >
        <p class="zone-title">{{ zone.label }}</p>
        <p class="zone-count" :data-testid="`droppable-zone-count-${zone.type}`">{{ zone.items.length }} items</p>
        <div
          v-for="item in zone.items"
          :key="item.id"
          class="drop-item"
          :class="`item-${item.type}`"
        >{{ item.label }}</div>
      </div>
    </div>

    <button class="reset-btn" data-testid="droppable-reset" @click="reset">Reset</button>
  </div>
</template>

<script>
const INITIAL_ITEMS = [
  { id: 1, label: 'Red 1',   type: 'red' },
  { id: 2, label: 'Red 2',   type: 'red' },
  { id: 3, label: 'Blue 1',  type: 'blue' },
  { id: 4, label: 'Blue 2',  type: 'blue' },
  { id: 5, label: 'Green 1', type: 'green' },
  { id: 6, label: 'Green 2', type: 'green' },
];

export default {
  data() {
    return {
      sourceItems: INITIAL_ITEMS.map(i => ({ ...i })),
      zones: [
        { type: 'red',   label: 'Red Zone',   items: [] },
        { type: 'blue',  label: 'Blue Zone',  items: [] },
        { type: 'green', label: 'Green Zone', items: [] },
      ],
      draggingItem: null,
      touchGhost: null,
      status: 'Ready',
    };
  },
  mounted() {
    this._onTouchMove = this.onTouchMove.bind(this);
    this._onTouchEnd = this.onTouchEnd.bind(this);
    document.addEventListener('touchmove', this._onTouchMove, { passive: false });
    document.addEventListener('touchend', this._onTouchEnd);
  },
  beforeUnmount() {
    document.removeEventListener('touchmove', this._onTouchMove);
    document.removeEventListener('touchend', this._onTouchEnd);
    this.removeTouchGhost();
  },
  methods: {
    onDragStart(event, item) {
      this.draggingItem = item;
    },
    onDrop(event, zoneType) {
      if (!this.draggingItem) return;
      this.dropIntoZone(zoneType);
    },
    dropIntoZone(zoneType) {
      if (!this.draggingItem) return;
      if (this.draggingItem.type !== zoneType) {
        this.status = 'Wrong zone!';
        this.draggingItem = null;
        return;
      }
      const idx = this.sourceItems.findIndex(i => i.id === this.draggingItem.id);
      if (idx !== -1) {
        this.sourceItems.splice(idx, 1);
        const zone = this.zones.find(z => z.type === zoneType);
        zone.items.push(this.draggingItem);
        this.status = `Dropped ${this.draggingItem.label} into ${zone.label}`;
      }
      this.draggingItem = null;
    },
    onTouchStart(event, item) {
      this.draggingItem = item;
      const touch = event.touches[0];
      const el = event.target;
      const ghost = el.cloneNode(true);
      ghost.style.position = 'fixed';
      ghost.style.left = touch.clientX - 30 + 'px';
      ghost.style.top = touch.clientY - 15 + 'px';
      ghost.style.opacity = '0.8';
      ghost.style.pointerEvents = 'none';
      ghost.style.zIndex = '9999';
      ghost.style.touchAction = 'none';
      document.body.appendChild(ghost);
      this.touchGhost = ghost;
    },
    onTouchMove(event) {
      if (!this.draggingItem) return;
      event.preventDefault();
      const touch = event.touches[0];
      if (this.touchGhost) {
        this.touchGhost.style.left = touch.clientX - 30 + 'px';
        this.touchGhost.style.top = touch.clientY - 15 + 'px';
      }
    },
    onTouchEnd(event) {
      if (!this.draggingItem) return;
      this.removeTouchGhost();
      const touch = event.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target) {
        const zoneEl = target.closest('[data-testid^="droppable-zone-"]');
        if (zoneEl) {
          const zoneType = zoneEl.dataset.testid.replace('droppable-zone-', '');
          this.dropIntoZone(zoneType);
          return;
        }
      }
      this.draggingItem = null;
      this.status = 'Missed drop zone';
    },
    removeTouchGhost() {
      if (this.touchGhost) {
        this.touchGhost.remove();
        this.touchGhost = null;
      }
    },
    reset() {
      this.sourceItems = INITIAL_ITEMS.map(i => ({ ...i }));
      this.zones.forEach(z => { z.items = []; });
      this.status = 'Ready';
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1rem; }
.status-text { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
.status-text span { font-weight: 600; color: var(--text-primary); }
.source-section h2 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; }
.source-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
.zones-row { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
.drop-zone { flex: 1; min-height: 120px; border: 2px dashed var(--border); border-radius: var(--radius); padding: 0.75rem; }
.zone-title { font-weight: 600; font-size: 0.875rem; margin-bottom: 0.25rem; }
.zone-count { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; }
.zone-red   { border-color: #ef4444; }
.zone-blue  { border-color: #3b82f6; }
.zone-green { border-color: #22c55e; }
.drop-item { padding: 0.4rem 0.6rem; border-radius: var(--radius); font-size: 0.8rem; font-weight: 600; cursor: grab; margin-bottom: 0.25rem; }
.item-red   { background: #fee2e2; color: #ef4444; }
.item-blue  { background: #dbeafe; color: #3b82f6; }
.item-green { background: #dcfce7; color: #22c55e; }
.reset-btn { padding: 0.4rem 1rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-secondary); cursor: pointer; font-size: 0.875rem; }
.reset-btn:hover { background: var(--border); }
@media (max-width: 767px) {
  .zones-row { flex-direction: column; }
  .drop-item { min-height: 44px; display: flex; align-items: center; }
}
</style>
