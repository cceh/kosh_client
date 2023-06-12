const Footer = () => {
  return (
    <footer class="text-center text-white bg-dark w-screen">
      <div class="container p-6">
        <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div class="mb-6 lg:mb-0">
            <a
              href="https://uni-koeln.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="logo_uzk_weiss.png"
                width="70px"
                className="d-inline-block align-top"
                alt=""
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
          </div>
          <div class="mb-6 lg:mb-0">
            <a
              href="https://cceh.uni-koeln.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="logo_cceh_weiss.png"
                width="70px"
                className="d-inline-block align-top"
                alt=""
              />
            </a>
          </div>
          <div class="mb-6 lg:mb-0">
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
      </div>
    </footer>
  );
};

export default Footer;
