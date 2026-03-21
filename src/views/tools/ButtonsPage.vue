<template>
  <div class="page">
    <h1>Buttons</h1>
    <p class="page-desc">Button variants, states, and sizes</p>

    <section class="section">
      <h2>Variants</h2>
      <div class="btn-row">
        <button class="btn btn-primary" data-testid="btn-primary" @click="setResult('Primary')">Primary</button>
        <button class="btn btn-secondary" data-testid="btn-secondary" @click="setResult('Secondary')">Secondary</button>
        <button class="btn btn-danger" data-testid="btn-danger" @click="setResult('Danger')">Danger</button>
        <button class="btn btn-ghost" data-testid="btn-ghost" @click="setResult('Ghost')">Ghost</button>
        <button class="btn btn-outline" data-testid="btn-outline" @click="setResult('Outline')">Outline</button>
      </div>
    </section>

    <section class="section">
      <h2>Sizes</h2>
      <div class="btn-row">
        <button class="btn btn-primary btn-sm" data-testid="btn-small" @click="setResult('Small')">Small</button>
        <button class="btn btn-primary btn-md" data-testid="btn-medium" @click="setResult('Medium')">Medium</button>
        <button class="btn btn-primary btn-lg" data-testid="btn-large" @click="setResult('Large')">Large</button>
      </div>
    </section>

    <section class="section">
      <h2>States</h2>
      <div class="btn-row">
        <button class="btn btn-primary" disabled data-testid="btn-disabled">Disabled</button>
        <button class="btn btn-primary" data-testid="btn-loading" disabled>
          <span class="spinner"></span> Loading
        </button>
      </div>
    </section>

    <section class="section">
      <h2>Result</h2>
      <p class="result-text">Last clicked: <span data-testid="btn-result">{{ lastClicked || 'none' }}</span></p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return { lastClicked: '' };
  },
  methods: {
    setResult(label) { this.lastClicked = label; }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 900px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem; }
.btn-row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }
.btn {
  border: none; cursor: pointer; font-size: 0.875rem; font-weight: 500;
  border-radius: var(--radius); transition: background 0.15s, opacity 0.15s;
  display: inline-flex; align-items: center; gap: 0.4rem;
}
.btn-md, .btn:not(.btn-sm):not(.btn-lg) { padding: 0.5rem 1.25rem; }
.btn-sm { padding: 0.25rem 0.75rem; font-size: 0.75rem; }
.btn-lg { padding: 0.75rem 2rem; font-size: 1rem; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover:not(:disabled) { background: var(--accent-hover); }
.btn-secondary { background: var(--bg-sidebar); color: var(--text-primary); border: 1px solid var(--border); }
.btn-secondary:hover:not(:disabled) { background: var(--border); }
.btn-danger { background: #ef4444; color: #fff; }
.btn-danger:hover:not(:disabled) { background: #dc2626; }
.btn-ghost { background: transparent; color: var(--accent); }
.btn-ghost:hover:not(:disabled) { background: var(--accent-light); }
.btn-outline { background: transparent; color: var(--accent); border: 1px solid var(--accent); }
.btn-outline:hover:not(:disabled) { background: var(--accent-light); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.spinner {
  display: inline-block; width: 12px; height: 12px;
  border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.result-text { color: var(--text-secondary); font-size: 0.9rem; }
.result-text span { font-weight: 600; color: var(--accent); }
</style>
