<template>
  <div class="page">
    <h1>Loading States</h1>
    <p class="page-desc">Spinner, skeleton, progress bar, and button loading states</p>

    <section class="section">
      <h2>Spinner</h2>
      <div class="spinner" data-testid="loading-spinner"></div>
    </section>

    <section class="section">
      <h2>Skeleton Screen</h2>
      <button class="toggle-btn" data-testid="loading-skeleton-toggle" @click="showSkeleton = !showSkeleton">
        {{ showSkeleton ? 'Hide Skeleton' : 'Show Skeleton' }}
      </button>
      <div v-show="showSkeleton" data-testid="loading-skeleton" class="skeleton-lines">
        <div class="skeleton-line line-full"></div>
        <div class="skeleton-line line-three-quarters"></div>
        <div class="skeleton-line line-half"></div>
      </div>
    </section>

    <section class="section">
      <h2>Skeleton Card</h2>
      <div class="skeleton-card" data-testid="loading-skeleton-card">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-card-lines">
          <div class="skeleton-line line-full"></div>
          <div class="skeleton-line line-three-quarters"></div>
          <div class="skeleton-line line-half"></div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Progress Bar</h2>
      <div class="bar-track" data-testid="loading-bar">
        <div class="bar-fill"></div>
      </div>
    </section>

    <section class="section">
      <h2>Button Loading State</h2>
      <button
        class="loading-btn"
        data-testid="loading-btn"
        @click="clickBtn"
        :disabled="btnLoading"
      >
        <span v-if="btnLoading" class="btn-spinner"></span>
        {{ btnLoading ? 'Loading...' : 'Click Me' }}
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSkeleton: true,
      btnLoading: false,
    }
  },
  methods: {
    clickBtn() {
      if (this.btnLoading) return;
      this.btnLoading = true;
      setTimeout(() => { this.btnLoading = false; }, 2000);
    }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem; }

/* Spinner */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Skeleton toggle button */
.toggle-btn {
  padding: 0.4rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.875rem;
  background: var(--bg-input);
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}
.toggle-btn:hover { background: var(--border); }

/* Skeleton lines */
.skeleton-lines { display: flex; flex-direction: column; gap: 0.6rem; }
.skeleton-line {
  height: 14px;
  background: var(--border);
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}
.line-full { width: 100%; }
.line-three-quarters { width: 75%; }
.line-half { width: 50%; }

/* Skeleton card */
.skeleton-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
}
.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--border);
  flex-shrink: 0;
  animation: pulse 1.5s ease-in-out infinite;
}
.skeleton-card-lines { flex: 1; display: flex; flex-direction: column; gap: 0.6rem; padding-top: 0.25rem; }

/* Progress bar */
.bar-track {
  overflow: hidden;
  height: 3px;
  background: var(--border);
  border-radius: 2px;
}
.bar-fill {
  height: 100%;
  width: 100%;
  background: var(--accent);
  animation: slide 1.5s ease-in-out infinite;
}

/* Button loading state */
.loading-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.875rem;
}
.loading-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.loading-btn:not(:disabled):hover { background: var(--accent-hover); }
.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

/* Animations */
@keyframes spin { to { transform: rotate(360deg) } }
@keyframes pulse { 0%, 100% { opacity: 0.4 } 50% { opacity: 1 } }
@keyframes slide { 0% { transform: translateX(-100%) } 100% { transform: translateX(100%) } }
</style>
