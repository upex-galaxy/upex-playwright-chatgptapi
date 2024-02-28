export const gptEndpoints = Object.freeze({
	assistants: '/assistants',
	threads: '/threads',
	models: '/models',
	completions: '/chat/completions',
	imagesGenerations: '/images/generations',
});

export type GptEndpoints = 
| '/assistants'
| '/threads'
| '/models'
| '/chat/completions'
| '/images/generations';