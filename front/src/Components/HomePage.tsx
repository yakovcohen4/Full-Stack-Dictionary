const HomePage = () => {
  return (
    <div className="homepage-div">
      <h3 className="headers-h5">Home Page</h3>
      <div className="para">
        <span>
          <p>Welcome to my Dictionary</p>
          <img
            src="https://c.tenor.com/JlDEHKKYppEAAAAi/dictionaries-research.gif"
            alt="dictionary"
            width={150}
            height={150}
            style={{
              position: 'relative',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          <p>In my dictionary you can search by:</p>
        </span>
        <ul>
          <li>Word</li>
          <li>Word with a specific part of speech</li>
          <li>A random word from a specific part of speech</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
