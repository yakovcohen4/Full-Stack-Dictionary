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
      // if word is not a letters in english, throw error
      const wordValid = /^[a-z]+$/gi.test(word!);
      if (!wordValid) {
        setLoading(false);
        throw new Error('not a word in English');
      }

      // search word or word & part of speech
      if (PartOfSpeech === null) {
        const res = await axios.get(`${BASE_URL}/${word}`);
        setItems(res.data.Items);
        setLoading(false);
      } else {
        const res = await axios.get(`${BASE_URL}/${word}/${PartOfSpeech}`);
        setItems(res.data.Items);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);

      // Error from the back
      if (error.response) {
        // different Error - with POS or without POS
        error.response.data.error === 'no result for this word'
          ? setError(`${word}.`)
          : setError(`${word} & ${PartOfSpeech}`);
      }
      // Error from the front
      else {
        setError(error.message);
      }
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
        <ErrorPage wordError={error} setError={setError} />
      ) : (
        <form className="form-tag" onSubmit={e => handleSubmit(e)}>
          <h3 className="headers-h5">Search Word</h3>
          <div className="form-search">
            <h2 className="form-explanation-search-h2">
              You can search words or search words with a specific part of
              speech.
              <br /> Also, you can search by clicking on the result words.
            </h2>
            <div className="form-box-search-and-pos-desktop">
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
                    Part Of Speech:{' '}
                    <i className="fa-solid fa-square-caret-down"></i>
                    <ul>
                      <li>
                        <span onClick={() => setPartOfSpeech(null)}>
                          {'All'}
                        </span>
                      </li>
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
          </div>

          {Items && (
            <div className="result">
              <span className="word-result">{Items[0].word}</span>
              <ResultSearch
                data={Items}
                setData={setItems}
                setLoading={setLoading}
                setError={setError}
              />
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default SearchWord;
