/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
	export interface ProcessEnv {
		ORANGE_USERNAME: string
		ORANGE_PASSWORD: string
		AZURE_TOKEN: string
		CHATGPT_API_KEY_PW: string
		BASE_URL_QA: string
	}
}
