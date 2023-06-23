import { useState, useEffect } from "react";

const BackToTopBtn = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setShowButton(window.scrollY > 400);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {showButton && (
        <button
          onClick={handleClick}
          className="fixed bottom-5 right-8 z-50 bg-slate-700 text-white rounded-lg uppercase leading-normal transition duration-150 ease-in-out hover:shadow-lg active:shadow-lg active:bg-danger-700 focus:bg-danger-600 focus:shadow-lg p-2"
        >
          <svg
            class="flex-shrink-0 mx-2 h-5 w-5 text-white rotate-270"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default BackToTopBtn;
