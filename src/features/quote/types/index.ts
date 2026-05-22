import { Language } from "firebase/ai"

export interface IClientQuote {
  text: string,
  author: string
}

export interface IQuote extends IClientQuote {
  date: string
}

export interface IQuotesResponse {
  [lang: Language]: IQuote
}

export interface IQuotesClient {
  [lang: Language]: IClientQuote
}