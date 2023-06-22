import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <img className="footer__img" src="pets.svg" alt="" aria-hidden='true' />}
      <footer className="footer">
        <p>Developed by <a href="https://sumitportfolio2003.netlify.app/" target='_blank' rel="noreferrer">Sumit Agarwal</a>.</p>
      </footer>
    </>
  );
};

export default Footer;