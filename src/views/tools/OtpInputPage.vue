<template>
  <div class="page">
    <h1>OTP Input</h1>
    <p class="page-desc">One-time password style digit inputs</p>

    <section class="otp-section" data-testid="otp-section-autocomplete">
      <div class="section-header">
        <div>
          <h2>With Autocomplete & Submit</h2>
          <p class="section-desc">Paste distributes digits across fields. Emits event when all filled.</p>
        </div>
        <div class="generated-code generated-code--purple" data-testid="otp-generated-code-autocomplete">
          <div class="generated-code__label">Your Code</div>
          <div class="generated-code__value">{{ generatedCode1 }}</div>
          <div class="generated-code__refresh">
            <span class="refresh-dot"></span>
            Refreshes in {{ timeLeft }}s
          </div>
        </div>
      </div>
      <div class="otp-controls">
        <OtpInput
          ref="otpAutocomplete"
          :length="digitCount1"
          :autocomplete="true"
          :autoSubmit="true"
          @update="value1 = $event"
          @complete="handleComplete"
        />
        <div class="digit-adjuster">
          <button @click="addDigit(1)" data-testid="otp-add-digit-autocomplete" class="adj-btn">+</button>
          <button @click="removeDigit(1)" data-testid="otp-remove-digit-autocomplete" class="adj-btn">−</button>
        </div>
        <span class="digit-count" data-testid="otp-digit-count-autocomplete">{{ digitCount1 }} digits</span>
      </div>
      <div class="feature-tags tags--green">
        <span>✓ Paste to auto-fill</span>
        <span>✓ Auto-submit on complete</span>
      </div>
      <div
        v-if="completeMessage"
        class="complete-message"
        data-testid="otp-complete-message"
      >
        {{ completeMessage }}
      </div>
    </section>

    <hr class="divider" />

    <section class="otp-section" data-testid="otp-section-basic">
      <div class="section-header">
        <div>
          <h2>Basic (Manual Submit)</h2>
          <p class="section-desc">Manual digit entry only. No paste distribution or auto-submit.</p>
        </div>
        <div class="generated-code generated-code--amber" data-testid="otp-generated-code-basic">
          <div class="generated-code__label">Your Code</div>
          <div class="generated-code__value">{{ generatedCode2 }}</div>
          <div class="generated-code__refresh">
            <span class="refresh-dot"></span>
            Refreshes in {{ timeLeft }}s
          </div>
        </div>
      </div>
      <div class="otp-controls">
        <OtpInput
          ref="otpBasic"
          :length="digitCount2"
          :autocomplete="false"
          :autoSubmit="false"
          @update="value2 = $event"
        />
        <div class="digit-adjuster">
          <button @click="addDigit(2)" data-testid="otp-add-digit-basic" class="adj-btn">+</button>
          <button @click="removeDigit(2)" data-testid="otp-remove-digit-basic" class="adj-btn">−</button>
        </div>
        <span class="digit-count" data-testid="otp-digit-count-basic">{{ digitCount2 }} digits</span>
      </div>
      <div class="feature-tags tags--red">
        <span>✗ No paste auto-fill</span>
        <span>✗ No auto-submit</span>
      </div>
      
      <div class="action-row">
        <button class="submit-btn submit-btn--amber" @click="handleManualSubmit">Submit Code</button>
      </div>
      
      <div
        v-if="completeMessage2"
        class="complete-message"
        data-testid="otp-complete-message-basic"
      >
        {{ completeMessage2 }}
      </div>
    </section>
  </div>
</template>

<script>
import OtpInput from '@/components/tools/OtpInput.vue';

