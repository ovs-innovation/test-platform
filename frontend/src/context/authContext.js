import { createContext } from 'react';

/** Separate file so Vite HMR does not recreate the context object on provider edits. */
export const AuthContext = createContext(null);
