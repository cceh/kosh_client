import sorted from "../utils/sorted";

const ResultTable = ({ label, items, fields, url }) => {
  if (!items?.length) {
    return null;
  }

  const tableHead = sorted(fields).map((field) => {
    return (
      <th
        scope="col"
        className="text-sm text-center text-black m-4"
        key={"header_" + field}
      >
        {field}
      </th>
    );
  });

  const tableBody = items.map((result) => {
    const row = fields.map((field, id) => {
      const entry = result[field];

      if (Array.isArray(entry) && entry.length > 1) {
        return (
          <td
            className="text-base text-left text-black w-[250px]"
            key={"entry_" + id + field}
          >
            <ul className="text-base text-left text-black mx-2 mb-2 last:mb-0 list-disc">
              {entry.map((item, id) => (
                <li key={"list-item_" + field + "_" + id} className="text-base">
                  {item}
                </li>
              ))}
            </ul>
          </td>
        );
      } else if (field === "xml") {
        return (
          <td
            className="text-sm bg-slate-50 text-black text-left w-[250px]"
            key={"entry_" + id + "_" + field}
          >
            <pre className="whitespace-pre-line">
              <code>{entry}</code>
            </pre>
          </td>
        );
      } else if (field === "id") {
        const match = url.replace(
          /(.*entries\?)(.*)/i,
          `$1field=id&query_type=match&query=${entry}`
        );

        return (
          <td
            className="text-base text-center underline text-blue-600 hover:text-blue-800 visited:text-purple-600 w-[100px] max-w-[100px] overflow-x-auto"
            key={"entry_" + id + "_" + field}
          >
            <a href={match}>{entry}</a>
          </td>
        );
      } else if (
        field === "attest" &&
        (typeof entry === "string" || entry instanceof String)
      ) {
        const listItems = entry.split(/[($$$);]+/).map((line, id) => {
          return (
            <li
              key={"list-item_" + field + "_" + id}
              className="mb-2 last:mb-0"
            >
              {line.replace(/(\s\s+|\t)/g, "")}
            </li>
          );
        });

        return (
          <td
            className="text-base text-left text-black w-[250px]"
            key={"entry_" + id + "_" + field}
          >
            {listItems}
          </td>
        );
      } else if (!entry) {
        return (
          <td
            className="text-base text-left text-black w-[250px]"
            key={"entry_" + id + "_" + field}
          ></td>
        );
      }

      return (
        <td
          className="text-base text-left text-black w-[250px]"
          key={"entry_" + id + "_" + field}
        >
          {entry}
        </td>
      );
    });

    return (
      <tr
        className="bg-white text-black text-base border-2 hover:bg-gray-100"
        key={"row_" + result["id"]}
      >
        {row}
      </tr>
    );
  });

  return (
    <table className="mt-6 table-fixed border-separate border-spacing-0">
      <thead className="bg-white sticky top-0">
        <tr>
          <th colSpan="100%" className="text-black text-sm bg-slate-200">
            <div className="inline-block mr-2">{label}</div>
            <a href={url} className="inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 -2 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </a>
          </th>
        </tr>
        <tr className="bg-slate-100 shadow">{tableHead}</tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default ResultTable;
