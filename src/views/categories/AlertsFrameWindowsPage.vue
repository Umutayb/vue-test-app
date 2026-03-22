<template>
  <div>
    <h2>Alerts, Frame & Windows</h2>
    <a>Welcome to Alerts, Frame & Windows!</a>

    <div class="clickables">
      <h3>Alerts</h3>
      <div class="button-group">
        <button class="button" id="click-me" @click="handleClick">Click Me</button>
        <button class="button" id="right-click-me" @contextmenu.prevent="handleRightClick">Right Click Me</button>
        <button class="button" id="double-click-me" @dblclick="handleDoubleClick">Double Click Me</button>
      </div>
    </div>

    <div id="tabs" class="clickables">
      <h3>Windows & Tabs</h3>
      <div class="button-group">
        <button class="button" @click="newTab">New Tab</button>
        <button class="button" @click="newWindow">New Window</button>
        <button class="button" @click="newWindowMessage">New Window Message</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleDoubleClick() {
      alert('Double click!');
    },
    handleRightClick() {
      alert('Right click!');
    },
    handleClick() {
      alert('Single click!');
    },
    newTab() {
      // Opens a new tab at the base URL of the current environment
      window.open("/", "_blank");
    },
    newWindow() {
      // Opens a new window at the base URL
      window.open("/", "_blank", "width=600,height=400");
    },
    newWindowMessage() {
      // Opens a new window at the base URL with a message
      alert('New window message!');
      window.open("/", "_blank");
    }
  }
}
</script>

<style>
.clickables {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1.25rem;
  padding: 0.625rem;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.button {
  padding: 0.375rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  text-align: center;
  background-color: var(--accent-light);
  color: var(--accent);
  height: 2.25rem;
  font-size: 0.875rem;
  transition: background-color 0.15s;
}

.button:hover {
  background-color: var(--accent);
  color: #ffffff;
}
</style>
