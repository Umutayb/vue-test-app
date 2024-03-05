<template>
  <div>
    <h2>Sortable Page</h2>
    <a>Gota sort'em all!</a>
    <div
      class="drop-zone"
      @drop="onDrop($event, 1)"
      @dragover.prevent
      @dragenter.prevent
    >
      <p class="bold-title">First List</p>
      <div
        class="drag-el"
        v-for="item in getList(1)"
        :key="item.title"
        draggable="true"
        @dragstart="startDrag($event, item)"
      >
        {{ item.title }}
      </div>
    </div>
    <div
      class="drop-zone"
      @drop="onDrop($event, 2)"
      @dragover.prevent
      @dragenter.prevent
    >
      <p class="bold-title">Second List</p>
      <div
        class="drag-el"
        v-for="item in getList(2)"
        :key="item.title"
        draggable="true"
        @dragstart="startDrag($event, item)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 0,
          title: 'Item A',
          list: 1,
        },
        {
          id: 1,
          title: 'Item B',
          list: 1,
        },
        {
          id: 2,
          title: 'Item C',
          list: 2,
        },
      ],
      isDark: true
    };
  },
  created (){
      this.emitter.on('isDark', (evt) => {
        this.isDark = evt.isDark;
      })
  },
  methods: {
    getList(list) {
      return this.items.filter((item) => item.list === list);
    },
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemID', item.id);
    },
    onDrop(event, newList) {
      const itemID = event.dataTransfer.getData('itemID');
      const draggedItem = this.items.find((item) => item.id == itemID);

      // Remove the item from the old list
      const oldListIndex = this.items.findIndex((item) => item.id == itemID);
      this.items.splice(oldListIndex, 1);

      // Find the index to insert the item into the new list
      const newListIndex = this.items.findIndex((item) => item.list === newList);

      // Determine if the item is moved up or down within the same list
      const isMoveUp = oldListIndex > newListIndex;

      // Insert the item into the new list at the correct index
      this.items.splice(
        isMoveUp ? newListIndex : newListIndex + 1,
        0,
        { ...draggedItem, list: newList }
      );
    },
  }
};
</script>

<style>

.drop-zone {
  width: 50%;
  margin: 50px auto;
  background-color: #ecf0f1;
  min-height: 10px;
  margin-bottom: 10px;
  padding: 10px;
}

.dark .drop-zone {
  background-color: #333; /* Change the background color of drop-zone in dark mode */
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}

.dark .drag-el {
  background-color: #444; /* Change the background color of drag-el in dark mode */
  color: #fff; /* Change the text color of drag-el in dark mode */
}
</style>
