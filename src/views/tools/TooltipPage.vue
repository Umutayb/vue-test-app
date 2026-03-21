<template>
  <div class="page">
    <h1>Tooltip &amp; Popover</h1>
    <p class="page-desc">Hover tooltips and click-triggered popovers</p>

    <section class="demo-section">
      <h2 class="section-title">Tooltips</h2>
      <div class="tooltip-row">
        <div class="tooltip-wrapper">
          <button
            class="btn btn-primary"
            data-testid="tooltip-trigger-1"
            @mouseenter="tooltipVisible[1] = true"
            @mouseleave="tooltipVisible[1] = false"
          >
            Hover me
          </button>
          <div
            v-show="tooltipVisible[1]"
            class="tooltip"
            data-testid="tooltip-content-1"
          >
            This is tooltip one
          </div>
        </div>

        <div class="tooltip-wrapper">
          <button
            class="btn btn-primary"
            data-testid="tooltip-trigger-2"
            @mouseenter="tooltipVisible[2] = true"
            @mouseleave="tooltipVisible[2] = false"
          >
            Hover me too
          </button>
          <div
            v-show="tooltipVisible[2]"
            class="tooltip"
            data-testid="tooltip-content-2"
          >
            This is tooltip two
          </div>
        </div>

        <div class="tooltip-wrapper">
          <button
            class="btn btn-primary"
            data-testid="tooltip-trigger-3"
            @mouseenter="tooltipVisible[3] = true"
            @mouseleave="tooltipVisible[3] = false"
          >
            And me
          </button>
          <div
            v-show="tooltipVisible[3]"
            class="tooltip"
            data-testid="tooltip-content-3"
          >
            This is tooltip three
          </div>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">Popovers</h2>
      <div class="popover-row">
        <div class="popover-wrapper">
          <button
            class="btn btn-secondary"
            data-testid="popover-trigger-1"
            @click.stop="togglePopover(1)"
          >
            Open Popover 1
          </button>
          <div
            v-show="popoverVisible[1]"
            class="popover"
            data-testid="popover-content-1"
          >
            <h3 class="popover-title">Popover One</h3>
            <p class="popover-body">
              This popover provides additional context. Click outside to dismiss it.
            </p>
          </div>
        </div>

        <div class="popover-wrapper">
          <button
            class="btn btn-secondary"
            data-testid="popover-trigger-2"
            @click.stop="togglePopover(2)"
          >
            Open Popover 2
          </button>
          <div
            v-show="popoverVisible[2]"
            class="popover"
            data-testid="popover-content-2"
          >
            <h3 class="popover-title">Popover Two</h3>
            <p class="popover-body">
              This is the second popover. It also closes when you click anywhere outside.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "TooltipPage",
  data() {
    return {
      tooltipVisible: { 1: false, 2: false, 3: false },
      popoverVisible: { 1: false, 2: false },
    };
  },
  methods: {
    togglePopover(id) {
      const next = !this.popoverVisible[id];
      this.popoverVisible = { 1: false, 2: false };
      this.popoverVisible[id] = next;
    },
    _clickHandler() {
      this.popoverVisible = { 1: false, 2: false };
    },
  },
  mounted() {
    document.addEventListener("click", this._clickHandler);
  },
  beforeUnmount() {
    document.removeEventListener("click", this._clickHandler);
  },
};
</script>

<style scoped>
.demo-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
}

.tooltip-row,
.popover-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.tooltip-wrapper,
.popover-wrapper {
  position: relative;
}

.tooltip {
  background: var(--text-primary);
  color: var(--bg-primary);
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  white-space: nowrap;
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: none;
}

.popover {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  min-width: 200px;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.popover-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.popover-body {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.btn {
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background 0.15s;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-secondary {
  background: var(--bg-input);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--bg-sidebar);
}
</style>
