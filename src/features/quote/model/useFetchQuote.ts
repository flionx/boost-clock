"use client"
import { useEffect} from "react";
import { quoteAPI, quoteDefault } from "../constants";
import { IQuote } from "../types";

function useFetchQuote(
    callSetQuote: (value: IQuote) => void
) {

    useEffect(() => {
        let isActive = true;
        async function requestQuote() {
            try {
                const today = new Date().toISOString().split("T")[0];
                const savedQuote: IQuote = JSON.parse(localStorage.getItem('quote') as string);

                if (savedQuote?.text && savedQuote?.date === today) {
                    const {text = quoteDefault.text, author = quoteDefault.author } = savedQuote;
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
                    localStorage.setItem('quote', JSON.stringify(result));
                }
            } catch (error) {
                console.error("Error quote", error);
                if (isActive) {
                    const today = new Date().toISOString().split("T")[0];
                    callSetQuote({text: quoteDefault.text, author: quoteDefault.author, date: today});
                }
            }
        }
        requestQuote();
        
        return () => {
            isActive = false;
        };
    }, [callSetQuote]);

}

export default useFetchQuote;