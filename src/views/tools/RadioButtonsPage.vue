<template>
  <div>
    <div class="question-box">
      <h2>Do you like the site?</h2>
      <form>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="like" id="yes" value="yes" @change="handleRadioChange" />
            <span>Yes</span>
          </label>
          <label class="radio-label">
            <input type="radio" name="like" id="impressive" value="impressive" @change="handleRadioChange" />
            <span>Impressive</span>
          </label>
          <label class="radio-label radio-label--disabled">
            <input type="radio" name="like" id="no" value="no" disabled />
            <span>No</span>
          </label>
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
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.radio-label--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type="radio"] {
  margin: 0;
  accent-color: var(--accent);
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  flex-shrink: 0;
}

.radio-label--disabled input[type="radio"] {
  cursor: not-allowed;
}
</style>