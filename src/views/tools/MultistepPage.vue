<template>
  <div class="page">
    <h1>Multi-step Form</h1>
    <p class="page-desc">Three-step wizard with per-step validation</p>

    <div class="step-indicators">
      <div
        v-for="n in 3"
        :key="n"
        class="step-indicator"
        :class="{ 'step-active': currentStep === n, 'step-done': currentStep > n }"
        :data-testid="`multistep-step-${n}`"
      >
        <span class="step-circle">{{ currentStep > n ? '✓' : n }}</span>
        <span class="step-label">{{ ['Personal', 'Contact', 'Message'][n - 1] }}</span>
      </div>
    </div>
    <p class="current-step-text" data-testid="multistep-current-step">Step {{ currentStep }} of 3</p>

    <div v-if="currentStep === 1" class="step-form">
      <div class="field">
        <label>First Name</label>
        <input type="text" class="input" data-testid="multistep-first-name" v-model="form.firstName" />
        <p v-if="errors.firstName" class="field-error" data-testid="multistep-first-name-error">{{ errors.firstName }}</p>
      </div>
      <div class="field">
        <label>Last Name</label>
        <input type="text" class="input" data-testid="multistep-last-name" v-model="form.lastName" />
        <p v-if="errors.lastName" class="field-error" data-testid="multistep-last-name-error">{{ errors.lastName }}</p>
      </div>
    </div>

    <div v-if="currentStep === 2" class="step-form">
      <div class="field">
        <label>Email</label>
        <input type="email" class="input" data-testid="multistep-email" v-model="form.email" />
        <p v-if="errors.email" class="field-error" data-testid="multistep-email-error">{{ errors.email }}</p>
      </div>
      <div class="field">
        <label>Phone <span class="optional">(optional)</span></label>
        <input type="tel" class="input" data-testid="multistep-phone" v-model="form.phone" />
      </div>
    </div>

    <div v-if="currentStep === 3" class="step-form">
      <div class="field">
        <label>Message</label>
        <textarea class="input textarea" data-testid="multistep-message" v-model="form.message" rows="4"></textarea>
        <p v-if="errors.message" class="field-error" data-testid="multistep-message-error">{{ errors.message }}</p>
      </div>
    </div>

    <div class="nav-btns">
      <button v-if="currentStep > 1" class="btn btn-secondary" data-testid="multistep-back" @click="back">Back</button>
      <button v-if="currentStep < 3" class="btn btn-primary" data-testid="multistep-next" @click="next">Next</button>
      <button v-if="currentStep === 3" class="btn btn-primary" data-testid="multistep-submit" @click="submit">Submit</button>
    </div>

    <div v-if="submitted" class="result" data-testid="multistep-result">
      <h2>Submitted!</h2>
      <div v-for="(val, key) in form" :key="key" class="result-row" v-show="val">
        <strong>{{ key }}:</strong> {{ val }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      submitted: false,
      errors: {},
      form: { firstName: '', lastName: '', email: '', phone: '', message: '' },
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (this.currentStep === 1) {
        if (!this.form.firstName) this.errors.firstName = 'First name is required';
        if (!this.form.lastName) this.errors.lastName = 'Last name is required';
      } else if (this.currentStep === 2) {
        if (!this.form.email) this.errors.email = 'Email is required';
        else if (!this.form.email.includes('@')) this.errors.email = 'Enter a valid email';
      } else if (this.currentStep === 3) {
        if (!this.form.message) this.errors.message = 'Message is required';
      }
      return Object.keys(this.errors).length === 0;
    },
    next() { if (this.validate()) this.currentStep++; },
    back() { this.currentStep--; this.errors = {}; },
    submit() { if (this.validate()) this.submitted = true; },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.step-indicators { display: flex; margin-bottom: 0.75rem; }
.step-indicator { display: flex; align-items: center; gap: 0.5rem; flex: 1; }
.step-indicator:not(:last-child)::after { content: ''; flex: 1; height: 2px; background: var(--border); margin: 0 0.5rem; }
.step-circle { width: 28px; height: 28px; border-radius: 50%; background: var(--border); color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; }
.step-active .step-circle { background: var(--accent); color: #fff; }
.step-done .step-circle { background: var(--accent); color: #fff; }
.step-label { font-size: 0.75rem; color: var(--text-muted); }
.step-active .step-label { color: var(--accent); font-weight: 600; }
.current-step-text { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.5rem; }
.step-form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }
.optional { font-weight: 400; color: var(--text-muted); font-size: 0.8rem; }
.input { padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem; }
.textarea { resize: vertical; }
.field-error { font-size: 0.8rem; color: #ef4444; }
.nav-btns { display: flex; gap: 0.75rem; }
.btn { padding: 0.5rem 1.25rem; border-radius: var(--radius); font-size: 0.9rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { background: var(--bg-input); color: var(--text-primary); border-color: var(--border); }
.result { margin-top: 2rem; padding: 1.5rem; background: var(--bg-sidebar); border: 1px solid var(--border); border-radius: var(--radius); }
.result h2 { color: #22c55e; margin-bottom: 1rem; }
.result-row { font-size: 0.875rem; color: var(--text-secondary); padding: 0.3rem 0; border-bottom: 1px solid var(--border); }
.result-row strong { color: var(--text-primary); }
</style>
