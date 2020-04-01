import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [inputField, setInputField] = useState('');
  const [numberOfQuotes, setNumberOfQuotes] = useState(2);

  const getQuotes = async (endpoint) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
        input: inputField || 'The meaning of life is',
        numberOfQuotes: numberOfQuotes || 1,
      }),
    })
      .catch((error) => {
        const message = `Error fetching quote from Zenozeno API: ${error}`;
        console.log(message);
      });

    const quoteData = await response.json()

    console.log(quoteData)
    setQuotes(quoteData.quotes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getQuotes(ENDPOINT, inputField);
  };

  return (
    <div>
      <h1>Zenozeno AI Quote Generator</h1>
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
      <h2>
        <ul>
          {
            quotes
              ? quotes.map((quote, index) => <li key={`quote${index}`}>{quote}.</li>)
              : 'loading'
          }
        </ul>
      </h2>
    </div>
  );
};

export default hot(module)(App);