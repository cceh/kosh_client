const DictSelect = ({ fields, label, preselected, onc }) => {
  if (!fields.length) {
    return null;
  }

  const checkboxList = fields.map((field) => (
    <div key={"dict_div_" + field}>
      <input
        id={field}
        key={"dict_input_" + field}
        type="checkbox"
        defaultChecked={preselected.includes(field)}
        onChange={onc}
        className="m-1 cursor-pointer" />
      <label className="m-1">{field}</label>
    </div>
  ))

  return (
    <div className="flex flex-row">
      <label className="mr-3">{label}</label>{checkboxList}
    </div>
  )
}

export default DictSelect
