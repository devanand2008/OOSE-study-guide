export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'se-exam-guide-theme-v1';

export function resolveInitialTheme(
  storedValue: string | null | undefined,
  systemPrefersDark: boolean,
): ThemeMode {
  if (storedValue === 'dark' || storedValue === 'light') {
    return storedValue;
  }
  return systemPrefersDark ? 'dark' : 'light';
}

export function toggleThemeMode(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}
