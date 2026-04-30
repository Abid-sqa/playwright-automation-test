import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';


const testEnv = process.env.TEST_ENV || 'dev';
const envFile = path.resolve(__dirname, `.env.${testEnv}`);

console.log(`Using environment: ${envFile}`);
if(!fs.existsSync(envFile)) {
  throw new Error(`Environment file ${envFile} does not exist`);
}
dotenv.config({ path: envFile, override: true });


function getBrowserConfig() {
  const browser = process.env.BROWSER || 'chrome';
  const isHeadless = process.env.CI === 'true' ? 'true' : (process.env.HEADLESS || 'true');
  const viewportWidth = process.env.VIEWPORT_WIDTH ? parseInt(process.env.VIEWPORT_WIDTH) : 1280;
  const viewportHeight = process.env.VIEWPORT_HEIGHT ? parseInt(process.env.VIEWPORT_HEIGHT) : 720;

  const browserConfigs = {
    'chrome': {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: isHeadless === 'true',
        viewport: { width: viewportWidth, height: viewportHeight },
      }
    },
    'firefox': {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: isHeadless === 'true',
        viewport: { width: viewportWidth, height: viewportHeight },
      }
    },
    'webkit': {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        headless: isHeadless === 'true',
        viewport: { width: viewportWidth, height: viewportHeight },
      }
    },
    'mobile-chrome': {
      name: 'chromium',
      use: {
        ...devices['Pixel 5'],
        headless: isHeadless === 'true',
      }
    },
    'mobile-safari': {
      name: 'webkit',
      use: {
        ...devices['iPhone 13'],
        headless: isHeadless === 'true',
      }
    }
  };

  const browserKey = browser as keyof typeof browserConfigs;
  return browserConfigs[browserKey];
}


export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 5,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [getBrowserConfig()],

});
