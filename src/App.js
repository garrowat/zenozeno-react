import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';

const ENDPOINT = process.env.REACT_APP_ENDPOINT || 'https://robotfun.us/zenozeno/quote/';

const App = () => {
  const [quote, setQuote] = useState('');
  const [inputField, setInputField] = useState('');

  const getQuotes = async (endpoint) => {
    const response = await fetch(`${endpoint}Life`)
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
    getQuotes(ENDPOINT);
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
      <h2>{quote}</h2>
    </div>
  );
};

export default hot(module)(App);