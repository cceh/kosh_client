import sorted from "../utils/sorted";

const CheckboxList = ({ label, items, preselected, onChange }) => {
  if (!items.length) {
    return null;
  }

  const checkboxList = sorted(items).map((item) => (
    <div key={"checkbox_" + item}>
      <input
        id={item}
        key={"input_" + item}
        type="checkbox"
        defaultChecked={preselected.includes(item)}
        onChange={onChange}
        className="mx-2 cursor-pointer"
      />
      <label className="">{item}</label>
    </div>
  ));

  return (
    <div className="flex flex-row flex-wrap max-w-full">
      <label className="px-2">{label}</label>
      {checkboxList}
    </div>
  );
};

export default CheckboxList;
