<template>
  <div class="page">
    <h1>State Viewer</h1>
    <p class="page-desc">Toggle between empty, loading, error, and populated UI states</p>

    <div class="trigger-row">
      <button class="state-btn" data-testid="state-btn-empty"     @click="setState('empty')">Empty</button>
      <button class="state-btn" data-testid="state-btn-loading"   @click="simulateLoad">Loading</button>
      <button class="state-btn" data-testid="state-btn-error"     @click="setState('error')">Error</button>
      <button class="state-btn" data-testid="state-btn-populated" @click="setState('populated')">Populated</button>
    </div>

    <p class="current-state">Current state: <span class="state-badge" :class="`badge-${state}`" data-testid="state-current">{{ state }}</span></p>

    <div class="state-card">
      <div v-if="state === 'empty'" class="state-view empty-view" data-testid="state-empty-view">
        <div class="state-icon">○</div>
        <p>No data available. Try loading some content.</p>
      </div>

      <div v-if="state === 'loading'" class="state-view loading-view" data-testid="state-loading-view">
        <div class="spinner"></div>
        <p>Loading content...</p>
      </div>

      <div v-if="state === 'error'" class="state-view error-view" data-testid="state-error-view">
        <div class="state-icon error-icon">✕</div>
        <p>Something went wrong. Please try again.</p>
        <button class="retry-btn" data-testid="state-retry" @click="simulateLoad">Retry</button>
      </div>

      <div v-if="state === 'populated'" class="state-view populated-view" data-testid="state-populated-view">
        <div
          v-for="(item, i) in populatedItems"
          :key="i"
          class="populated-item"
          :data-testid="`state-populated-item-${i + 1}`"
        >{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'empty',
      populatedItems: ['First result', 'Second result', 'Third result', 'Fourth result', 'Fifth result'],
    };
  },
  beforeUnmount() {
    if (this._loadTimer) clearTimeout(this._loadTimer);
  },
  methods: {
    setState(s) { this.state = s; },
    simulateLoad() {
      this.state = 'loading';
      this._loadTimer = setTimeout(() => { this.state = 'populated'; }, 1500);
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.trigger-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.state-btn { padding: 0.4rem 1rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); cursor: pointer; font-size: 0.875rem; }
.state-btn:hover { background: var(--border); }
.current-state { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
.state-badge { font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.8rem; }
.badge-empty     { background: var(--bg-sidebar); color: var(--text-muted); }
.badge-loading   { background: #dbeafe; color: #2563eb; }
.badge-error     { background: #fee2e2; color: #ef4444; }
.badge-populated { background: #dcfce7; color: #16a34a; }
.state-card { border: 1px solid var(--border); border-radius: var(--radius); min-height: 180px; }
.state-view { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; gap: 0.75rem; min-height: 180px; color: var(--text-secondary); }
.state-icon { font-size: 2rem; }
.error-icon { color: #ef4444; }
.spinner { width: 36px; height: 36px; border: 4px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.retry-btn { padding: 0.4rem 1rem; background: #ef4444; color: #fff; border: none; border-radius: var(--radius); cursor: pointer; font-size: 0.875rem; }
.populated-view { padding: 0.5rem; }
.populated-item { padding: 0.6rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.875rem; color: var(--text-primary); }
.populated-item:last-child { border-bottom: none; }
</style>
