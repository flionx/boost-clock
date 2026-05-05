import { Language } from "firebase/ai"

export interface IQuote {
  text: string,
  author: string
  date: string
}

export interface IQuotesResponse {
  [lang: Language]: IQuote
}