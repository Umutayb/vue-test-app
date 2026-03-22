import { describe, it, expect } from 'vitest';
import { navigation, findNavItem } from '@/config/navigation';

describe('navigation config', () => {
  it('exports a non-empty array of categories', () => {
    expect(Array.isArray(navigation)).toBe(true);
    expect(navigation.length).toBeGreaterThan(0);
  });

  it('every category has a name and non-empty items array', () => {
    for (const group of navigation) {
      expect(group.category).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it('every item has label, routeName, and path', () => {
    for (const group of navigation) {
      for (const item of group.items) {
        expect(item.label).toBeTruthy();
        expect(item.routeName).toBeTruthy();
        expect(item.path).toMatch(/^\//);
      }
    }
  });

  it('has no duplicate route names', () => {
    const routeNames = navigation.flatMap(g => g.items.map(i => i.routeName));
    expect(new Set(routeNames).size).toBe(routeNames.length);
  });

  it('has no duplicate paths', () => {
    const paths = navigation.flatMap(g => g.items.map(i => i.path));
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe('findNavItem', () => {
  it('returns item with category for a known route name', () => {
    const result = findNavItem('buttons');
    expect(result).toEqual({
      label: 'Buttons',
      routeName: 'buttons',
      path: '/buttons',
      category: 'Elements',
    });
  });

  it('returns undefined for unknown route name', () => {
    expect(findNavItem('nonexistent')).toBeUndefined();
  });

  it('returns correct category for items in different groups', () => {
    expect(findNavItem('tabs').category).toBe('Widgets');
    expect(findNavItem('sortable').category).toBe('Interactions');
    expect(findNavItem('gallery').category).toBe('Media');
  });
});
