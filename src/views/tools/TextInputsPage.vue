<template>
  <div class="page">
    <h1>Text Inputs</h1>
    <p class="page-desc">Input types and states</p>

    <div class="inputs-grid">
      <div class="input-group">
        <label>Text</label>
        <input type="text" v-model="values.text" data-testid="input-text" placeholder="Enter text" />
      </div>
      <div class="input-group">
        <label>Password</label>
        <input type="password" v-model="values.password" data-testid="input-password" placeholder="Enter password" />
      </div>
      <div class="input-group">
        <label>Email</label>
        <input type="email" v-model="values.email" data-testid="input-email" placeholder="Enter email" />
      </div>
      <div class="input-group">
        <label>Number (0–100)</label>
        <input type="number" v-model.number="values.number" data-testid="input-number" min="0" max="100" placeholder="0–100" />
      </div>
      <div class="input-group full-width">
        <label>Textarea</label>
        <textarea v-model="values.textarea" data-testid="input-textarea" rows="3" placeholder="Enter text..."></textarea>
      </div>
      <div class="input-group">
        <label>Disabled</label>
        <input type="text" value="Read-only value" data-testid="input-disabled" disabled />
      </div>
      <div class="input-group">
        <label>Error state</label>
        <input type="text" value="invalid@" data-testid="input-error" class="input-error-state" />
        <span class="error-msg">Invalid email address</span>
      </div>
      <div class="input-group">
        <label>Success state</label>
        <input type="text" value="valid@example.com" data-testid="input-success" class="input-success-state" />
      </div>
    </div>

    <section class="section">
      <h2>Current Values</h2>
      <div data-testid="input-values" class="values-display">
        <span v-for="(val, key) in values" :key="key">
          <strong>{{ key }}:</strong> {{ val !== '' && val !== null ? val : '—' }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      values: { text: '', password: '', email: '', number: '', textarea: '' }
    };
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 900px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.inputs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 2rem; }
.full-width { grid-column: 1 / -1; }
.input-group { display: flex; flex-direction: column; gap: 0.4rem; }
.input-group label { font-size: 0.875rem; font-weight: 500; color: var(--text-secondary); }
input, textarea {
  padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-primary); font-size: 0.875rem;
  transition: border-color 0.15s;
}
input:focus, textarea:focus { outline: none; border-color: var(--accent); }
input:disabled { opacity: 0.6; cursor: not-allowed; background: var(--bg-sidebar); }
textarea { resize: vertical; }
.input-error-state { border-color: #ef4444; }
.input-success-state { border-color: #22c55e; }
.error-msg { font-size: 0.75rem; color: #ef4444; }
.section { margin-bottom: 1.5rem; }
.section h2 { margin-bottom: 0.75rem; font-size: 1rem; }
.values-display { display: flex; flex-wrap: wrap; gap: 0.5rem 2rem; padding: 0.75rem 1rem; background: var(--bg-sidebar); border-radius: var(--radius); }
.values-display span { font-size: 0.875rem; color: var(--text-secondary); }
</style>
