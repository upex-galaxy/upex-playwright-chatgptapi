import type { APIRequestContext, Page } from '@playwright/test';

export class TestTools {
	page: Page;
	api: APIRequestContext;

	constructor(driver: Page) {
		this.page = driver;
		this.api = this.page.request;
	}
}