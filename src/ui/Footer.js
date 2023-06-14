const Footer = () => {
  return (
    <footer className="bg-dark py-6 flex flex-row items-center justify-center">
      <div className="grid grid-flow-col auto-cols-max">
        <div className="w-64 mb-2 lg:mb-0">
          <a
            href="https://uni-koeln.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="logo_uzk_weiss.png"
              width="70px"
              alt="Logo University of Cologne"
            />
          </a>
        </div>
        <div className="w-64 mb-2 lg:mb-0">
          <a
            href="https://cceh.uni-koeln.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="logo_cceh_weiss.png"
              width="70px"
              alt="Logo Cologne Center for"
            />
          </a>
        </div>
        <div className="w-64 mb-2 lg:mb-0">
          <a
            href="https://dch.uni-koeln.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="logo_dch_weiss.png"
              width="100px"
              className="d-inline-block align-top"
              alt=""
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
