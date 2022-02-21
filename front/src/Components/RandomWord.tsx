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

function RandomWord() {
  /***** STATES *****/
  const [PartOfSpeech, setPartOfSpeech] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<null | Item[]>(null);
  const [error, setError] = useState<null | string>('null');

  /***** FUNCTIONS *****/
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // setData(null);
    try {
      const part =
        PartOfSpeech === null
          ? posList[Math.floor(Math.random() * posList.length)].value
          : PartOfSpeech;
      const res = await axios.get(`${BASE_URL}/part-of-speech/${part}`);
      setLoading(false);
      if (res.data === 'no result for part of speak') {
        throw new Error('no result for part of speak');
      }
      setData([res.data]);
    } catch (error: any) {
      setError(error.message);
      setData(null);
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
        <form className="form-tag">
          <h3 className="headers-h5">Random Word - POS</h3>
          <div className="form-search">
            <h2 className="form-explanation-search-h2">
              You can search random word and get all part of speech, or search
              with specific part of speech.
            </h2>

            <div className="form-div-choose-pos">
              <ul className="choose-pos">
                <li>
                  Choose Part Of Speech:{' '}
                  <i className="fa-solid fa-square-caret-down"></i>
                  <ul>
                    <li>
                      <span onClick={() => setPartOfSpeech(null)}>
                        {'Random'}
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
                {PartOfSpeech ? PartOfSpeech : 'Random'}
              </span>
            </div>
            <div id={'search-box-pos'}>
              <button
                className="form-btn-search"
                onClick={e => handleSubmit(e)}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          {data && (
            <ResultSearch
              data={data}
              setData={setData}
              setLoading={setLoading}
              setError={setError}
            />
          )}
        </form>
      )}
    </div>
  );
}

export default RandomWord;
