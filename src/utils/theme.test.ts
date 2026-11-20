import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveInitialTheme, toggleThemeMode } from './theme';

test('resolveInitialTheme honors valid stored preference over system preference', () => {
  assert.equal(resolveInitialTheme('dark', false), 'dark');
  assert.equal(resolveInitialTheme('light', true), 'light');
});

test('resolveInitialTheme falls back to system preference when storage is empty or invalid', () => {
  assert.equal(resolveInitialTheme(null, true), 'dark');
  assert.equal(resolveInitialTheme(undefined, false), 'light');
  assert.equal(resolveInitialTheme('sepia', true), 'dark');
  assert.equal(resolveInitialTheme('', false), 'light');
});

test('toggleThemeMode flips cleanly between light and dark', () => {
  assert.equal(toggleThemeMode('light'), 'dark');
  assert.equal(toggleThemeMode('dark'), 'light');
});
