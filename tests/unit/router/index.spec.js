import { describe, it, expect } from 'vitest';
import router from '@/router/index';
import { navigation } from '@/config/navigation';

describe('router', () => {
  it('has a home route at /', () => {
    const home = router.getRoutes().find(r => r.name === 'home');
    expect(home).toBeDefined();
    expect(home.path).toBe('/');
  });

  it('generates a route for every navigation item', () => {
    const routeNames = new Set(router.getRoutes().map(r => r.name));
    for (const group of navigation) {
      for (const item of group.items) {
        expect(routeNames.has(item.routeName)).toBe(true);
      }
    }
  });

  it('sets category meta on page routes', () => {
    const buttonsRoute = router.getRoutes().find(r => r.name === 'buttons');
    expect(buttonsRoute.meta.category).toBe('Elements');
  });

  it('sets description meta on page routes', () => {
    const tabsRoute = router.getRoutes().find(r => r.name === 'tabs');
    expect(tabsRoute.meta.description).toBeTruthy();
  });

  it('has redirect routes for old category paths', () => {
    const redirects = router.getRoutes().filter(r => r.redirect);
    const redirectPaths = redirects.map(r => r.path);
    expect(redirectPaths).toContain('/elements');
    expect(redirectPaths).toContain('/interactions');
    expect(redirectPaths).toContain('/widgets');
  });
});
