import React, { useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';
import Definition from './Definition';
import { posList } from '../DataPOS';
import { Item } from '../@types/@types';

function SearchWord() {
  /***** STATES *****/
  const [word, setWord] = useState<null | string>(null);
  const [Items, setItems] = useState<null | Item[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  let [PartOfSpeech, setPartOfSpeech] = useState<string | null>(null);
  const [error, setError] = useState<null | string>(null);

  /***** FUNCTIONS *****/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${BASE_URL}/${word!.replace(/[^a-zA-Z ]/g, '')}`
      );

      if (res.data.Items.length === 0) {
        throw new Error('no result of this word');
      }
      setItems(res.data.Items);
      // }
    } catch (error: any) {
      setError(error.message);
      setItems(null);
    }
    setLoading(false);
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/${word}/${PartOfSpeech}`);
      if (res.data.Items.length === 0) {
        throw new Error('no result by word & POS');
      }
      setItems(res.data.Items);
    } catch (error: any) {
      setError(error.message);
      setItems(null);
    }
    setLoading(false);
  };

  return (
    <form id={'form-word'} onSubmit={e => handleSubmit(e)}>
      <h3 className="headers-h5">Search Word</h3>
      <button
        onClick={e => handleSubmit(e)}
        className="btn-search"
        id="search-word-btn"
      >
        <i className="fas fa-search"></i>
      </button>
      <div className="search-box">
        <input
          type="input"
          className="form__field"
          placeholder="Type to Search..."
          name="name"
          value={word ? word : ''}
          onChange={e => handleChange(e)}
          id="name"
          required
        />
        <label htmlFor="name" className="form__label">
          Search Word...
        </label>

        <h2 style={{ textAlign: 'left' }}>
          You can search word with specific pos
        </h2>
        <ul className="choose-pos">
          <li>
            Choose Part Of Speech:
            <ul className="dropdown">
              {posList.map((part, i) => {
                return (
                  <li key={i}>
                    <a onClick={() => setPartOfSpeech(part.value)}>
                      {part.key}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
        <span className="part-result" id="word-part-result">
          {PartOfSpeech}
        </span>
        <button className="search-both" onClick={e => handleClick(e)}>
          Word & POS
        </button>
      </div>

      {loading && <h2 className="animate">Loading</h2>}
      {Items &&
        Items.map((item: Item) => {
          return (
            <div key={item.pos} className="item">
              <div className="item-pos">[{item.pos}]</div>
              <div className="item-definitions">
                {item.definitions.map((definition: string, index: number) => {
                  return (
                    <Definition
                      key={index}
                      definition={definition}
                      setItems={setItems}
                      setLoading={setLoading}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      {error && <h2 className="animate">{error}</h2>}
    </form>
  );
}

export default SearchWord;
