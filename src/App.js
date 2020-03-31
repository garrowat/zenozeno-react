import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';

const App = () => {
  const [quote, setQuote] = useState('');
  const [input, setInput] = useState('');

  return (
    <div>
      <input type="text" onChange={setInput} value={input} />
      <h2></h2>
    </div>
  );
};

export default hot(module)(App);