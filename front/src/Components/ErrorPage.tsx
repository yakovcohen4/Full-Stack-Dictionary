import pic from './../Data/error3.png';

function ErrorPage({
  wordError,
  setError,
}: {
  wordError: string;
  setError: Function;
}) {
  const errorHandle = async () => {
    setError(null);
  };

  return (
    <div className="error-div">
      <img src={pic} alt="error-pic" className="img-error" />
      <h1 className="error-header">We are sorry</h1>
      {wordError === 'not a word in English' ? (
        <div className="error-explanation">
          Try to search only words in <span>english.</span>
        </div>
      ) : (
        <div className="error-explanation">
          We've search more 100,000 words, but did not match{' '}
          <span>{wordError}</span>.
        </div>
      )}
      <button className="button button--mimas" onClick={() => errorHandle()}>
        <span>back to search</span>
      </button>
    </div>
  );
}

export default ErrorPage;
