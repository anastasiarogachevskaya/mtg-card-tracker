import axios from 'axios';
import React, { useState, useEffect } from 'react';

type Deck = {
  _id: string;
  name: string;
  deck: string;
};

const DeckList = ({ email }: { email: string }) => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/decks/get?user=${email}`)
      .then(res => {
        if (res.status === 200) {
          setDecks(res.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      }
    );
  }, [email]);
  
  
  return (
    <div>
      <h2>Deck List</h2>
      {!loading && decks.map((deck:Deck) => {
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