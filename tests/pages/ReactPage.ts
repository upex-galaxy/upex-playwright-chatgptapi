import type { Page } from '@playwright/test';
import { TestTools } from './TestTools';

export class ReactPage extends TestTools {

	constructor(page: Page) {
		super(page);
	}

	getByReactTool(dataId: string, page: Page, options?: { hasText: string }) {
		if (options) return this.page.locator(`[data-react-toolbox=${dataId}]`, { hasText: options.hasText });
		else return this.page.locator(`[data-react-toolbox=${dataId}]`);
	}
}
