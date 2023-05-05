const Dropdown = ({ fields, label, preselected, onc }) => {
  if (!fields.length) {
    return null;
  }

  const selectList = fields.map(field => {
      return (
        <option
          id={"ID_" + field}
          key={"field_option_" + field}
          value={field}>
          {field}
        </option>
      )
  })

  return (
    <form group={"select_" + label} className="mr-2 inline-flex flex-auto ">
      <label>{label}</label>
      <select onChange={onc} value={preselected} className="ml-2 form-select text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:border-blue-500 focus:ring focus:outline-none focus:text-gray-700 focus:bg-white cursor-pointer">
        {selectList}
      </select>
    </form>
  );
}

export default Dropdown;
