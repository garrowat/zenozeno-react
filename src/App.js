import React, { useState } from 'react';
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
  display: grid;
  grid-template: 20px 15vmin 5vmin auto auto auto 1fr
  / 5px 10px 1fr 1fr;
  grid-gap: 10px;
`;

const Title = styled.span`
  grid-area: 2 / 3 / 3 / 4;
  align-self: end;
  color: #f4af13;
  font-size: calc(12px + 10vmin);
  font-weight: 100;
`;

const Description = styled.span`
  grid-area: 3 / 3 / 4 / 4;
  place-self: start stretch;
  font-size: calc(6px + 4vmin);
  padding-bottom: 18px;
`;

const Form = styled.form`
  grid-area: 4 / 3 / 5 / 4;
  display: flex;
  align-items: center;
`;

const Quotes = styled.div`
  grid-area: 5 / 3 / 6 / 4;
  align-self: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
  border-radius: 1px;
  background: #f7f7f2;
  transition: all 0.5s ease-in-out;
  box-shadow: ${
    props => props.isLoading
    ? '0px 0px 0px #ebebe6, 0px 0px 0px #fffffe'
    : 'inset 5px 5px 10px #ebebe6, inset -5px -5px 10px #fffffe'
  };
`;

const Quote = styled.span`
  padding-top: 10px;
  padding-bottom: 20px;
  font-family: 'Roboto Mono', monospace;;
  font-size: calc(12px + 3vmin);
  opacity:${ props => props.isLoading ? '0' : '1' };

  &:not(:last-child) {
    border-bottom: 1px solid #ebebe6;
  };
  transition: all 0.2s ease-in-out;
`;

const Controls = styled.div`
  grid-area: 6 / 3 / 7 / 4;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ControlLabel = styled.label`
  font-size: 12px;
`;

const ControlValue = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const About = styled.div`
  grid-area: 7 / 3 / 8 / 4;
`;

const Indicator = styled.div`
  grid-area: 4 / 2 / 5 / 3;
  place-self: center end;
  height: calc(45px + 4vmin);
  width: 5px;
  transition: all 0.5s ease-in-out;
  background: ${
    props => props.quotes.length === 0 && !props.isLoading ? '#f7f7f2'
    : props => props.isLoading ? '#fcdd44' : '#99ee99'
  };
  border-radius: 1px;
  box-shadow: ${
    props => props.quotes.length === 0 ? 'inset 1px 1px 3px #d3d2c2'
    : props => props.isLoading
      ? 'inset 1px 1px 3px #d3d2c2, 0 0 10px #fdee77, 0 0 20px #fdee77'
      : 'inset 1px 1px 3px #d3d2c2, 0 0 10px #99ee99'
  };
`;

const InputField = styled.input`
  height: calc(15px + 10vmin);
  border: none;
  border-radius: 2px;
  background: #fdfdfb;
  box-shadow: inset 3px 3px 5px #d3d2c2,
            inset -3px -3px 5px #ffffff;
  font-family: 'Roboto', sans-serif;
  flex: 0 0 25.5vmin;
  font-size: calc(10px + 5vmin);
  padding: 10px;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 5px;
  background: ${props => props.isLoading ? '#f7f7f2' : 'linear-gradient(145deg, #dededa, #ffffff)'};
  box-shadow:  ${props => props.isLoading
    ? '0px 0px 0px #d3d2c2, \
      -0px -0px 0px #ffffff'
    : '5px 5px 10px #d3d2c2, \
      -5px -5px 10px #ffffff'};
  padding: calc(10px + 2vmin);
  margin-left: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: calc(10px + 2vmin);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow:  7px 7px 12px #d3d2c2,
                -7px -7px 12px #ffffff;
  }
`;

const SliderControl = styled.input`
  -webkit-appearance: slider-vertical;
`;

const ButtonIcon = styled.span`
  transition: all 0.2s ease-in-out;
  filter: grayscale(80%);

  ${SubmitButton}:hover & {
    filter: grayscale(10%);
  }
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getQuotes = async (endpoint) => {
    setIsLoading(true);
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
        setIsLoading(false);
        setHasError(true);
      });

    const quoteData = await response.json()

    console.log(quoteData)
    setQuotes(quoteData.quotes);
    setIsLoading(false);
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

      <Indicator hasError={hasError} isLoading={isLoading} quotes={quotes} />

      <Form>
        <InputField
          disabled={isLoading}
          type="text"
          onChange={(e) => setInputField(e.target.value)}
          value={inputField}
          placeholder="Type a partial sentence, ie. 'Life is'"
        />
        <SubmitButton isLoading={isLoading} type="submit" onClick={handleSubmit}>
          <ButtonIcon>💡</ButtonIcon>
        </SubmitButton>
      </Form>

      <Quotes isLoading={isLoading}>
        {
          quotes
            ? quotes.map((quote, index) => <Quote isLoading={isLoading} key={`quote${index}`}>{`${quote}`}.</Quote>)
            : 'loading'
        }
      </Quotes>

      <Controls>
        <Control>
          <ControlLabel htmlFor="numberOfQuotes"># Quotes</ControlLabel>
          <ControlValue>{numberOfQuotes}</ControlValue>
          <SliderControl type="range" value={numberOfQuotes} name="numberOfQuotes" min={1} max={5} onChange={(e) => setNumberOfQuotes(Number(e.target.value))} />
        </Control>
        <Control>
          <ControlLabel htmlFor="maxQuoteLength">Max Length</ControlLabel>
          <ControlValue>{maxQuoteLength}</ControlValue>
          <SliderControl type="range" value={maxQuoteLength} name="maxQuoteLength" min={10} max={1000} step={10} onChange={(e) => setMaxQuoteLength(Number(e.target.value))} />
        </Control>
        <Control>
          <ControlLabel htmlFor="topK">Top K</ControlLabel>
          <ControlValue>{topK}</ControlValue>
          <SliderControl type="range" value={topK} name="topK" min={0} max={150} step={5} onChange={(e) => setTopK(Number(e.target.value))} />
        </Control>
        <Control>
          <ControlLabel htmlFor="topP">Top P</ControlLabel>
          <ControlValue>{topP}</ControlValue>
          <SliderControl type="range" value={topP} name="topP" min={0} max={1} step={0.05} onChange={(e) => setTopP(Number(e.target.value))} />
        </Control>
        <Control>
          <ControlLabel htmlFor="temperature">Temp&deg;</ControlLabel>
          <ControlValue>{temperature}</ControlValue>
          <SliderControl type="range" value={temperature} name="temperature" min={0} max={1} step={0.01} onChange={(e) => setTemperature(Number(e.target.value))} />
        </Control>
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

export default App;