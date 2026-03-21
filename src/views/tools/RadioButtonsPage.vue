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
.question-box {
  padding: 0.625rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  width: 100%;
}

.radio-group {
  display: grid;
  align-items: center;
  margin-bottom: 0.625rem;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 1rem;
}

.radio-button {
  display: flex;
  align-items: center;
}

.radio-button label {
  white-space: nowrap;
  display: flex;
  align-items: center;
  color: var(--text-primary);
}

input[type="radio"] {
  transform: scale(1);
  margin-right: 0.3125rem;
  accent-color: var(--accent);
}
</style>