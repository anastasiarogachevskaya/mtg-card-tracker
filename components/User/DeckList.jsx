import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DeckList = ({ email }) => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const res = await axios.get(`/api/decks/get?user=${email}`);
    if (res.status === 200) {
      setDecks(res.data);
      setLoading(false);
    }
  }, [email]);
  
  
  return (
    <div>
      <h2>Deck List</h2>
      {!loading && decks.map(deck => {
        return (
          <div key={deck._id}>
            {deck.deck}
          </div>
        )
      })}
    </div>
  );
}

export default React.memo((DeckList));