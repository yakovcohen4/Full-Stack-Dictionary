import pic from './../Data/error3.png';

function ErrorPage({ wordError }: { wordError: string }) {
  return (
    <div className="error-div">
      <img src={pic} alt="error-pic" className="img-error" />
      <h1 className="error-header">We are sorry</h1>
      <div className="error-explanation">
        We've search more 100,000 words, but did not match{' '}
        <span>{wordError}</span>.
      </div>
    </div>
  );
}

export default ErrorPage;
