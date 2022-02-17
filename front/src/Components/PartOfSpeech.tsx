import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';
// data
import { posList } from '../Data/PartOfSpeechList';
// types
import { Item } from '../@types/@types';
// Components
import Loading from './Loading';
import Definition from './Definition';
import ResultSearch from './ResultSearch';

function PartOfSpeech() {
  /***** STATES *****/
  let [PartOfSpeech, setPartOfSpeech] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<null | Item[]>(null);
  const [error, setError] = useState<null | string>(null);

  /***** FUNCTIONS *****/
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const part =
        PartOfSpeech === null
          ? posList[Math.floor(Math.random() * posList.length)].value
          : PartOfSpeech;
      const res = await axios.get(`${BASE_URL}/part-of-speech/${part}`);
      setLoading(false);
      // if (res.status === 200) {
      //   console.log(res);
      //   console.log(res.data);
      if (res.data === 'no result for part of speak') {
        throw new Error('no result for part of speak');
      }
      setData([res.data]);
      // }
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
      <form role="navigation" className="primary-navigation">
        <h3 className="headers-h5" id="header-pos">
          Random Word by POS
        </h3>
        <button className="btn-search" onClick={e => handleSubmit(e)}>
          <i className="fas fa-search"></i>
        </button>
        <ul>
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
        <span className="part-result">{PartOfSpeech}</span>
      </form>
      {loading && <h2 className="animate">Loading</h2>}
      {data &&
        data.map((data: Item) => (
          <div key={data.pos}>
            <div className="word-div">
              The random word: <span className="word">{data.word}</span>
      {loading ? (
        <Loading />
      ) : (
            </div>
            <div className="item">
              <div className="item-pos">[{data.pos}]</div>
              <div className="item-definitions">
                {data.definitions.map((definition: string, index: number) => {
                  return (
                    <Definition
                      key={index}
                      definition={definition}
                      setItems={setData}
                      setLoading={setLoading}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      {error && <h2 className="animate">{error}</h2>}
          {data && (
            <ResultSearch
              data={data}
              setData={setData}
              setLoading={setLoading}
            />
    </div>
  );
}

export default PartOfSpeech;
