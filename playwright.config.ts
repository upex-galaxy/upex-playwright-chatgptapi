import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
// See https://github.com/motdotla/dotenv
dotenv.config();

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
	// Test Repo Directory:
	testDir: './tests',
	/* Maximum time one test can run for. */
	timeout: 10 * 1000, //? API Test should be fast enough (10 seconds)
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 1000, //? API Response validation should be instant (1 second)
	},
	// Test Matched those suites which are test.ts or spec.ts
	testMatch: /.*(test|spec)\.(ts)/,
	testIgnore: /.*\.example\.test\.(ts)/,
	/* Run tests in files in parallel */
	fullyParallel: false,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. Workers are kinda flaky! not prefer to use them */
	workers: process.env.CI ? 4 : 1,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		['./tests/custom-reporter.ts'],
		['html', { outputFolder: 'test-html-report/playwright', open: 'never' }],
		['junit', { outputFolder: 'test-junit-report', outputFile: 'test-junit-report/playwright-importer-report.xml' }],
		['allure-playwright'],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: 'https://api.openai.com/v1',
		// Headless Mode: true by default
		headless: true,
		// Viewport Resolution
		viewport: { width: 1920, height: 1080 },
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'retain-on-failure',
		screenshot: 'on',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		},
		//? I removed all of the other browsers because this project is just about Backend Testing (API validation)
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   port: 3000,
	// },
});
