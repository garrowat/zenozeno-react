import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [inputField, setInputField] = useState('');
  const [numberOfQuotes, setNumberOfQuotes] = useState(2);
  const [maxQuoteLength, setMaxQuoteLength] = useState(100);
  const [topK, setTopK] = useState(40);
  const [topP, setTopP] = useState(0.9);
  const [temperature, setTemperature] = useState(0.7);


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
        maxQuoteLength: maxQuoteLength || 100,
        topP: topP || 40,
        topK: topK || 0.9,
        temperature: temperature || 0.7,
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
      <h3>
        <ul>
          {
            quotes
              ? quotes.map((quote, index) => <li key={`quote${index}`}>{quote}.</li>)
              : 'loading'
          }
        </ul>
      </h3>
      <div>
        <p>
          <label htmlFor="numberOfQuotes">Number of Quotes</label>
          <span>{numberOfQuotes}</span>
        </p>
        <input type="range" value={numberOfQuotes} name="numberOfQuotes" min={1} max={5} onChange={(e) => setNumberOfQuotes(Number(e.target.value))} />
      </div>
      <div>
        <p>
          <label htmlFor="maxQuoteLength">Maximum Quote Length</label>
          <span>{maxQuoteLength}</span>
        </p>
        <input type="range" value={maxQuoteLength} name="maxQuoteLength" min={10} max={1000} step={10} onChange={(e) => setMaxQuoteLength(Number(e.target.value))} />
      </div>
      <div>
        <p>
          <label htmlFor="topK">Top K</label>
          <span>{topK}</span>
        </p>
        <input type="range" value={topK} name="topK" min={0} max={150} step={5} onChange={(e) => setTopK(Number(e.target.value))} />
      </div>
      <div>
        <p>
          <label htmlFor="topP">Top P</label>
          <span>{topP}</span>
        </p>
        <input type="range" value={topP} name="topP" min={0} max={1} step={0.05} onChange={(e) => setTopP(Number(e.target.value))} />
      </div>
      <div>
        <p>
          <label htmlFor="temperature">Temperature</label>
          <span>{temperature}</span>
        </p>
        <input type="range" value={temperature} name="temperature" min={0} max={1} step={0.01} onChange={(e) => setTemperature(Number(e.target.value))} />
      </div>
      <h2>
        About Zenozeno
      </h2>
      <p></p>
      <h2>
        About Zenozeno settings
      </h2>
      <p>
        Top K: Only include the K most likely next words when choosing the next word in a sequence.
        Top P: Similar to Top K, but dynamically selects the set of next probable words whose cumulative probabilities don't exceed P
      </p>
    </div>
  );
};

export default hot(module)(App);