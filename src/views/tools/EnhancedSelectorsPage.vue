<template>
  <div class="page">
    <!-- Role + Accessible Name Section -->
    <section class="section" data-testid="role-section">
      <h3 class="section-title">Role + Accessible Name</h3>
      <div class="button-group">
        <button role="button" class="btn" @click="roleClickedButton = 'login'" data-qa="role-login">Log in</button>
        <button role="button" class="btn btn-secondary" @click="roleClickedButton = 'signup'">Sign up</button>
        <button role="button" class="btn btn-tertiary" @click="roleClickedButton = 'continue'">Continue</button>
      </div>
      <p class="result" data-testid="role-result" v-if="roleClickedButton">
        Clicked: {{ roleClickedButton }}
      </p>

      <!-- Textbox with label for role+name -->
      <div class="form-group">
        <label for="role-email">Email address</label>
        <input id="role-email" type="email" role="textbox" placeholder="Enter email" class="input" />
      </div>
      <div class="form-group">
        <label for="role-password">Password</label>
        <input id="role-password" type="password" role="textbox" placeholder="Enter password" class="input" />
      </div>

      <!-- Switch for role -->
      <div class="form-group">
        <label>
          <input type="checkbox" role="switch" @change="switchState = $event.target.checked" />
          <span>Enable notifications</span>
        </label>
        <p class="result" data-testid="switch-result">Switch: {{ switchState ? 'ON' : 'OFF' }}</p>
      </div>

      <!-- Radio group -->
      <div role="radiogroup" aria-label="Plan selection">
        <label><input type="radio" name="plan" value="free" v-model="selectedPlan" /> Free</label>
        <label><input type="radio" name="plan" value="pro" v-model="selectedPlan" /> Pro</label>
        <label><input type="radio" name="plan" value="enterprise" v-model="selectedPlan" /> Enterprise</label>
      </div>
      <p class="result" data-testid="plan-result" v-if="selectedPlan">Plan: {{ selectedPlan }}</p>
    </section>

    <!-- Regex Text Matching Section -->
    <section class="section" data-testid="regex-section">
      <h3 class="section-title">Regex Text Matching</h3>
      <div class="alerts">
        <div class="alert alert-warning" data-testid="dynamic-alert">
          Just Eat Pay cannot be used with cash payments
        </div>
        <div class="alert alert-info" data-testid="locale-alert">
          Iniciar sesion para continuar
        </div>
        <div class="alert alert-success" data-testid="version-alert">
          Version 3.2.1 - Build 2026.04.15 released successfully
        </div>
      </div>
      <p class="price" data-testid="price-display">Total: $42.99 (incl. tax)</p>
    </section>

    <!-- Force Click Section -->
    <section class="section" data-testid="force-click-section">
      <h3 class="section-title">Force Click (Pointer Interception)</h3>
      <div class="intercepted-wrapper" data-testid="intercepted-wrapper">
        <div class="interceptor-overlay"></div>
        <button
          class="btn intercepted-button"
          data-testid="intercepted-button"
          @click="forceClicked = true"
        >
          Click me (intercepted)
        </button>
      </div>
      <p class="result" data-testid="force-click-result" v-if="forceClicked">
        Force click successful!
      </p>

      <!-- Toggle switch wrapped in intercepting div -->
      <div class="switch-wrapper" data-testid="switch-wrapper">
        <div class="switch-interceptor"></div>
        <label class="toggle">
          <input
            type="checkbox"
            data-testid="intercepted-toggle"
            @change="toggleState = $event.target.checked"
          />
          <span class="toggle-slider"></span>
        </label>
      </div>
      <p class="result" data-testid="toggle-result">Toggle: {{ toggleState ? 'ON' : 'OFF' }}</p>
    </section>

    <!-- Visibility Probe Section -->
    <section class="section" data-testid="visibility-section">
      <h3 class="section-title">Visibility Probe</h3>
      <button class="btn" @click="showBanner = !showBanner" data-testid="toggle-banner-btn">
        Toggle Banner
      </button>
      <div v-if="showBanner" class="banner" data-testid="promo-banner">
        Special offer: 50% off all items!
      </div>
      <div class="hidden-element" data-testid="always-hidden" style="display: none;">
        You should never see this
      </div>
      <div class="delayed-element" v-if="showDelayed" data-testid="delayed-element">
        I appeared after a delay!
      </div>
      <button class="btn btn-secondary" @click="triggerDelayed" data-testid="trigger-delayed-btn">
        Show Delayed Element
      </button>
    </section>

    <!-- Iframe Section -->
    <section class="section" data-testid="iframe-section">
      <h3 class="section-title">Iframe Content</h3>
      <iframe
        data-testid="simple-iframe"
        title="Simple Test Frame"
        :srcdoc="iframeContent"
        class="test-iframe"
      ></iframe>
      <iframe
        data-testid="card-iframe"
        title="Card Number Frame"
        :srcdoc="cardIframeContent"
        class="test-iframe"
      ></iframe>
    </section>
  </div>
