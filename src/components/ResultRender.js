import { useContext } from "react";
import Context from "../data/Context";
import { NoResultsCallout, EmptyQueryStringCallout } from "../ui/Callouts";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import BackToTopBtn from "../ui/BackToTopBtn";


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
            label={key}
            fields={available_fields}
            items={results[key]}
          />
        );
      } else {
        return null;
      }
    });

  if (query_string === "") {
    return (
      <div id="result-render-empty" className="flex flex-row mt-4 ml-[1rem] mr-[1rem]">
        <EmptyQueryStringCallout />
      </div>
    );
  }

  if (
    !results ||
    Object.keys(results).every((key) => {
      return results[key].length === 0;
    })
  ) {
    return (
      <div id="result-render-no-results" className="flex flex-row mt-4 ml-[1rem] mr-[1rem]">
        <NoResultsCallout />
      </div>
    );
  }

  return (
    <div id="result-render" className="flex flex-row mt-2">
      <div className="flex flex-col w-full">
        {loading ? <Spinner /> : <ViewList />}
      </div>
      <BackToTopBtn />
    </div>
  );
};

export default ResultRender;
