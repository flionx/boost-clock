import { useEffect } from "react";
const alloriginsWin = "https://api.allorigins.win/get?url=";
const url = "https://favqs.com/api/qotd";
// 2 вариант https://strangerthingsquotes.shadowdev.xyz/

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
                const response = await fetch(alloriginsWin + encodeURIComponent(url));
                const data = await response.json();
                const dataParsed = JSON.parse(data.contents);   
                const result = dataParsed.quote;
                if (result) {
                    const newQuote = {
                        text: result.body,
                        author: result.author || "Unknown",
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