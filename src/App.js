import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

// Styled Components
const GlobalStyle = createGlobalStyle`
  body {
    background: #f7f7f2;
    font-family: 'Roboto', sans-serif;
    color: #505050;
  }
`
const GridContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template: 30px 80px 30px 100px 1fr auto 30px
  / 1fr 50px 3fr 50px 1fr;
`;

const Title = styled.p`
  grid-area: 2 / 3 / 3 / 4;
  color: #F4AF13;
  font-size: 5vh;
  font-weight: 100;
`;

const Description = styled.p`
  grid-area: 3 / 3 / 4 / 4;
  margin-top: 10px;
`;

const Form = styled.form`
  grid-area: 4 / 3 / 5 / 4;
  margin-top: 10px;
  width: 50vh;
  display: flex;
  align-items: center;
`;

const Quotes = styled.ul`
  grid-area: 5 / 3 / 6 / 4;
`;

const Controls = styled.div`
  grid-area: 6 / 3 / 7 / 4;
`;

const About = styled.div`
  grid-area: 7 / 3 / 8 / 4;
`;

const Indicator = styled.div`
  grid-area: 4 / 2 / 5 / 3;
  align-self: center;
  justify-self: flex-end;
  margin-top: 10px;
  height: 50px;
  width: 5px;
  background: #000;
  margin-right: 6px;
  border-radius: 1px;
  background: #f5f4e2;
  box-shadow: inset 5px 5px 10px #d3d2c2;
`;

const InputField = styled.input`
  height: 40px;
  border: none;
  border-radius: 2px;
  background: #fdfdfb;
  box-shadow: inset 3px 3px 5px #d3d2c2,
            inset -3px -3px 5px #ffffff;
  font-family: 'Roboto', sans-serif;
  flex: 1 0 3;
  font-size: 20px;
  padding: 10px;
`;

const SubmitButton = styled.button`
  flex: 0 0 0;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(145deg, #dededa, #ffffff);
  box-shadow:  5px 5px 10px #d3d2c2,
             -5px -5px 10px #ffffff;
  padding: 10px;
  margin: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 2.2vh;
`;

const ButtonIcon = styled.span`
  filter: grayscale(80%);
`;

// Main App Component

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
        topK: topK || 40,
        topP: topP || 0.9,
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
    <GridContainer>
      <GlobalStyle />
      <Title>
        Zenozeno
      </Title>

      <Description>
        AI Quote Generator
      </Description>

      <Indicator />

      <Form>
        <InputField
          type="text"
          onChange={(e) => setInputField(e.target.value)}
          value={inputField}
        />
        <SubmitButton type="submit" onClick={handleSubmit}>
          <ButtonIcon>💡</ButtonIcon>
        </SubmitButton>
      </Form>

      <Quotes>
        {
          quotes
            ? quotes.map((quote, index) => <li key={`quote${index}`}>{quote}.</li>)
            : 'loading'
        }
      </Quotes>

      <Controls>
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
      </Controls>

      <About>
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
      </About>
    </GridContainer>
  );
};

export default hot(module)(App);