const CheckboxList = ({ label, items, preselected, onChange }) => {
  if (!items.length) {
    return null;
  }

  const checkboxList = items.map((item) => (
    <div key={"checkbox_" + item}>
      <input
        id={item}
        key={"input_" + item}
        type="checkbox"
        defaultChecked={preselected.includes(item)}
        onChange={onChange}
        className="m-1 cursor-pointer"
      />
      <label className="m-1">{item}</label>
    </div>
  ));

  return (
    <div className="flex flex-row">
      <label className="mr-3">{label}</label>
      {checkboxList}
    </div>
  );
};

export default CheckboxList;
