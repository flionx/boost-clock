import { IQuotesClient } from "../types";

export const FALLBACK_QUOTES: IQuotesClient = {
  en: { text: "There will be no tomorrow", author: "Unknown" },
  ru: { text: "Не будет никакого завтра", author: "Неизвестный" }
};

export const quoteAPI = "https://quote-otday.vercel.app/api/quote";