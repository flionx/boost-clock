"use client"
import { useEffect } from "react";
import { quoteAPI, quoteDefault } from "../constants";
import { IQuote, IQuotesResponse } from "../types";

function useFetchQuote(
  callSetQuote: (value: IQuote) => void,
  locale: string
) {

  useEffect(() => {
    let isActive = true;
    async function requestQuote() {
      try {
        const today = new Date().toISOString().split("T")[0];
        const savedQuotesRaw = localStorage.getItem('quotes');
        const savedQuotes: IQuotesResponse | null = savedQuotesRaw 
          ? JSON.parse(savedQuotesRaw) : null;
        const quote = savedQuotes?.[locale];

        if (quote?.text && quote?.date === today) {
          const { text = quoteDefault.text, author = quoteDefault.author } = quote;
          const date = quote.date;
          callSetQuote({ text, author, date });
          return;
        }

        const response = await fetch(quoteAPI);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: IQuotesResponse = await response.json();
        if (result && isActive) {
          callSetQuote(result[locale]);
          localStorage.setItem('quotes', JSON.stringify(result));
        }
      } catch (error) {
        console.error("Error quote", error);
        if (isActive) {
          const today = new Date().toISOString().split("T")[0];
          callSetQuote({ text: quoteDefault.text, author: quoteDefault.author, date: today });
        }
      }
    }
    requestQuote();

    return () => {
      isActive = false;
    };
  }, [callSetQuote, locale]);

}

export default useFetchQuote;