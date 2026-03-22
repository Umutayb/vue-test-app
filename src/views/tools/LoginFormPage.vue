<template>
  <div class="page">
    <h1>Login Form</h1>
    <p class="page-desc">Form with client-side validation and simulated authentication</p>

    <div class="form-card">
      <div v-if="loginSuccess" class="success-msg" data-testid="login-success">
        ✓ Login successful! Welcome, {{ username }}.
      </div>

      <form v-else @submit.prevent="onSubmit" class="login-form">
        <div class="field">
          <label for="login-username-input">Username</label>
          <input
            id="login-username-input"
            type="text"
            class="input"
            :class="{ 'input-error': usernameError }"
            data-testid="login-username"
            v-model="username"
          />
          <p v-if="usernameError" class="field-error" data-testid="login-username-error">{{ usernameError }}</p>
        </div>

        <div class="field">
          <label for="login-password-input">Password</label>
          <div class="password-row">
            <input
              id="login-password-input"
              :type="passwordType"
              class="input"
              :class="{ 'input-error': passwordError }"
              data-testid="login-password"
              v-model="password"
            />
            <button type="button" class="show-btn" data-testid="login-show-password" @click="togglePassword">
              {{ passwordType === 'password' ? 'Show' : 'Hide' }}
            </button>
          </div>
          <p v-if="passwordError" class="field-error" data-testid="login-password-error">{{ passwordError }}</p>
        </div>

        <p v-if="loginError" class="login-error" data-testid="login-error">{{ loginError }}</p>

        <button type="submit" class="submit-btn" data-testid="login-submit" :disabled="isLoading">
          <span v-show="isLoading" data-testid="login-loading">Signing in...</span>
          <span v-show="!isLoading">Sign In</span>
        </button>

        <p class="hint">Hint: admin / password123</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordType: 'password',
      usernameError: '',
      passwordError: '',
      loginError: '',
      isLoading: false,
      loginSuccess: false,
    };
  },
  beforeUnmount() {
    if (this._loginTimer) clearTimeout(this._loginTimer);
  },
  methods: {
    togglePassword() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    },
    onSubmit() {
      this.usernameError = '';
      this.passwordError = '';
      this.loginError = '';
      let valid = true;
      if (!this.username) { this.usernameError = 'Username is required'; valid = false; }
      if (!this.password) { this.passwordError = 'Password is required'; valid = false; }
      else if (this.password.length < 6) { this.passwordError = 'Password must be at least 6 characters'; valid = false; }
      if (!valid) return;
      this.isLoading = true;
      this._loginTimer = setTimeout(() => {
        this.isLoading = false;
        if (this.username === 'admin' && this.password === 'password123') {
          this.loginSuccess = true;
        } else {
          this.loginError = 'Invalid username or password';
        }
      }, 1500);
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.form-card { background: var(--bg-sidebar); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; max-width: 400px; box-sizing: border-box; overflow: hidden; }
.login-form { display: flex; flex-direction: column; gap: 1.25rem; }
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }
.input { padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem; width: 100%; box-sizing: border-box; }
.input-error { border-color: #ef4444; }
.password-row { display: flex; gap: 0.5rem; }
.password-row .input { flex: 1; min-width: 0; }
.show-btn { padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-secondary); cursor: pointer; font-size: 0.8rem; white-space: nowrap; }
.field-error { font-size: 0.8rem; color: #ef4444; }
.login-error { font-size: 0.875rem; color: #ef4444; text-align: center; }
.submit-btn { width: 100%; padding: 0.6rem; background: var(--accent); color: #fff; border: none; border-radius: var(--radius); font-size: 0.9rem; font-weight: 600; cursor: pointer; box-sizing: border-box; }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.submit-btn:hover:not(:disabled) { background: var(--accent-hover); }
.success-msg { color: #22c55e; font-weight: 600; text-align: center; padding: 1rem; }
.hint { font-size: 0.75rem; color: var(--text-muted); text-align: center; }
@media (max-width: 767px) {
  .page { padding: 1rem; }
  .form-card { padding: 1.25rem; max-width: 100%; box-sizing: border-box; }
  .input { font-size: 1rem; }
  .password-row { flex-wrap: wrap; }
  .password-row .input { min-width: 0; }
}
</style>
