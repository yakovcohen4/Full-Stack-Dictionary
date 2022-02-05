export interface FullDefinitions {
  definition: string;
  // handleSubmit: handleSubmitSearchWord | handleSubmitPartOfSpeech;
  setItems: React.Dispatch<any>;
  setLoading: React.Dispatch<boolean>;
}

// type handleSubmitSearchWord = (
//   e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
// ) => Promise<void>;

// type handleSubmitPartOfSpeech = (
//   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
// ) => Promise<void>;
