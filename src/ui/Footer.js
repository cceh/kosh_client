import uzk_logo from "../assets/logo_uzk_weiss.png";
import cceh_logo from "../assets/logo_cceh_weiss.png";
import dch_logo from "../assets/logo_dch_weiss.png";

const Footer = () => {
  return (
    <footer className="flex flex-row bg-dark py-4">
      <div className="grid grid-flow-col w-full justify-evenly">
        <a
          href="https://uni-koeln.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={uzk_logo} width="70px" alt="Logo University of Cologne" />
        </a>
        <a
          href="https://cceh.uni-koeln.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={cceh_logo}
            width="70px"
            alt="Logo Cologne Center for eHumanities"
          />
        </a>
        <a
          href="https://dch.uni-koeln.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={dch_logo}
            width="100px"
            alt="Logo Data Center for the Humanities"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