</template>

<script>
export default {
  name: 'EnhancedSelectorsPage',
  data() {
    return {
      roleClickedButton: '',
      switchState: false,
      selectedPlan: '',
      forceClicked: false,
      toggleState: false,
      showBanner: true,
      showDelayed: false,
      iframeContent: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: sans-serif; padding: 16px;">
          <h4 id="iframe-title">Inside the iframe</h4>
          <button id="iframe-button" onclick="document.getElementById('iframe-result').textContent='Clicked!'">
            Click inside frame
          </button>
          <p id="iframe-result"></p>
          <input id="iframe-input" type="text" placeholder="Type in frame" />
        </body>
        </html>
      `,
      cardIframeContent: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: sans-serif; padding: 16px;">
          <label for="card-number">Card number</label>
          <input id="card-number" type="text" placeholder="1234 5678 9012 3456" data-testid="card-input" />
          <label for="card-expiry">Expiry</label>
          <input id="card-expiry" type="text" placeholder="MM/YY" data-testid="expiry-input" />
        </body>
        </html>
      `,
    };
  },
  methods: {
    triggerDelayed() {
      setTimeout(() => {
        this.showDelayed = true;
      }, 1500);
    },
  },
};
</script>

<style scoped>
.section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.section-title {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #2d3748;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid #4a90d9;
  background: #4a90d9;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background: #718096;
  border-color: #718096;
}

.btn-tertiary {
  background: #48bb78;
  border-color: #48bb78;
}

.result {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f7fafc;
  border-radius: 4px;
  font-family: monospace;
}

.form-group {
  margin-bottom: 1rem;
}

.input {
  display: block;
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  margin-top: 0.25rem;
}

.alerts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 4px;
}

.alert-warning { background: #fefcbf; color: #744210; }
.alert-info { background: #bee3f8; color: #2a4365; }
.alert-success { background: #c6f6d5; color: #22543d; }

.price {
  font-size: 1.25rem;
  font-weight: bold;
}

/* Force click: parent div intercepts pointer events */
.intercepted-wrapper {
  position: relative;
  display: inline-block;
}

.interceptor-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  /* This overlay intercepts all clicks */
}

.intercepted-button {
  position: relative;
  z-index: 0;
}

/* Switch wrapper with interception */
.switch-wrapper {
  position: relative;
  display: inline-block;
  margin-top: 1rem;
}

.switch-interceptor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.toggle-slider {
  width: 40px;
  height: 22px;
  background: #cbd5e0;
  border-radius: 11px;
  margin-left: 8px;
  transition: background 0.2s;
}

.toggle input:checked + .toggle-slider {
  background: #4a90d9;
}

.banner {
  margin-top: 1rem;
  padding: 1rem;
  background: #fbd38d;
  border-radius: 4px;
  font-weight: bold;
}

.hidden-element {
  display: none;
}

.delayed-element {
  margin-top: 1rem;
  padding: 1rem;
  background: #c6f6d5;
  border-radius: 4px;
}

.test-iframe {
  width: 100%;
  max-width: 400px;
  height: 150px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
