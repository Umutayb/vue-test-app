import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCounterStore } from '@/stores/counter';

describe('counter store', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCounterStore();
  });

  it('starts at zero with step 1', () => {
    expect(store.count).toBe(0);
    expect(store.step).toBe(1);
    expect(store.history).toEqual([]);
  });

  it('increments by step', () => {
    store.increment();
    expect(store.count).toBe(1);
    store.increment();
    expect(store.count).toBe(2);
  });

  it('decrements by step', () => {
    store.decrement();
    expect(store.count).toBe(-1);
  });

  it('resets count to zero', () => {
    store.increment();
    store.increment();
    store.reset();
    expect(store.count).toBe(0);
  });

  it('respects custom step size', () => {
    store.setStep(5);
    store.increment();
    expect(store.count).toBe(5);
    store.decrement();
    expect(store.count).toBe(0);
  });

  it('setStep clamps to minimum of 1', () => {
    store.setStep(0);
    expect(store.step).toBe(1);
    store.setStep(-3);
    expect(store.step).toBe(1);
    store.setStep('abc');
    expect(store.step).toBe(1);
  });

  it('records history entries', () => {
    store.increment();
    store.decrement();
    expect(store.history).toHaveLength(2);
    expect(store.history[0]).toBe('-1 → 0');
    expect(store.history[1]).toBe('+1 → 1');
  });

  it('limits history to 5 entries', () => {
    for (let i = 0; i < 7; i++) store.increment();
    expect(store.history).toHaveLength(5);
  });
});
