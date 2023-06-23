import sorted from "../utils/sorted";

const ResultTable = ({ label, items, fields }) => {
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
      if (Array.isArray(result[field]) && result[field].length > 1) {
        return (
          <td
            className="text-base text-left text-black w-[250px]"
            key={"entry_" + id + field}
          >
            <ul className="text-base text-left text-black mx-10 list-disc">
              {result[field].map((item, id) => (
                <li key={"list-item_" + field + "_" + id}>{item}</li>
              ))}
            </ul>
          </td>
        );
      } else if (field === "xml") {
        // TODO: Add line wrapping and syntax highlighting
        return (
          <td
            className="text-sm text-black m-2 text-left w-[250px]"
            key={"entry_" + id + "_" + field}
          >
            <pre className="whitespace-pre-line bg-slate-50">
              <code>{result[field]}</code>
            </pre>
          </td>
        );
      } else if (!result[field]) {
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
          {result[field]}
        </td>
      );
    });

    return (
      <tr
        className="bg-white text-black text-base border-2 hover:bg-gray-200"
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
            {label}
          </th>
        </tr>
        <tr className="bg-slate-100 shadow">{tableHead}</tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default ResultTable;
