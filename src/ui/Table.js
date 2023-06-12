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

  const tableBody = items.map((item) => {
    const row = fields.map((field, id) => {
      return (
        <tr
          className="bg-white text-black text-base border-2 hover:bg-slate-100"
          key={"row_" + item["id"]}
        >
          {row}
        </tr>
      );
    });
  });

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="ml-4 mr-4 inline-block sm:px-6 lg:px-8">
            <table className="max-w-screen border-separate border-spacing-0">
              <thead className="bg-white top-0 sticky">
                <tr>
                  <th
                    colSpan="100%"
                    className="text-black text-sm bg-slate-200"
                  >
                    {label}
                  </th>
                </tr>
                <tr className="bg-slate-100 shadow">{tableHead}</tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;
