"use client";
import { useEffect, useRef, useCallback } from "react";
import { IQuotesResponse } from "../types";
import getTodayString from "@/shared/lib/getTodayString";
import { FALLBACK_QUOTES } from "../constants";

const CACHE_KEY = 'quotes';
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

function useFetchQuote(callSetQuote: (value: IQuotesResponse) => void) {
  const isMounted = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCount = useRef(0);

  const fetchWithRetry = useCallback(async (): Promise<IQuotesResponse> => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    try {
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch('/api/quote', { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retryCount.current < MAX_RETRIES && 
          !(error instanceof Error && error.name === 'AbortError')) {
        retryCount.current++;
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry();
      }
      throw error;
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    retryCount.current = 0;
    
    async function loadQuote() {
      try {
        const today = getTodayString();
        
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const quotes: IQuotesResponse = JSON.parse(cached);
          if (quotes.en?.date === today) {
            if (isMounted.current) callSetQuote(quotes);
            return;
          }
        }
        
        const quotes = await fetchWithRetry();
        
        if (isMounted.current && quotes.en?.text && quotes.ru?.text) {
          callSetQuote(quotes);
          localStorage.setItem(CACHE_KEY, JSON.stringify(quotes));
        }
      } catch (error) {
        console.error("Quote fetch failed:", error);
        
        if (isMounted.current) {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            callSetQuote(JSON.parse(cached));
          } else {
            const today = getTodayString();
            callSetQuote({
              en: { ...FALLBACK_QUOTES.en, date: today },
              ru: { ...FALLBACK_QUOTES.ru, date: today }
            });
          }
        }
      }
    }
    
    loadQuote();
    
    return () => {
      isMounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [callSetQuote, fetchWithRetry]);
}

export default useFetchQuote;