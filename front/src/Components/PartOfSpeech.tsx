import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';
import Definition from './Definition';
import { posList } from '../DataPOS';

function PartOfSpeech() {
  /***** STATES *****/
  let [PartOfSpeech, setPartOfSpeech] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<null | any>(null);

  /***** FUNCTIONS *****/
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/part-of-speech/${PartOfSpeech}`);
      if (res.status === 200) {
        if (res.data.definitions.length === 0) {
          throw new Error('no result of this word');
        }
        setData([res.data]);
      }
      setPartOfSpeech(null);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <form role="navigation" className="primary-navigation">
        <h3 className="headers-h5" id="header-pos">
          Part Of Speech
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
        data.map((data: any) => (
          <div>
            <div className="word-div">
              The random word: <span className="word">{data.word}</span>
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
    </div>
  );
}

export default PartOfSpeech;
