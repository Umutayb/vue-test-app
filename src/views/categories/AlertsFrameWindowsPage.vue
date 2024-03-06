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
      // Open a new tab
      window.open("http://127.0.0.1:8080/", "_blank");
    },
    newWindow() {
      // Open a new window
      window.open("http://127.0.0.1:8080/", "_blank", "width=600,height=400");
    },
    newWindowMessage() {
      // Open a new window with a message
      alert('New window message!');
      window.open("http://127.0.0.1:8080/", "_blank");
    }
  }
}
</script>

<style>
/* Clickables section styles */
.clickables {
  display: flex;
  flex-direction: column; /* Align items in a column */
  justify-content: center;
  align-items: center; /* Center align items horizontally */
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
