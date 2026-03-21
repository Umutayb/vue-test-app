<template>
  <div class="page">
    <h1>Tabs</h1>
    <p class="page-desc">Tab navigation with switchable content panels</p>

    <div class="tabs-container" data-testid="tabs-container">
      <div class="tab-bar">
        <button
          v-for="(tab, i) in tabs"
          :key="tab.id"
          class="tab"
          :class="{ active: activeTab === i }"
          :data-testid="`tab-${i + 1}`"
          @click="activeTab = i"
        >{{ tab.label }}</button>
      </div>

      <div class="tab-panels">
        <div v-show="activeTab === 0" class="tab-panel" data-testid="tab-panel-1">
          <h3>Overview</h3>
          <p>This tabs component demonstrates a common navigation pattern used in web applications. Click any tab above to switch between panels. Tests can target <code>data-testid="tab-{n}"</code> to click tabs and <code>data-testid="tab-panel-{n}"</code> to verify panel content.</p>
        </div>
        <div v-show="activeTab === 1" class="tab-panel" data-testid="tab-panel-2">
          <h3>Details</h3>
          <table class="details-table">
            <tr><td>Component</td><td>Tabs</td></tr>
            <tr><td>Category</td><td>Widgets</td></tr>
            <tr><td>Tab count</td><td>4</td></tr>
            <tr><td>Default active</td><td>1</td></tr>
          </table>
        </div>
        <div v-show="activeTab === 2" class="tab-panel" data-testid="tab-panel-3">
          <h3>Code</h3>
          <pre class="code-block"><code>// Click a tab
await page.click('[data-testid="tab-2"]')

// Verify panel is visible
await expect(
  page.locator('[data-testid="tab-panel-2"]')
).toBeVisible()</code></pre>
        </div>
        <div v-show="activeTab === 3" class="tab-panel" data-testid="tab-panel-4">
          <h3>Settings</h3>
          <div class="settings-list">
            <label class="toggle-label">
              <input type="checkbox" v-model="settings.animate" class="toggle-input" />
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
              <span>Animate transitions</span>
            </label>
            <label class="toggle-label">
              <input type="checkbox" v-model="settings.lazy" class="toggle-input" />
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
              <span>Lazy load panels</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        { id: 1, label: 'Overview' },
        { id: 2, label: 'Details' },
        { id: 3, label: 'Code' },
        { id: 4, label: 'Settings' },
      ],
      settings: { animate: true, lazy: false }
    };
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 800px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.tabs-container { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.tab-bar { display: flex; border-bottom: 1px solid var(--border); }
.tab {
  padding: 0.75rem 1.25rem; background: none; border: none; cursor: pointer;
  font-size: 0.875rem; color: var(--text-secondary); border-bottom: 2px solid transparent;
  transition: color 0.15s;
}
.tab.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 500; }
.tab:hover:not(.active) { color: var(--text-primary); }
.tab-panel { padding: 1.5rem; color: var(--text-primary); }
.tab-panel h3 { margin-bottom: 0.75rem; font-size: 1rem; }
.tab-panel p { color: var(--text-secondary); line-height: 1.6; font-size: 0.9rem; }
.details-table { border-collapse: collapse; width: 100%; }
.details-table td { padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--border); font-size: 0.875rem; }
.details-table td:first-child { color: var(--text-muted); width: 40%; }
.code-block {
  background: var(--bg-sidebar); padding: 1rem; border-radius: var(--radius);
  font-size: 0.8rem; color: var(--text-secondary); overflow-x: auto; white-space: pre;
}
.settings-list { display: flex; flex-direction: column; gap: 1rem; }
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
</style>
