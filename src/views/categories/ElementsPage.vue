<template>
  <div>
    <h2>Elements Page</h2>
    <a>Welcome to the Elements Page!</a>

    <div class="question-box">
      <h2>Do you like the site?</h2>
      <form>
        <div class="radio-group">
          <span class="radio-button">
            <input type="radio" id="yes" name="like" value="yes" @change="handleRadioChange">
            <label for="yes">Yes</label>
          </span>
          <span class="radio-button">
            <input type="radio" id="impressive" name="like" value="impressive" @change="handleRadioChange">
            <label for="impressive">Impressive</label>
          </span>
          <span class="radio-button">
            <input type="radio" id="no" name="like" value="no" disabled>
            <label for="no">No</label>
          </span>
        </div>
        <p v-if="thanks">Thanks!</p>
        <p v-if="wow">Isn't it!</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thanks: '',
      wow: ''
    };
  },
  methods: {
    handleRadioChange(event) {
      console.log(event.target.value); // Log the value for debugging
      if (event.target.value === 'yes') {
        this.thanks = event.target.value;
        this.wow = '';
      } 
      else if (event.target.value === 'impressive') {
        this.wow = event.target.value;
        this.thanks = '';
      } 
      else {
        this.thanks = '';
        this.wow = '';
      }
    },
    handleDoubleClick() {
      alert('Double click!');
    },
    handleRightClick() {
      alert('Right click!');
    },
    handleClick() {
      alert('Single click!');
    }
  }
}
</script>

<style>
/* Radio buttons section styles */
.question-box {
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px; /* Adjust width */
    justify-content: center;
    width: 100%;
  padding: 10px;
}

h2 {
  margin-bottom: 10px;
}

.radio-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.radio-group {
  display: flex; /* Use flexbox */
  flex-wrap: nowrap; /* Prevent wrapping */
}

.radio-button {
  display: flex; /* Use flexbox */
  align-items: center; /* Align items vertically */
  margin-right: 56px; /* Adjust margin as needed */
}

.radio-button label {
  margin-left: 5px; /* Add margin between radio button and label */
}

input[type="radio"] {
  transform: scale(1);
}
</style>
