import { useContext } from "react";
import Context from "../data/Context";
import Spinner from "../ui/Spinner";
import CheckboxList from "../ui/CheckboxList";

const ResultParams = () => {
  const { loading, display_fields, setDisplayFields } = useContext(Context);

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
    <div className="mx-4 mt-2">
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
  );
};

export default ResultParams;
