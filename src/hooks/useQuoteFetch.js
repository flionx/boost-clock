import { useEffect } from "react";

function useQuoteFetch(callSetQuote) {
    useEffect(() => {
        async function requestQuote() {
            const savedQuote = JSON.parse(localStorage.getItem('quote'));
            const today = new Date().toISOString().split("T")[0]; // дата ГГГГ-ММ-ДД
    
            if (savedQuote?.quote?.text && savedQuote?.date === today) {
                callSetQuote({text: savedQuote.quote.text, author: savedQuote.quote.author});
                return;
            }
    
            try {
                const response = await fetch(
                    "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/today")
                );
                const data = await response.json();
                const result = JSON.parse(data.contents);
    
                if (result.length > 0) {
                    const newQuote = {
                        text: result[0].q,
                        author: result[0].a || "Unknown",
                    }
                    callSetQuote(newQuote);
                    localStorage.setItem('quote', JSON.stringify({quote: newQuote.text, date: today}))
                }
            } catch (error) {
                console.error("Ошибка получения цитаты", error);
            }
        }
        requestQuote();
    }, []);
}

export default useQuoteFetch