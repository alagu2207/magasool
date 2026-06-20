import React, { createContext, useCallback, useContext, useState } from 'react';

/** The app has no router; this is a tiny client-side page switcher. */
export type Route = 'home' | 'privacy';

type Ctx = { route: Route; navigate: (route: Route) => void };

const NavContext = createContext<Ctx>({ route: 'home', navigate: () => {} });

/** Wrap the app so the header/footer can switch between the home page and the Privacy Policy page. */
export function NavProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<Route>('home');
  const navigate = useCallback((r: Route) => setRoute(r), []);

  return <NavContext.Provider value={{ route, navigate }}>{children}</NavContext.Provider>;
}

export function useNav() {
  return useContext(NavContext);
}
