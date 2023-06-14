import { useContext, useEffect, useState } from "react";
import { NoResultsCallout, EmptyQueryStringCallout } from "../ui/Callouts";
import Context from "../data/Context";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import ToTopButton from "../ui/ToTopButton";

const ResultRender = () => {
  const { query_string, display_fields, loading, results } =
    useContext(Context);
  const [scroll, setShowTopBtn] = useState(false);

  const available_fields = Object.keys(display_fields).filter(
    (key) => display_fields[key] === true
  );

  const ViewList = () =>
    Object.keys(results).map((key) => {
      if (results[key].length) {
        const isEmptyTable = results[key]
          .map((result) => {
            Object.keys(result).forEach(
              (field) =>
                (result[field] == null || result[field] === "NNN") &&
                delete result[field]
            );

            return available_fields.filter((field) =>
              Object.keys(result).includes(field)
            );
          })
          .every((entry) => entry.length === 0);

        if (isEmptyTable) {
          return null;
        }

        return (
          <Table
            key={"table_" + key}
            label={key}
            fields={available_fields}
            items={results[key]}
          />
        );
      } else {
        return null;
      }
    });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  });

  if (query_string === "") {
    return <EmptyQueryStringCallout />;
  }

  if (
    !results ||
    Object.keys(results).every((key) => {
      return results[key].length === 0;
    })
  ) {
    return <NoResultsCallout />;
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        {loading ? <Spinner /> : <ViewList />}
      </div>
      <div className="flex flex-col">{scroll ? <ToTopButton /> : null}</div>
    </div>
  );
};

export default ResultRender;
