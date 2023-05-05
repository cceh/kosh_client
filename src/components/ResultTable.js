const ResultTable = ({ dict, fields, dict_fields, results, dict_base_url }) => {
  if (!results?.length) {
    return null
  }

  const tableHead = fields.map(field => {
    return (
      <th
        scope="col"
        className="text-sm text-center text-black p-4"
        key={"header_" + field}>
        {field}
      </th>
    )
  })

  const tableBody = results.map(result => {
    // For each result, return row
    // The row should only contain the results of the selected display fields
    const row = fields.map((field, id) => {
      // If result is an array, display as list
      if (Array.isArray(result[field]) && result[field].length > 1) {
        return (
          <td
            className="text-base text-black text-center"
            key={"entry_" + id + field}>
            <ul className="list-disc px-6">
              {result[field].map((item, id) => (
                <li key={"list-item_" + field + "_" + id}>{item}</li>
              ))}
            </ul>
          </td>
        )
      }
      else if (field === "xml") {
        // TODO: Add line wrapping and syntax highlighting
        return (
          <td
            className="text-sm text-black w-64 p-2 text-left"
            key={"entry_" + id + "_" + field}>
            <pre className="whitespace-pre-line bg-slate-50">
              <code>
                {result[field]}
              </code>
            </pre>
          </td>
        )
      }
      else if (field === "id") {
        const url = dict_base_url[dict] + `?query={ids(ids: "${result["id"]}"){${dict_fields[dict]}}}`
        return (
          <td
            className="text-blue-600 hover:text-blue-800 dark:text-blue-500 hover:underline w-24 break-all text-base"
            key={"entry_" + id + "_" + field}>
            <a href={url}>{result[field]}</a>
          </td>
        )
      }
      else if (field === "attest") {
        var items = []
        if (typeof (result[field]) === typeof ("")) {
          items = result[field].split("$$$").map((line, id) => {
            return (<li key={"list-item_" + field + "_" + id} className="text-base">{line}</li>)
          })
        }
        return (
          <td
            className="text-black w-80"
            key={"entry_" + id + "_" + field}>
            <ul className="list-disc px-6">{items}</ul>
          </td>
        )
      }
      // If result for field is empty, return non-breaking space
      else if (!result[field]) {
        return (
          <td
            className="w-48"
            key={"entry_" + id + "_" + field}>
            &nbsp;
          </td>)
      }
      else {
        return (
          <td
            className="text-base text-left text-black w-48 px-2 break-normal"
            key={"entry_" + id + "_" + field}>
            {result[field]}
          </td>
        )
      }
    })

    return (
      <tr
        className="bg-white text-black text-base border-2 hover:bg-slate-100"
        key={"row_" + result["id"]}>
        {row}
      </tr>
    )
  })

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="ml-4 mr-4 inline-block sm:px-6 lg:px-8">
            <table className="max-w-screen border-separate border-spacing-0">
              <thead className="bg-white top-0 sticky">
                <tr>
                  <th colSpan="100%" className="text-black text-sm bg-slate-200">
                    {dict}
                  </th>
                </tr>
                <tr className="bg-slate-100 shadow">
                  {tableHead}
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultTable