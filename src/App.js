import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';

const ENDPOINT = process.env.REACT_APP_ENDPOINT || 'https://robotfun.us/zenozeno/quote/';

const App = () => {
  const [quote, setQuote] = useState('');
  const [inputField, setInputField] = useState('');

  const getQuotes = async (endpoint, input) => {
    const response = await fetch(`${endpoint}${input ? input : 'To live is to'}`)
      .catch((error) => {
        const message = `Error fetching quote from zenozeno API: ${error}`;
        setQuote(message);
      });

    const quoteData = await response.json()
      .catch((error) => {
        const message = `Error fetching quote from zenozeno API: ${error}`;
        setQuote(message);
      });
    console.log(quoteData)
    setQuote(quoteData.quotes[2]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getQuotes(ENDPOINT, inputField);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={(e) => setInputField(e.target.value)}
          value={inputField}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <h2>{quote ? quote : 'loading'}</h2>
    </div>
  );
};

export default hot(module)(App);