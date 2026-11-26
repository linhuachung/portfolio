import { defineConfig } from '@playwright/test';

export default defineConfig( {
  testDir: './tests',
  testMatch: 'browser.spec.js',
  timeout: 30000,
  fullyParallel: false,
  use: {
    baseURL: 'http://127.0.0.1:3100',
    browserName: 'chromium',
    channel: 'msedge',
    headless: true,
    trace: 'retain-on-failure'
  },
  reporter: [['list']]
} );
