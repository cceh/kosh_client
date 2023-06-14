const ToTopButton = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={goToTop}
      key="btn-go-to-top"
      className="text-white bg-main right-5 inline-block rounded-full p-2 uppercase leading-normal transition duration-150 ease-in-out hover:shadow-lg active:shadow-lg active:bg-danger-700 focus:bg-danger-600 focus:shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        strokeWidth="2.5"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ToTopButton;
