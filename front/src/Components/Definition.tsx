import axios from 'axios';
import { nanoid } from 'nanoid';
import { MouseEvent } from 'react';
import { FullDefinitions } from '../@types/@types';
import { BASE_URL } from '../App';

function Definitions({
  definition,
  setItems,
  setLoading,
  setError,
}: FullDefinitions) {
  /***** FUNCTIONS *****/
  const searchByClick = async (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
  ) => {
    const word = (e.target as HTMLSpanElement).innerHTML.slice(0, -1);
    console.log(word);

    const wordFilter = word.replace(/[^a-zA-Z ]/g, '');
    console.log(wordFilter);

    setLoading(true);

    try {
      // if word is empty -> dont send to server
      if (wordFilter === ' ') {
        setLoading(false);
        throw new Error('search again');
      }

      const res = await axios.get(`${BASE_URL}/${wordFilter}`);

      // if Data in not array
      if (res.data.Items.length) {
        setItems(res.data.Items);
      } else {
        setItems([res.data.Items]);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      // Error from the back
      if (error.response) {
        setError(`${wordFilter}`);
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

  const definitionArr = definition.split(' ');
  return (
    <div className="one-definition">
      {definitionArr.map(definition => {
        return (
          <span
            key={nanoid()}
            onClick={e => {
              searchByClick(e);
            }}
          >
            {definition + ' '}
          </span>
        );
      })}
      <hr />
    </div>
  );
}

export default Definitions;
