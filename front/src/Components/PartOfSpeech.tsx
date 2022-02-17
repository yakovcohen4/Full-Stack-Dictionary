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
      const res = await axios.get(`${BASE_URL}/part-of-speech/${PartOfSpeech}`);
      if (res.status === 200) {
        if (res.data.definitions.length === 0) {
          throw new Error('no result of this word');
        }
        setData([res.data]);
      }
      setPartOfSpeech(null);
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
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
    </div>
  );
}

export default PartOfSpeech;
