import { useEffect, useCallback} from "react";
import { IQuote } from "../types/global";
const quoteDefault = "There will be no tomorrow";
const authorDefault = "Unknown";
const quoteAPI = "https://quote-otday.vercel.app/api/quote";

type Props = (value: IQuote) => void

function useQuoteFetch(callSetQuote: Props) {
    const saveQuoteToStorage = useCallback((quote: IQuote) => {
        localStorage.setItem('quote', JSON.stringify(quote));
    }, []);

    useEffect(() => {
        let isActive = true;
        async function requestQuote() {
            try {
                const today = new Date().toISOString().split("T")[0];
                const savedQuote: IQuote = JSON.parse(localStorage.getItem('quote') as string);

                if (savedQuote?.text && savedQuote?.date === today) { //if date from storage is equal today
                    const {text = quoteDefault, author = authorDefault } = savedQuote;
                    const date = savedQuote.date;
                    callSetQuote({ text, author, date });
                    return;
                }
                
                const response = await fetch(quoteAPI);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const result = await response.json() as IQuote;
                if (result && isActive) {
                    callSetQuote(result);
                    saveQuoteToStorage(result);
                }
            } catch (error) {
                console.error("Ошибка получения цитаты", error);
                if (isActive) {
                    const today = new Date().toISOString().split("T")[0];
                    const fallbackQuote = {text: quoteDefault, author: authorDefault, date: today};
                    callSetQuote(fallbackQuote);
                }
            }
        }
        requestQuote();
        
        return () => {
            isActive = false;
        };
    }, [callSetQuote, saveQuoteToStorage]);
}

export default useQuoteFetch;