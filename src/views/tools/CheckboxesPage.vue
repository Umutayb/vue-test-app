<template>
  <div class="page">
    <h1>Checkboxes &amp; Toggles</h1>
    <p class="page-desc">Checkbox and toggle switch states</p>

    <section class="section">
      <h2>Checkboxes</h2>
      <div class="controls-list">
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-unchecked" v-model="checks.unchecked" />
          <span>Unchecked (default)</span>
        </label>
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-checked" v-model="checks.checked" />
          <span>Checked (default)</span>
        </label>
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-indeterminate" ref="indeterminate" v-model="checks.indeterminate" />
          <span>Indeterminate</span>
        </label>
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-disabled" disabled />
          <span>Disabled unchecked</span>
        </label>
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-disabled-checked" disabled checked />
          <span>Disabled checked</span>
        </label>
      </div>
    </section>

    <section class="section">
      <h2>Toggle Switches</h2>
      <div class="controls-list">
        <label class="toggle-label">
          <input type="checkbox" data-testid="toggle-off" v-model="toggles.off" class="toggle-input" />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span>Toggle (off)</span>
        </label>
        <label class="toggle-label">
          <input type="checkbox" data-testid="toggle-on" v-model="toggles.on" class="toggle-input" />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span>Toggle (on by default)</span>
        </label>
        <label class="toggle-label">
          <input type="checkbox" data-testid="toggle-disabled" disabled class="toggle-input" />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span>Toggle disabled</span>
        </label>
      </div>
    </section>

    <section class="section">
      <h2>State Summary</h2>
      <div data-testid="checkbox-state-summary" class="summary">{{ stateSummary }}</div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checks: { unchecked: false, checked: true, indeterminate: false },
      toggles: { off: false, on: true }
    };
  },
  computed: {
    stateSummary() {
      const active = [];
      if (this.checks.unchecked) active.push('Unchecked');
      if (this.checks.checked) active.push('Checked');
      if (this.checks.indeterminate) active.push('Indeterminate');
      if (this.toggles.off) active.push('Toggle off');
      if (this.toggles.on) active.push('Toggle on');
      return active.length ? active.join(', ') : 'None checked';
    }
  },
  mounted() {
    this.$refs.indeterminate.indeterminate = true;
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem; }
.controls-list { display: flex; flex-direction: column; gap: 0.75rem; }
.control-label { display: flex; align-items: center; gap: 0.6rem; cursor: pointer; color: var(--text-primary); font-size: 0.9rem; }
.control-label input[type="checkbox"] { accent-color: var(--accent); width: 16px; height: 16px; cursor: pointer; }
.control-label input:disabled { cursor: not-allowed; }
/* Toggle */
.toggle-label { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; color: var(--text-primary); font-size: 0.9rem; }
.toggle-input { display: none; }
.toggle-track {
  position: relative; width: 44px; height: 24px; background: var(--border);
  border-radius: 999px; transition: background 0.2s; flex-shrink: 0;
}
.toggle-thumb {
  position: absolute; top: 3px; left: 3px; width: 18px; height: 18px;
  background: #fff; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle-input:checked + .toggle-track { background: var(--accent); }
.toggle-input:checked + .toggle-track .toggle-thumb { transform: translateX(20px); }
.toggle-input:disabled + .toggle-track { opacity: 0.5; cursor: not-allowed; }
.summary {
  padding: 0.75rem 1rem; background: var(--bg-sidebar); border-radius: var(--radius);
  color: var(--text-secondary); font-size: 0.9rem;
}
</style>
