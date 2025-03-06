import { useEffect, useCallback } from "react";

const quoteDefault = "There will be no tomorrow";
const authorDefault = "Unknown";
const alloginsAPI = "https://api.allorigins.win/get?url=";
const quoteAPI = "https://favqs.com/api/qotd";

function useQuoteFetch(callSetQuote) {
    
    const saveQuoteToStorage = useCallback((quoteData) => {
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem('quote', JSON.stringify({
            quote: quoteData,
            date: today
        }));
    }, []);

    useEffect(() => {
        let isActive = true;
        async function requestQuote() {
            try {
                const today = new Date().toISOString().split("T")[0];
                const savedQuote = JSON.parse(localStorage.getItem('quote'));
                if (savedQuote?.quote && savedQuote?.date === today) {
                    const { text = quoteDefault, author = authorDefault } = savedQuote.quote;
                    callSetQuote({ text, author });
                    return;
                }
                
                const response = await fetch(`${alloginsAPI}${encodeURIComponent(quoteAPI)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                const dataParsed = JSON.parse(data.contents);
                const result = dataParsed.quote;
                
                if (result && isActive) {
                    const newQuote = {
                        text: result.body || quoteDefault,
                        author: result.author || authorDefault,
                    };
                    callSetQuote(newQuote);
                    saveQuoteToStorage(newQuote);
                }
            } catch (error) {
                console.error("Ошибка получения цитаты", error);
                if (isActive) {
                    const fallbackQuote = {text: quoteDefault, author: authorDefault};
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