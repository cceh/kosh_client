const ResultTable = ({ label, items, fields }) => {
  if (!items?.length) {
    return null;
  }

  const tableHead = fields.map((field) => {
    return (
      <th
        scope="col"
        className="text-sm text-center text-black p-4"
        key={"header_" + field}
      >
        {field}
      </th>
    );
  });

  const tableBody = items.map((result) => {
    // For each result, return row
    // The row should only contain the results of the selected display fields
    const row = fields.map((field, id) => {
      // If result is an array, display as list
      if (Array.isArray(result[field]) && result[field].length > 1) {
        return (
          <td
            className="text-base text-black text-center"
            key={"entry_" + id + field}
          >
            <ul className="list-disc px-6">
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
            className="text-sm text-black p-2 text-left"
            key={"entry_" + id + "_" + field}
          >
            <pre className="whitespace-pre-line bg-slate-50">
              <code>{result[field]}</code>
            </pre>
          </td>
        );
      } else if (!result[field]) {
        return <td key={"entry_" + id + "_" + field}></td>;
      }

      return (
        <td
          className="text-base text-left text-black px-2 break-normal"
          key={"entry_" + id + "_" + field}
        >
          {result[field]}
        </td>
      );
    });

    return (
      <tr
        className="bg-white text-black text-base border-2 hover:bg-slate-100"
        key={"row_" + result["id"]}
      >
        {row}
      </tr>
    );
  });

  return (
    <table className="table-auto border-separate border-spacing-0 w-screen max-w-screen">
      <thead className="bg-white top-0 sticky">
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
