import './App.css';
import './components/SearchBar'
import SearchBar from './components/SearchBar';
import GifList from './components/GifList'
import React from 'react';

// best practice is for URL to be configurable, in conf file 
const baseURL = "https://api.giphy.com/v1/gifs/search?";
const apiKey = 'B92Jpi4xqOYygEMQCCokbAI9fIJM7v5k';

function App() {
  const gifListRef = React.useRef();

  return (
    <div className="App">
      <SearchBar onSearch={searchTerm => gifListRef.current.getGifs(searchTerm)} onClear={() => gifListRef.current.clearGifs()}/>
      <GifList ref={gifListRef} baseURL={baseURL} apiKey={apiKey} />  
    </div>
  );
}

export default App;
