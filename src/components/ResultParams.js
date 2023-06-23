import { useContext } from "react";
import Context from "../data/Context";
import Spinner from "../ui/Spinner";
import CheckboxList from "../ui/CheckboxList";

const ResultParams = () => {
  const {
    loading,
    display_fields,
    setDisplayFields,
  } = useContext(Context);

  const isChecked = () => {
    return Object.keys(display_fields).filter(
      (key) => display_fields[key] === true
    );
  };

  const selectDisplayFields = (e) => {
    setDisplayFields((prevFields) => ({
      ...prevFields,
      [e.target.id]: e.target.checked,
    }));
  };

  return (
    <div className="flex flex-row m-2 justify-between pb-2 flex-wrap">
      <div className="flex flex-col">
        {loading ? (
          <Spinner />
        ) : (
          <CheckboxList
            label="Display fields: "
            items={Object.keys(display_fields)}
            preselected={isChecked()}
            onChange={selectDisplayFields}
          />
        )}
      </div>
    </div>
  );
};

export default ResultParams;
