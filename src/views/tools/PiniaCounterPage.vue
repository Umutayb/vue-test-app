<template>
  <div class="page">
    <h1>Pinia Counter</h1>
    <p class="page-desc">Shared counter state managed with Pinia</p>

    <div class="counter-card">
      <div class="count-display" data-testid="counter-value">{{ store.count }}</div>

      <div class="main-btns">
        <button class="btn btn-secondary" data-testid="counter-decrement" @click="store.decrement()">− Step</button>
        <button class="btn btn-primary"   data-testid="counter-increment" @click="store.increment()">+ Step</button>
        <button class="btn btn-danger"    data-testid="counter-reset"     @click="store.reset()">Reset</button>
      </div>

      <div class="step-row">
        <label>Step size:</label>
        <input
          type="number"
          class="step-input"
          data-testid="counter-step-input"
          :value="store.step"
          min="1"
          @input="store.setStep($event.target.value)"
        />
      </div>

      <div class="history-section">
        <p class="history-title">Last operations:</p>
        <div data-testid="counter-history" class="history-list">
          <div
            v-for="(entry, i) in store.history"
            :key="i"
            class="history-item"
            :data-testid="`counter-history-item-${i + 1}`"
          >{{ entry }}</div>
          <div v-if="store.history.length === 0" class="history-empty">No operations yet</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter.js';

export default {
  setup() {
    const store = useCounterStore();
    return { store };
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 500px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.counter-card { background: var(--bg-sidebar); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
.count-display { font-size: 3.5rem; font-weight: 700; text-align: center; color: var(--text-primary); line-height: 1; }
.main-btns { display: flex; gap: 0.75rem; justify-content: center; }
.btn { padding: 0.5rem 1.25rem; border-radius: var(--radius); font-size: 0.9rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { background: var(--bg-input); color: var(--text-primary); border-color: var(--border); }
.btn-secondary:hover { background: var(--border); }
.btn-danger { background: #fee2e2; color: #ef4444; border-color: #fca5a5; }
.btn-danger:hover { background: #fecaca; }
.step-row { display: flex; align-items: center; gap: 0.75rem; justify-content: center; }
.step-row label { font-size: 0.875rem; color: var(--text-secondary); }
.step-input { width: 80px; padding: 0.4rem 0.6rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem; text-align: center; }
.history-title { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
.history-list { display: flex; flex-direction: column; gap: 0.25rem; }
.history-item { font-size: 0.85rem; color: var(--text-secondary); padding: 0.3rem 0.6rem; background: var(--bg-primary); border-radius: 4px; }
.history-empty { font-size: 0.85rem; color: var(--text-muted); }
</style>
