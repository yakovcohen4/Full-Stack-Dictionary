import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const mySidenav = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const openNav = () => {
    if (mySidenav.current !== null) {
      mySidenav.current.style.width = '250px';
    }
  };
  const closeNav = () => {
    if (mySidenav.current !== null) {
      mySidenav.current.style.width = '0';
    }
  };
  return (
    <span>
      <span ref={mySidenav} id="mySidenav" className="sidenav">
        <span className="closebtn" onClick={closeNav}>
          &times;
        </span>
        <span
          onClick={() => {
            navigate('/');
            closeNav();
          }}
        >
          Home
        </span>
        <span
          onClick={() => {
            navigate('/word/');
            closeNav();
          }}
        >
          Search Words
        </span>

        <span
          onClick={() => {
            navigate('/part-of-speech/');
            closeNav();
          }}
        >
          Random Words
        </span>
      </span>

      <span className="open-nav" onClick={openNav}>
        ☰
      </span>
    </span>
  );
};

export default NavBar;
