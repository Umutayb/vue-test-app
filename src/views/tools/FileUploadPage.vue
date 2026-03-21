<template>
  <div class="page">
    <h1>File Upload</h1>
    <p class="page-desc">Single, multiple, and drag-and-drop file inputs</p>

    <section class="section">
      <h2>Single File</h2>
      <input type="file" data-testid="file-input-single" @change="onSingle" />
      <p class="file-name" data-testid="file-single-name">{{ singleName || 'No file selected' }}</p>
    </section>

    <section class="section">
      <h2>Multiple Files</h2>
      <input type="file" multiple data-testid="file-input-multiple" @change="onMultiple" />
      <ul class="file-list" data-testid="file-multiple-list">
        <li v-for="name in multipleNames" :key="name">{{ name }}</li>
        <li v-if="!multipleNames.length" class="empty">No files selected</li>
      </ul>
    </section>

    <section class="section">
      <h2>Type Filtered (Images &amp; PDFs)</h2>
      <input type="file" accept=".jpg,.jpeg,.png,.pdf" data-testid="file-input-typed" />
      <p class="hint">Accepts .jpg, .jpeg, .png, .pdf only</p>
    </section>

    <section class="section">
      <h2>Drag &amp; Drop Zone</h2>
      <div
        class="drop-zone"
        data-testid="file-drop-zone"
        :class="{ 'drag-over': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
      >
        <p>{{ isDragging ? 'Drop files here' : 'Drag files here' }}</p>
      </div>
      <ul class="file-list" data-testid="file-drop-list">
        <li v-for="name in dropNames" :key="name">{{ name }}</li>
        <li v-if="!dropNames.length" class="empty">No files dropped</li>
      </ul>
      <button class="clear-btn" data-testid="file-drop-clear" @click="dropNames = []">Clear</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return { singleName: '', multipleNames: [], dropNames: [], isDragging: false };
  },
  methods: {
    onSingle(e) { this.singleName = e.target.files[0]?.name || ''; },
    onMultiple(e) { this.multipleNames = Array.from(e.target.files).map(f => f.name); },
    onDrop(e) {
      this.isDragging = false;
      const names = Array.from(e.dataTransfer.files).map(f => f.name);
      this.dropNames = [...this.dropNames, ...names];
    }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 0.75rem; color: var(--text-primary); font-size: 1rem; }
.file-name { margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.875rem; }
.file-list { margin-top: 0.5rem; padding-left: 1.25rem; font-size: 0.875rem; color: var(--text-secondary); }
.file-list .empty { list-style: none; padding-left: 0; color: var(--text-muted); }
.hint { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem; }
.drop-zone {
  border: 2px dashed var(--border); border-radius: var(--radius);
  padding: 2.5rem; text-align: center; color: var(--text-muted);
  transition: background 0.15s, border-color 0.15s;
}
.drop-zone.drag-over { background: var(--accent-light); border-color: var(--accent); color: var(--accent); }
.clear-btn {
  margin-top: 0.5rem; padding: 0.3rem 0.75rem; border: 1px solid var(--border);
  border-radius: var(--radius); background: var(--bg-input); color: var(--text-secondary);
  cursor: pointer; font-size: 0.8rem;
}
.clear-btn:hover { background: var(--border); }
</style>
