'use client'


const Dropdown = ({ items, label, preselected, onChange }) => {
  if (items === undefined || !items.length) {
    return null;
  }

  const dropdownList = items.map((item) => (
    <option id={item} key={"option_" + item} value={item}>
      {item}
    </option>
  ));

  return (
    <form className="mr-2 inline-flex flex-auto">
      <label>{label}</label>
      <select
        onChange={onChange}
        value={preselected}
        className="ml-2 form-select text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:border-blue-500 focus:ring focus:outline-none focus:text-gray-700 focus:bg-white cursor-pointer"
      >
        {dropdownList}
      </select>
    </form>
  );
};

export default Dropdown;
