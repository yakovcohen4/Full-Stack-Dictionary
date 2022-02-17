export interface FullDefinitions {
  definition: string;
  // handleSubmit: handleSubmitSearchWord | handleSubmitPartOfSpeech;
  setItems: React.Dispatch<any>;
  setLoading: React.Dispatch<boolean>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

// type handleSubmitSearchWord = (
//   e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
// ) => Promise<void>;

// type handleSubmitPartOfSpeech = (
//   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
// ) => Promise<void>;

export interface Item {
  definitions: string[];
  pos: string;
  word: string;
  synonyms?: string;
}

export interface ResultSearchProps {
  data: Item[];
  setData: React.Dispatch<React.SetStateAction<Item[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
