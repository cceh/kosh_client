const Footer = () => {
  return (
    <footer className="bg-dark p-6 w-screen">
      <div className="grid grid-cols-3 content-center">
        <div className="mb-2 lg:mb-0">
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
        <div className="mb-2 lg:mb-0">
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
        <div className="mb-2 lg:mb-0">
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
