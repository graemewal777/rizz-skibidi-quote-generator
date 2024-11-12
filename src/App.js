import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faDiscord } from '@fortawesome/free-brands-svg-icons';

const App = () => {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/random-quote');
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Failed to load a quote. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (quote) {
      navigator.clipboard.writeText(quote).then(() => {
        alert('Quote copied to clipboard!');
      });
    }
  };

  const shareOnTwitter = () => {
    if (quote) {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}&hashtags=SkibidiRizz,BrainRot`;
      window.open(twitterUrl, '_blank');
    }
  };

  const shareOnFacebook = () => {
    if (quote) {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        quote
      )}`;
      window.open(facebookUrl, '_blank');
    }
  };

  const shareOnDiscord = () => {
    if (quote) {
      const discordUrl = `https://discord.com/channels/@me`;
      alert("Copy and paste this quote into Discord!");
      window.open(discordUrl, '_blank');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Rizz Skibidi Brain Rot Quote Generator</h1>
      </header>
      <main>
        <div className="quote-box">
          {loading ? <p>Loading...</p> : <p>{quote || 'Click the button to generate your first quote!'}</p>}
        </div>
        <button onClick={fetchQuote} disabled={loading}>Generate Quote</button>
        <button onClick={copyToClipboard} disabled={!quote || loading}>Copy Quote</button>
        <div className="share-buttons">
          <button onClick={shareOnTwitter} disabled={!quote || loading}>
            <FontAwesomeIcon icon={faTwitter} /> Share on Twitter
          </button>
          <button onClick={shareOnFacebook} disabled={!quote || loading}>
            <FontAwesomeIcon icon={faFacebook} /> Share on Facebook
          </button>
          <button onClick={shareOnDiscord} disabled={!quote || loading}>
            <FontAwesomeIcon icon={faDiscord} /> Share on Discord
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;