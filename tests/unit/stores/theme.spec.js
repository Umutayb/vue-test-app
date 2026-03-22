import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { useThemeStore } from '@/stores/theme';

describe('theme store', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');

    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
    })));

    setActivePinia(createPinia());
  });

  it('defaults to light mode when no preference stored', () => {
    const store = useThemeStore();
    expect(store.isDark).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles dark mode', () => {
    const store = useThemeStore();
    store.toggleDark();
    expect(store.isDark).toBe(true);
    store.toggleDark();
    expect(store.isDark).toBe(false);
  });

  it('persists theme to localStorage on toggle', async () => {
    const store = useThemeStore();
    store.toggleDark();
    await nextTick();
    expect(localStorage.getItem('theme-dark')).toBe('true');
    store.toggleDark();
    await nextTick();
    expect(localStorage.getItem('theme-dark')).toBe('false');
  });

  it('reads stored preference on init', () => {
    localStorage.setItem('theme-dark', 'true');
    const store = useThemeStore();
    expect(store.isDark).toBe(true);
  });

  it('adds dark class to documentElement when dark', async () => {
    const store = useThemeStore();
    store.toggleDark();
    await nextTick();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
