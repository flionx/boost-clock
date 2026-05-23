"use client"
import { useCallback, useState } from "react"
import useFetchQuote from "../model/useFetchQuote";
import { IQuotesClient } from "../types";
import { useLocale, useTranslations } from "next-intl";
import { FALLBACK_QUOTES } from "../constants";

const Quote = () => {
  const [quotes, setQuotes] = useState<IQuotesClient>();
  const callSetQuotes = useCallback((value: IQuotesClient) => setQuotes(value), [])
  const t = useTranslations();
  const locale = useLocale();
  useFetchQuote(callSetQuotes);

  return (
    <section className='pt-6.5 pb-9 border-t-4 border-accent bg-secondary'>
      <div className="content-wrapper flex flex-col items-center">
        <h3 className="text-3xl text-left w-full mb-5">{t("quoteOfDay")}:</h3>
        <div className="
            relative w-full p-5 border-l-5 border-accent-border bg-[#00000026] rounded-md text-xl min-h-12.5 italic
            shadow-[0_4px_8px_#0000000d] mb-2.5
          "
        >
          <span className="absolute -top-2.5 -left-2.5 text-content text-6xl opacity-60 not-italic">“</span>
          {quotes?.[locale].text ?? FALLBACK_QUOTES[locale].text}
        </div>
        <p className="w-full text-right text-lg pr-6.5">
          <span>©</span>
          {quotes?.[locale].author ?? FALLBACK_QUOTES[locale].author}
        </p>
      </div>
    </section>
  )
}

export default Quote