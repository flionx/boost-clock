import { FC, useCallback, useState } from 'react';
import useQuoteFetch from '../../hooks/useQuoteFetch';
import './Quote.css'
import { IQuote } from '../../types/global';

const Quote: FC = () => {
    const [quote, setQuote] = useState({text: 'There will be no tommorow', author: 'Unknown'})
    const callSetQuote = useCallback((value: IQuote) => setQuote(value), []);
    useQuoteFetch(callSetQuote);

    return (
        <section className='quote'>
            <div className="container">
                <div className="container-in quote-p40">
                    <h3 className="quote__title">Quote of the Day:</h3>
                    <div className="quote__main">
                        <div className="quote__square">
                            {quote.text}
                        </div>
                        <div className="quote__author">{quote.author}</div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Quote;