import { expect, story, test } from '@TestBase';

story('Verify ChatGPT API chat completions', () => {

	test('TC1: ChatGPT API should return a simple AI Response from a open Question', async ({ chatGptAPI }) => {
		const givenPrompt = 'Qué es Sofware Testing?';
		const auroraRes = await chatGptAPI.apiPostCompletion({ givenPrompt });
		expect(auroraRes.choices[0].message.content).toBeDefined();
	});
});
