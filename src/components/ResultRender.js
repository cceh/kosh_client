import { useContext } from "react";
import { NoResultsCallout, EmptyQueryStringCallout } from "../ui/Callouts";
import Context from "../data/Context";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";

const ResultRender = () => {
  const { query_string, display_fields, loading, results } =
    useContext(Context);
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
            dict={key}
            fields={available_fields}
            items={results[key]}
          ></Table>
        );
      } else {
        return null;
      }
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

  // Add ToTopButton functionality
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        {loading ? <Spinner /> : <ViewList />}
      </div>
      {/* {scroll ? <ToTopButton /> : null} */}
    </div>
  );
};

export default ResultRender;
