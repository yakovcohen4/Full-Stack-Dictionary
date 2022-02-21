// types
import { Item } from '../@types/@types';
import { ResultSearchProps } from '../@types/@types';
// Components
import Definition from './Definition';

const ResultSearch = ({
  data,
  setData,
  setLoading,
  setError,
}: ResultSearchProps) => {
  return (
    <div className="result-items">
      {data.map((data: Item) => {
        return (
          <div key={data.pos} className="item">
            <div className="item-pos">[{data.pos}]</div>
            <div className="item-definitions">
              {data.definitions.map((definition: string, index: number) => {
                return (
                  <Definition
                    key={index}
                    definition={definition}
                    setItems={setData}
                    setLoading={setLoading}
                    setError={setError}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultSearch;