export default {
  components: { OtpInput },
  data() {
    return {
      digitCount1: 6,
      digitCount2: 4,
      value1: '',
      value2: '',
      generatedCode1: '',
      generatedCode2: '',
      completeMessage: '',
      completeMessage2: '',
      refreshTimer: null,
      timeLeft: 30,
    };
  },
  mounted() {
    this.generateCode(1);
    this.generateCode(2);
    // Dynamic timer running every 1 second
    this.refreshTimer = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
      } else {
        this.generateCode(1);
        this.generateCode(2);
        this.timeLeft = 30; // Reset counter
      }
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.refreshTimer);
  },
  methods: {
    generateCode(section) {
      const len = section === 1 ? this.digitCount1 : this.digitCount2;
      let code = '';
      for (let i = 0; i < len; i++) {
        code += Math.floor(Math.random() * 10).toString();
      }
      if (section === 1) {
        this.generatedCode1 = code;
      } else {
        this.generatedCode2 = code;
      }
    },
    addDigit(section) {
      if (section === 1 && this.digitCount1 < 10) {
        this.digitCount1++;
        this.generateCode(1);
        this.completeMessage = '';
      } else if (section === 2 && this.digitCount2 < 10) {
        this.digitCount2++;
        this.generateCode(2);
        this.completeMessage2 = '';
      }
    },
    removeDigit(section) {
      if (section === 1 && this.digitCount1 > 2) {
        this.digitCount1--;
        this.generateCode(1);
        this.completeMessage = '';
      } else if (section === 2 && this.digitCount2 > 2) {
        this.digitCount2--;
        this.generateCode(2);
        this.completeMessage2 = '';
      }
    },
    handleComplete(code) {
      if (code === this.generatedCode1) {
        this.completeMessage = '✓ Code verified successfully!';
      } else {
        this.completeMessage = '✗ Incorrect code. Try again.';
      }
    },
    handleManualSubmit() {
      if (this.value2 === this.generatedCode2) {
        this.completeMessage2 = '✓ Code verified successfully!';
      } else {
        this.completeMessage2 = '✗ Incorrect code. Try again.';
      }
    }
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 900px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }

.otp-section { margin-bottom: 2rem; }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}
.section-header h2 { margin: 0 0 0.25rem 0; font-size: 1.1rem; }
.section-desc { margin: 0; color: var(--text-secondary); font-size: 0.85rem; }

/* Generated code card */
.generated-code {
  text-align: center;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  flex-shrink: 0;
  min-width: 120px;
}
.generated-code--purple {
  background: linear-gradient(135deg, var(--otp-purple-bg1, #eef2ff), var(--otp-purple-bg2, #e0e7ff));
  border: 1px solid var(--otp-purple-border, #c7d2fe);
}
.generated-code--amber {
  background: linear-gradient(135deg, var(--otp-amber-bg1, #fef3c7), var(--otp-amber-bg2, #fde68a));
  border: 1px solid var(--otp-amber-border, #fbbf24);
}
.generated-code__label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  margin-bottom: 0.2rem;
}
.generated-code__value {
  font-family: monospace;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 4px;
  color: var(--text-primary);
}
.generated-code__refresh {
  font-size: 0.65rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.refresh-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* Controls row */
.otp-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 0.75rem;
}
.digit-adjuster {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.adj-btn {
  width: 30px;
  height: 22px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg-sidebar);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.adj-btn:hover { background: var(--bg-hover); }
.digit-count { font-size: 0.8rem; color: var(--text-secondary); }

/* Feature tags */
.feature-tags {
  display: inline-flex;
  gap: 0.75rem;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
}
.tags--green { background: var(--otp-tag-green-bg, #f0fdf4); color: var(--otp-tag-green-text, #166534); }
.tags--red { background: var(--otp-tag-red-bg, #fef2f2); color: var(--otp-tag-red-text, #991b1b); }

/* Buttons & Actions */
.action-row {
  margin-top: 1rem;
}
.submit-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  border: none;
}
.submit-btn:active {
  transform: translateY(1px);
}
.submit-btn--amber {
  background: var(--otp-amber-border, #fbbf24);
  color: #78350f; /* High contrast dark amber/brown */
}
.submit-btn--amber:hover {
  opacity: 0.85;
}

/* Complete message */
.complete-message {
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  background: var(--bg-sidebar);
  color: var(--text-primary);
}

/* Divider */
.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2rem 0;
}

@media (max-width: 600px) {
  .section-header { flex-direction: column; }
}
</style>
