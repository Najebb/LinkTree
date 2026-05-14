'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Realm = 'void' | 'forest' | 'blood';

interface RealmContextType {
  realm: Realm;
  setRealm: (realm: Realm) => void;
}

const RealmContext = createContext<RealmContextType | undefined>(undefined);

export function RealmProvider({ children }: { children: React.ReactNode }) {
  const [realm, setRealmState] = useState<Realm>('void');

  useEffect(() => {
    // Try to load from local storage
    const saved = localStorage.getItem('fantasy-realm') as Realm;
    if (saved && ['void', 'forest', 'blood'].includes(saved)) {
      setRealm(saved);
    }
  }, []);

  const setRealm = (newRealm: Realm) => {
    setRealmState(newRealm);
    localStorage.setItem('fantasy-realm', newRealm);
    
    // Apply data-theme to HTML tag for global CSS variables
    const html = document.documentElement;
    if (newRealm === 'void') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', newRealm);
    }
  };

  return (
    <RealmContext.Provider value={{ realm, setRealm }}>
      {children}
    </RealmContext.Provider>
  );
}

export function useRealm() {
  const context = useContext(RealmContext);
  if (context === undefined) {
    throw new Error('useRealm must be used within a RealmProvider');
  }
  return context;
}
