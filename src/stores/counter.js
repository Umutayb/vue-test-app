import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    step: 1,
    history: [],
  }),
  actions: {
    increment() {
      this.count += this.step;
      this._log(`+${this.step}`);
    },
    decrement() {
      this.count -= this.step;
      this._log(`-${this.step}`);
    },
    reset() {
      this.count = 0;
      this._log('Reset');
    },
    setStep(n) {
      this.step = Math.max(1, parseInt(n, 10) || 1);
    },
    _log(op) {
      this.history.unshift(`${op} → ${this.count}`);
      if (this.history.length > 5) this.history.pop();
    },
  },
});
