import { useContext } from "react";
import Context from "../data/Context";
import {
  NoResultsCallout,
  EmptyQueryStringCallout,
  NoDictSelectedCallout,
} from "../ui/Callouts";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import BackToTopBtn from "../ui/BackToTopBtn";

const ResultRender = () => {
  const {
    query_string,
    query_dicts,
    display_fields,
    loading,
    submitting,
    results,
  } = useContext(Context);

  const available_fields = Object.keys(display_fields).filter(
    (key) => display_fields[key] === true
  );

  const Tables = () =>
    Object.entries(results).map(([dict, entries]) => {
      const isEmptyTable = entries
        .map((result) => {
          Object.entries(result).forEach(
            ([field, value]) =>
              (!value || !value.length || value === "NNN") &&
              delete result[field]
          );

          return available_fields.filter((field) =>
            Object.keys(result).includes(field)
          );
        })
        .every((entry) => entry.length === 0);

      if (entries.length && !isEmptyTable) {
        return (
          <Table
            key={"table_" + dict}
            label={dict}
            fields={available_fields}
            items={entries}
          />
        );
      }
      return null;
    });

  if (!query_dicts.length) {
    return (
      <div
        id="result-render-no-dicts"
        className="flex flex-row mt-4 ml-[1rem] mr-[1rem]"
      >
        <NoDictSelectedCallout />
      </div>
    );
  }

  if (query_string === "" || submitting) {
    return (
      <div
        id="result-render-empty"
        className="flex flex-row mt-4 ml-[1rem] mr-[1rem]"
      >
        <EmptyQueryStringCallout />
      </div>
    );
  }

  if (!results || Object.values(results).every((entry) => !entry.length)) {
    return (
      <div
        id="result-render-no-results"
        className="flex flex-row mt-4 ml-[1rem] mr-[1rem]"
      >
        <NoResultsCallout />
      </div>
    );
  }

  return (
    <div id="result-render" className="flex flex-row mt-2">
      <div className="flex flex-col w-full">
        {loading ? <Spinner /> : <Tables />}
      </div>
      <BackToTopBtn />
    </div>
  );
};

export default ResultRender;
