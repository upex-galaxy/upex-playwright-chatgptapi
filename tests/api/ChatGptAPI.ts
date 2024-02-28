/* eslint-disable @typescript-eslint/naming-convention */
import { TestTools } from '@pages/TestTools';
import { type Page, expect, type APIResponse } from '@playwright/test';
import * as env from 'dotenv';
import { type GptEndpoints, gptEndpoints } from './ChatGptEndpoints';
import type { ModelIdOptions, ModelsResponse, CompletionsRequest, ChatCompletionResponse, ImageGenerationRequest, ImageGenerationResponse, ImageVisionPreviewRequest } from './ChatGptTypes';
env.config();

export class ChatGptAPI extends TestTools {
	baseUrl: string;
	token: string;
	defaultModel: 'gpt-3.5-turbo';
	defaultContext: string;

	constructor(page: Page) {
		super(page);
		this.baseUrl = process.env.BASE_URL_QA;
		this.token = process.env.CHATGPT_API_KEY_PW;
		this.defaultModel = 'gpt-3.5-turbo';
		this.defaultContext = 'You are a helpful assistant named Aurora, with black humor mood. Answer always in Spanish.';
	}

	handleRequestError(response: APIResponse) {
		console.log('📦️ Response Status:', response.status(), response.statusText());
		if(!response.ok()) throw new Error('Error in POST request', { cause: response.statusText() });
		expect.soft(response.ok()).toBeTruthy();
	}

	async apiGET(endpoint: GptEndpoints) {
		const url = `${this.baseUrl}${endpoint}`;
		console.log('🔍 GET:', url);
		try {
			const response = await this.api.get(url, {
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			});
			this.handleRequestError(response);
			return response;
		} catch (e) {
			console.error(e);
			return await Promise.reject(e);
		}
	}

	async apiPOST(endpoint: GptEndpoints, body: unknown) {
		const url = `${this.baseUrl}${endpoint}`;
		console.log('🔍 POST:', url);
		console.log('📦️ Request Body:', body);
		try {
			const response = await this.api.post(url, {
				headers: {
					Authorization: `Bearer ${this.token}`
				},
				data: body
			});
			this.handleRequestError(response);
			return response;
		} catch (e) {
			console.error(e);
			return await Promise.reject(e);
		}
	}

	async apiGetModels() {
		const response = await this.apiGET(gptEndpoints.models);
		const ModelsBodyRes = await response.json() as ModelsResponse;
		return ModelsBodyRes.data;
	}

	async apiPostCompletion(arg: { givenPrompt: string, modelOption?: ModelIdOptions, context?: string }) {
		const chosenModel = arg.modelOption ?? this.defaultModel;
		
		const body: CompletionsRequest = {
			model: chosenModel,
			messages: [
				{
					role: 'system',
					content: arg.context ?? this.defaultContext
				},
				{
					role: 'user',
					content: arg.givenPrompt
				}
			]
		};
		const response = await this.apiPOST(gptEndpoints.completions, body);
		const bodyRes = await response.json() as ChatCompletionResponse;
		const answer = bodyRes.choices[0].message.content;
		console.log('🤖 Aurora Reply:', answer );
		return bodyRes;
	}

	async apiPostImageGeneration(arg: { givenPrompt: string, size?: string, imagesQty?: number }) {
		const body: ImageGenerationRequest = {
			model: 'dall-e-3',
			prompt: arg.givenPrompt,
			n: arg.imagesQty ?? 1, // up to 10 images generated
			size: arg.size ?? '1024x1024'
		};
		const response = await this.apiPOST(gptEndpoints.imagesGenerations, body);
		const bodyRes = await response.json() as ImageGenerationResponse;
		const answer = bodyRes.data[0].url;
		console.log('🤖 Aurora Reply:', answer );
		return bodyRes;
	}

	async apiPostImageReading(arg: { givenPrompt: string, imageUrl: string, context?: string }) {
		const body: ImageVisionPreviewRequest ={
			model: 'gpt-4-vision-preview',
			messages: [
				{
					role: 'system',
					content: arg.context ?? this.defaultContext
				},
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: arg.givenPrompt
						},
						{
							type: 'image_url',
							image_url: { url: arg.imageUrl }
						}
					]
				}
			],
			max_tokens: 200
		}; 
		const response = await this.apiPOST(gptEndpoints.completions, body);
		const bodyRes = await response.json() as ChatCompletionResponse;
		const answer = bodyRes.choices[0].message.content;
		console.log('🤖 Aurora Reply:', answer );
		return bodyRes;

	}

}