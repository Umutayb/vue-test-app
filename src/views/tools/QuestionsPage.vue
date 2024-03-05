<template>
  <div>
    <div class="question-box">
      <h2>Do you like the site?</h2>
      <form>
        <div class="radio-group">
          <span class="radio-button">
            <input type="radio" name="like" value="yes" @change="handleRadioChange">
            <label for="yes"><span>Yes</span></label>
          </span>
          <span class="radio-button">
            <input type="radio" id="impressive" name="like" value="impressive" @change="handleRadioChange">
            <label for="impressive"><span>Impressive</span></label>
          </span>
          <span class="radio-button">
            <input type="radio" id="no" name="like" value="no" disabled>
            <label for="no"><span>No</span></label>
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
      } else if (event.target.value === 'impressive') {
        this.wow = event.target.value;
        this.thanks = '';
      } else {
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
  width: 100px; /* Adjust width */
  justify-content: center;
  width: 100%;
}

h2 {
  margin-bottom: 10px;
}

.radio-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: nowrap; /* Ensure items do not wrap */
}

.radio-button {
  display: flex; /* Use flexbox */
  align-items: center; /* Align items vertically */
  margin-right: 80px; /* Adjust margin as needed */
  flex-shrink: 0; /* Prevent items from shrinking */
}

.radio-button.label-impressive label {
  margin-right: -10px; /* Move Impressive label to the left in Safari */
}

.radio-button label {
  white-space: nowrap; /* Prevent wrapping of label text */
  display: flex; /* Use flexbox */
  align-items: center; /* Align items vertically */
}

input[type="radio"] {
  transform: scale(1);
  margin-right: 5px; /* Adjust spacing between the button and label */
  
}

.radio-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 12px; /* Adjust the gap between items */
}

.radio-button {
  display: flex;
  align-items: center;
}

.radio-button input[type="radio"] {
  margin-right: 5px;
}

.radio-button:last-child {
  margin-right: 70px; /* Adjust margin for the "No" option */
}

</style>