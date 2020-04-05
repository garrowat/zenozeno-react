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
  grid-template: 20px 70px 50px auto auto auto 1fr 1fr
  / 25px 1fr 25px;
  grid-gap: 10px;
`;

const Title = styled.span`
  grid-area: 2 / 2 / 3 / 3;
  align-self: end;
  color: #f4af13;
  font-size: calc(32px + 5vmin);
  font-weight: 100;
`;

const Description = styled.span`
  grid-area: 3 / 2 / 4 / 3;
  place-self: start stretch;
  font-size: calc(14px + 2vmin);
  padding-bottom: 18px;
`;

const Form = styled.form`
  grid-area: 4 / 2 / 5 / 3;
  place-self: center stretch;
  display: flex;
  align-items: center;
`;

const Quotes = styled.div`
  grid-area: 5 / 2 / 6 / 3;
  align-self: center;
  width: 76.5vw;
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
  padding-left: 10px;
  font-family: 'Roboto Mono', monospace;
  font-size: calc(12px + 1vmin);
  opacity:${ props => props.isLoading ? '0' : '1' };
  transition: all 0.2s ease-in-out;

  &:not(:last-child) {
    border-bottom: 1px solid #ebebe6;
  };
`;

const MenuBar = styled.div`
  grid-area: 6 / 2 / 7 / 3;
  width: 81vw;
  padding-left: 1px;
  display: grid;
  grid-gap: 10px;
`;

const MenuItem = styled.div`
  padding: 5px 10px 5px 10px;
  color: #777;
  font-size: 16px;
  font-family: 'Roboto Mono', monospace;
  font-weight: bold;
  border-radius: 1px;
  background: #f7f7f2;
  transition: all 0.2s ease-out;
  box-shadow:  3px 3px 4px #ebebe6,
              -3px -3px 4px #fffffe;

  ${MenuHeader}:hover & {
    box-shadow:  7px 7px 12px #d3d2c2,
                -7px -7px 12px #ffffff;
  }
`;

const MenuHeader = styled.p`
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  cursor: pointer;
  user-select: none;
`;

const Controls = styled.div`
  grid-area: 7 / 2 / 8 / 3;
  place-self: center stretch;
  display: ${
    props => props.showOptions
      ? 'flex'
      : 'none'
  };
  height: ${
    props => props.showOptions && '100%'
  };
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  transition: all 0.2s ease-out;
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
  flex: 0 0 1;
`;

const ControlLabel = styled.label`
  font-size: 12px;
`;

const ControlValue = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const About = styled.div``;

const Github = styled.div``;

const Indicator = styled.div`
  grid-area: 4 / 1 / 5 / 2;
  place-self: center end;
  height: calc(20px + 5vmin);
  width: 5px;
  transition: all 0.5s ease-in-out;
  background: ${
    props => props.hasError
      ? '#ff7766'
      : props => props.quotes.length === 0 && !props.isLoading
        ? '#f7f7f2'
        : props => props.isLoading ? '#fcdd44' : '#99ee99'
  };
  border-radius: 1px;
  box-shadow: ${
    props => props.hasError
      ? 'inset 1px 1px 3px #d3d2c2, 0 0 10px #ff7766'
      : props => props.quotes.length === 0
        ? 'inset 1px 1px 3px #d3d2c2'
        : props => props.isLoading
          ? 'inset 1px 1px 3px #d3d2c2, 0 0 10px #fdee77, 0 0 20px #fdee77'
          : 'inset 1px 1px 3px #d3d2c2, 0 0 10px #99ee99'
  };
`;

const InputField = styled.input`
  height: calc(15px + 5vmin);
  border: none;
  border-radius: 2px;
  background: #fdfdfb;
  box-shadow: inset 3px 3px 5px #d3d2c2,
            inset -3px -3px 5px #ffffff;
  font-family: 'Roboto', sans-serif;
  font-size: calc(10px + 2vmin);
  flex: 0 0 65vw;
  padding: 10px;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 5px;
  background: #f7f7f2;
  box-shadow:  ${props => props.isLoading
    ? '0px 0px 0px #d3d2c2, \
      -0px -0px 0px #ffffff'
    : '5px 5px 10px #d3d2c2, \
      -5px -5px 10px #ffffff'};
  flex: 0 0 1;
  padding: calc(8px + 1vmin);
  margin-left: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: calc(10px + 2vmin);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow:  7px 7px 12px #d3d2c2,
                -7px -7px 12px #ffffff;
  }
