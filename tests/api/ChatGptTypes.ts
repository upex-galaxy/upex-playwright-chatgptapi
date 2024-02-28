/* eslint-disable @typescript-eslint/naming-convention */
export type ModelIdOptions = 
| 'dall-e-3'
| 'gpt-3.5-turbo-0613'
| 'text-embedding-3-large'
| 'gpt-3.5-turbo-instruct-0914'
| 'dall-e-2'
| 'whisper-1'
| 'babbage-002'
| 'text-embedding-ada-002'
| 'gpt-3.5-turbo-0125'
| 'gpt-3.5-turbo'
| 'text-embedding-3-small'
| 'gpt-3.5-turbo-0301'
| 'gpt-3.5-turbo-instruct'
| 'tts-1'
| 'tts-1-1106'
| 'gpt-3.5-turbo-1106'
| 'tts-1-hd'
| 'tts-1-hd-1106'
| 'gpt-3.5-turbo-16k-0613'
| 'davinci-002'
| 'gpt-3.5-turbo-16k'

export type ModelsResponse = {
	object: string,
	data: ModelsData[]
}

export type ModelsData = {
  id: ModelIdOptions
  object: string
  created: number
  owned_by: string
}

export type CompletionsRequest = {
    model: ModelIdOptions,
    messages: completionMessage[]
  }

export type completionMessage ={
	role: string,
	content: string
}

export type ChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices: CompletionChoice[];
  usage: CompletionUsage;
};

type CompletionChoice = {
  index: number;
  message: CompletionMessage;
  logprobs: null;
  finish_reason: string;
};

type CompletionMessage = {
  role: string;
  content: string;
};
type CompletionMessageComplex = {
  role: string;
  content: ImageUrlBody[] | string;
};

type CompletionUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type ImageGenerationRequest = {
  model: 'dall-e-3',
  prompt: string,
  n: number,
  size: string
}

export type ImageGenerationResponse = {
  created: number,
  data: {url: string}[]
}

export type ImageVisionPreviewRequest = {
    model: 'gpt-4-vision-preview',
    messages: CompletionMessageComplex[],
    max_tokens: number
  }

type ImageUrlBody = {
  type: 'image_url'|'text',
  image_url?: {url: string},
  text?: string
}
