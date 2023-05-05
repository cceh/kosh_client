const DisplaySelect = ({ fields, label, preselected, onc }) => {
  if (!fields.length) {
    return null;
  }

  const checkboxList =
    fields.map(field => (
      <div key={"display_div_" + field}>
        <input
          type="checkbox"
          id={field}
          key={"display_checkbox_" + field}
          className="m-1 cursor-pointer"
          onChange={(e) => onc(e, field)}
          onClick={(e) => onc(e, field)}
          defaultChecked={preselected(field)} />
        <label htmlFor={`${field}`} key={"display_label_" + field}>{field}</label>
      </div>
    ))

  return (
    <form key="display_fields" className="inline-flex items-center">
      <label className="mr-3">{label}</label>
      {checkboxList}
    </form>
  );
}

export default DisplaySelect;