`;

const SliderControl = styled.input`
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
  // Quotes and Query
  const [quotes, setQuotes] = useState([]);
  const [inputField, setInputField] = useState('');

  // Controls
  const [numberOfQuotes, setNumberOfQuotes] = useState(2);
  const [maxQuoteLength, setMaxQuoteLength] = useState(100);
  const [topK, setTopK] = useState(40);
  const [topP, setTopP] = useState(0.9);
  const [temperature, setTemperature] = useState(0.7);

  // API Fetch State
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Information and Options
  const [showOptions, setShowOptions] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showGithub, setShowGithub] = useState(false);

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
    setHasError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getQuotes(ENDPOINT, inputField);
  };

  const handleExpand = (item) => {
    switch (item) {
      case 'options':
        setShowOptions(!showOptions);
        break;

      case 'about':
        setShowControls(!showAbout);
        break;

      case 'github':
        setShowControls(!showGithub);
        break;
    };
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

      <MenuBar>
        <MenuItem>
          <MenuHeader onClick={() => handleExpand('options')}>
            <span>Options</span><span>⮟</span>
          </MenuHeader>
          <Controls showOptions={showOptions}>
            <Control>
              <ControlLabel htmlFor="numberOfQuotes"># Quotes</ControlLabel>
              <SliderControl type="range" value={numberOfQuotes} name="numberOfQuotes" min={1} max={5} onChange={(e) => setNumberOfQuotes(Number(e.target.value))} />
              <ControlValue modifier={numberOfQuotes}>{numberOfQuotes}</ControlValue>
            </Control>

            <Control>
              <ControlLabel htmlFor="maxQuoteLength">Max Length</ControlLabel>
              <SliderControl type="range" value={maxQuoteLength} name="maxQuoteLength" min={10} max={1000} step={10} onChange={(e) => setMaxQuoteLength(Number(e.target.value))} />
              <ControlValue modifier={numberOfQuotes}>{maxQuoteLength}</ControlValue>
            </Control>

            <Control>
              <ControlLabel htmlFor="topK">Top K</ControlLabel>
              <SliderControl type="range" value={topK} name="topK" min={0} max={150} step={5} onChange={(e) => setTopK(Number(e.target.value))} />
              <ControlValue modifier={numberOfQuotes}>{topK}</ControlValue>
            </Control>

            <Control>
              <ControlLabel htmlFor="topP">Top P</ControlLabel>
              <SliderControl type="range" value={topP} name="topP" min={0} max={1} step={0.05} onChange={(e) => setTopP(Number(e.target.value))} />
              <ControlValue modifier={numberOfQuotes}>{topP}</ControlValue>
            </Control>

            <Control>
              <ControlLabel htmlFor="temperature">Temp&deg;</ControlLabel>
              <SliderControl type="range" value={temperature} name="temperature" min={0} max={1} step={0.01} onChange={(e) => setTemperature(Number(e.target.value))} />
              <ControlValue modifier={numberOfQuotes}>{temperature}</ControlValue>
            </Control>
          </Controls>
        </MenuItem>
        <MenuItem>
          <MenuHeader>About</MenuHeader>
          <About showAbout={showAbout}>
            <p>Zenozeno is an AI quote bot that does its very best to sound human by predicting the next word in a sequence until it hits a period. </p>
            <p>Under the hood, Zenozeno was made by fine-tuning the 117M (small) version of OpenAI's GPT-2 language model. The model was fine-tuned on a dataset of </p>
          </About>
        </MenuItem>
        <MenuItem>
          <MenuHeader>Github</MenuHeader>
          <Github showGithub={showGithub}>
            Frontend: Backend:
          </Github>
        </MenuItem>
      </MenuBar>

    </GridContainer>
  );
};

export default App;