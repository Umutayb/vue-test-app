<template>
  <div>
    <h2>Alerts, Frame & Windows</h2>
    <a>Welcome to Alerts, Frame & Windows!</a>

    <div class="clickables">
      <h4>Alerts</h4>
      <div class="button-group">
        <button class="button" id="click-me" @click="handleClick">Click Me</button>
        <button class="button" id="right-click-me" @contextmenu.prevent="handleRightClick">Right Click Me</button>
        <button class="button" id="double-click-me" @dblclick="handleDoubleClick">Double Click Me</button>
      </div>
    </div>

    <div id="tabs" class="clickables">
      <h4>Windows</h4>
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
      // Open a new tab
      window.open("https://example.com", "_blank");
    },
    newWindow() {
      // Open a new window
      window.open("https://example.com", "_blank", "width=600,height=400");
    },
    newWindowMessage() {
      // Open a new window with a message
      alert('New window message!');
      window.open("https://example.com", "_blank");
    }
  }
}
</script>

<style>
/* Clickables section styles */
.clickables {
  border: 1px solid black; /* Increase border width */
  display: flex;
  justify-content: center;
  align-items: center; /* Center align items vertically */
  width: 100%;
  margin-top: 20px;
  padding: 10px;
}

.button-group {
  display: flex;
  justify-content: center;
  width: 100%;
}

.button {
  padding: 4px 16px; /* Decrease button padding */
  border: none;
  border-radius: 3px; /* Adjust border radius */
  cursor: pointer;
  margin: 0 6px; /* Decrease margin */
  text-align: center;
  background-color: lightblue; /* Apply the same background color */
  height: 30px; /* Set a fixed height for the buttons */
}

</style>
