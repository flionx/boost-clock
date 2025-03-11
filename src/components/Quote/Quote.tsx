import { useCallback, useState } from 'react';
import useQuoteFetch from '../../hooks/useQuoteFetch';
import { IQuote } from '../../types/global';
import './Quote.css'

const Quote = () => {
    const [quote, setQuote] = useState<Omit<IQuote, 'date'>>({text: 'There will be no tommorow', author: 'Unknown'})
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
                        <p className="quote__author">&copy;{quote.author}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Quote;