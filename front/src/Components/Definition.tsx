import axios from 'axios';
import { nanoid } from 'nanoid';
import { MouseEvent } from 'react';
import { FullDefinitions } from '../@types/@types';
import { BASE_URL } from '../App';

function Definitions({ definition, setItems, setLoading }: FullDefinitions) {
  /***** FUNCTIONS *****/
  const searchByClick = async (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
  ) => {
    const word = (e.target as HTMLSpanElement).innerHTML;

    setLoading(true);

    try {
      const res = await axios.get(
        `${BASE_URL}/${word!.replace(/[^a-zA-Z ]/g, '')}`
      );

      if (res.status === 200) {
        if (res.data.Items.length === 0) {
          throw new Error('no result of this word');
          // throw { status: 404, message: 'no result of this word' };
        }

        if (res.data.Items.length) {
          setItems(res.data.Items);
        } else {
          setItems([res.data.Items]);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
