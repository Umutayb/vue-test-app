import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLayoutStore } from '@/stores/layout';

describe('layout store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('sidebar starts closed', () => {
    const store = useLayoutStore();
    expect(store.isSidebarOpen).toBe(false);
  });

  it('toggleSidebar opens and closes', () => {
    const store = useLayoutStore();
    store.toggleSidebar();
    expect(store.isSidebarOpen).toBe(true);
    store.toggleSidebar();
    expect(store.isSidebarOpen).toBe(false);
  });

  it('closeSidebar closes an open sidebar', () => {
    const store = useLayoutStore();
    store.toggleSidebar();
    store.closeSidebar();
    expect(store.isSidebarOpen).toBe(false);
  });

  it('activeCategory starts null', () => {
    const store = useLayoutStore();
    expect(store.activeCategory).toBeNull();
  });

  it('setActiveCategory sets and clearActiveCategory clears', () => {
    const store = useLayoutStore();
    store.setActiveCategory('Elements');
    expect(store.activeCategory).toBe('Elements');
    store.clearActiveCategory();
    expect(store.activeCategory).toBeNull();
  });

  it('setActiveCategory toggles if same category', () => {
    const store = useLayoutStore();
    store.setActiveCategory('Elements');
    store.setActiveCategory('Elements');
    expect(store.activeCategory).toBeNull();
  });
});
