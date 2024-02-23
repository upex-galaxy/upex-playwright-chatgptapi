export const gptEndpoints = Object.freeze({
	assistants: '/assistants',
	threads: '/threads',
	models: '/models',
	completions: '/chat/completions'
});

export type GptEndpoints = 
| '/assistants'
| '/threads'
| '/models'
| '/chat/completions'