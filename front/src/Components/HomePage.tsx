const HomePage = () => {
  return (
    <div className="homepage-div">
      <h3 className="headers-h5">Home Page</h3>
      <h3 className="headers-h5">Yakov</h3>
      <div className="para">
        <span>
          <p>Welcome to my Dictionary</p>
          <p>In my dictionary you can search by:</p>
        </span>
        <ul>
          <li>Words and get all part of speech</li>
          <li>Words with a specific part of speech</li>
          <li>Get random words from a specific part of speech</li>
          <li>Get random words in random parts of speech</li>
          <li>
            By clicking on any of the words in the results, you can search and
            get all definition of the word!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
