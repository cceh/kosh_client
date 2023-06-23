const Spinner = () => {
  return (
    <div className="rounded-full justify-center items-center bg-main opacity-60 h-10 w-10 animate-spin dark:bg-white dark:opacity-100">
      <div className="bg-white h-5 w-5 rounded-full translate-x-2 translate-y-2 dark:bg-main">
        <div className="bg-off h-2 w-2 rounded-full translate-x-2 translate-y-2"></div>
      </div>
    </div>
  );
};

export default Spinner;
