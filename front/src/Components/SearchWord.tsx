import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';
// data
import { posList } from '../Data/PartOfSpeechList';
// types
import { Item } from '../@types/@types';
// Components
import Loading from './Loading';
import ResultSearch from './ResultSearch';
import ErrorPage from './ErrorPage';

function SearchWord() {
  /***** STATES *****/
  const [word, setWord] = useState<null | string>(null);
  const [Items, setItems] = useState<null | Item[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [PartOfSpeech, setPartOfSpeech] = useState<string | null>(null);
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
      // search word or word & part of speech
      if (PartOfSpeech === null) {
        const res = await axios.get(`${BASE_URL}/${word}`);
        setLoading(false);
        if (res.data.Items.length === 0) {
          throw new Error(`no result for ${word}`);
        }
        setItems(res.data.Items);
      } else {
        const res = await axios.get(`${BASE_URL}/${word}/${PartOfSpeech}`);
        setLoading(false);
        if (res.data.Items.length === 0) {
          throw new Error(`no result for ${word} & part of speech`);
        }
        setItems(res.data.Items);
      }
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 6000);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage wordError={error} />
      ) : (
        <form className="form-tag" onSubmit={e => handleSubmit(e)}>
          <h3 className="headers-h5">Search Word</h3>
          <div className="form-search">
            <h2 className="form-explanation-search-h2">
              You can search words and get all definitions about the word, or
              search words with a specific part of speech.
            </h2>
            <div className="form-search-box-div">
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

              <button className="form-btn-search">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="form-div-choose-pos">
              <ul className="choose-pos">
                <li>
                  Choose Part Of Speech:{' '}
                  <i className="fa-solid fa-square-caret-down"></i>
                  <ul>
                    {posList.map((part, i) => {
                      return (
                        <li key={i}>
                          <span onClick={() => setPartOfSpeech(part.value)}>
                            {part.key}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
              <span className="span-part-of-speech-choose">
                {PartOfSpeech ? PartOfSpeech : 'All'}
              </span>
            </div>
          </div>

          {Items && (
            <ResultSearch
              data={Items}
              setData={setItems}
              setLoading={setLoading}
              setError={setError}
            />
          )}
        </form>
      )}
    </div>
  );
}

export default SearchWord;
