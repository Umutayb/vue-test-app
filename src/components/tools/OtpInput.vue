<template>
  <div class="otp-container">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      type="text"
      inputmode="numeric"
      maxlength="1"
      :value="digit"
      :data-testid="`otp-input-${index}`"
      :ref="el => { inputRefs[index] = el }"
      class="otp-digit"
      :class="{ focused: focusedIndex === index }"
      @input="handleInput(index, $event)"
      @keydown="handleKeydown(index, $event)"
      @paste="handlePaste(index, $event)"
      @focus="focusedIndex = index"
      @blur="focusedIndex = -1"
    />
  </div>
</template>

<script>
export default {
  props: {
    length: { type: Number, default: 6 },
    autocomplete: { type: Boolean, default: false },
    autoSubmit: { type: Boolean, default: false },
  },
  emits: ['update', 'complete'],
  data() {
    return {
      digits: [],
      inputRefs: [],
      focusedIndex: -1,
    };
  },
  watch: {
    length: {
      immediate: true,
      handler(newLen, oldLen) {
        if (!oldLen) {
          this.digits = Array(newLen).fill('');
        } else if (newLen > oldLen) {
          this.digits = [...this.digits, ...Array(newLen - oldLen).fill('')];
        } else {
          this.digits = this.digits.slice(0, newLen);
        }
        this.inputRefs = Array(newLen).fill(null);
      },
    },
  },
  methods: {
    handleInput(index, event) {
      const val = event.target.value.replace(/\D/g, '');
      if (!val) {
        this.digits[index] = '';
        this.$emit('update', this.currentValue());
        return;
      }
      this.digits[index] = val.charAt(0);
      event.target.value = this.digits[index];
      this.$emit('update', this.currentValue());

      if (index < this.length - 1) {
        this.$nextTick(() => {
          this.inputRefs[index + 1]?.focus();
        });
      } else {
        this.checkComplete();
      }
    },
    handleKeydown(index, event) {
      if (event.key === 'Backspace') {
        if (this.digits[index]) {
          this.digits[index] = '';
          event.target.value = '';
          this.$emit('update', this.currentValue());
        } else if (index > 0) {
          this.$nextTick(() => {
            this.inputRefs[index - 1]?.focus();
          });
        }
      } else if (event.key === 'ArrowLeft' && index > 0) {
        this.inputRefs[index - 1]?.focus();
      } else if (event.key === 'ArrowRight' && index < this.length - 1) {
        this.inputRefs[index + 1]?.focus();
      }
    },
    handlePaste(index, event) {
      if (!this.autocomplete) return;
      event.preventDefault();
      const paste = (event.clipboardData || window.clipboardData)
        .getData('text')
        .replace(/\D/g, '');
      if (!paste) return;

      for (let i = 0; i < this.length; i++) {
        this.digits[i] = paste[i] || '';
      }
      this.$emit('update', this.currentValue());

      this.$nextTick(() => {
        const nextEmpty = this.digits.findIndex(d => d === '');
        if (nextEmpty >= 0) {
          this.inputRefs[nextEmpty]?.focus();
        } else {
          this.inputRefs[this.length - 1]?.focus();
          this.checkComplete();
        }
      });
    },
    currentValue() {
      return this.digits.join('');
    },
    checkComplete() {
      if (this.autoSubmit && this.digits.every(d => d !== '')) {
        this.$emit('complete', this.currentValue());
      }
    },
    clear() {
      this.digits = Array(this.length).fill('');
      this.$emit('update', '');
      this.$nextTick(() => {
        this.inputRefs[0]?.focus();
      });
    },
  },
};
</script>

<style scoped>
.otp-container {
  display: flex;
  gap: 8px;
}
.otp-digit {
  width: 44px;
  height: 52px;
  text-align: center;
  font-size: 1.25rem;
  font-family: monospace;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  transition: border-color 0.15s, box-shadow 0.15s;
  padding: 0;
}
.otp-digit:focus,
.otp-digit.focused {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}
</style>
