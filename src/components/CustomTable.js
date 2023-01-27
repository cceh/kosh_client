import React from "react"

const CustomTable = ({ dict, fields, dict_fields, results, dict_base_url }) => {
  if (!results?.length) {
    return null
  }

  const tableHead = fields.map(field => {
    return (
      <th
        scope="col"
        className="text-sm text-center text-gray-900 px-6 py-4 text-left"
        key={"header_" + field}>
        {field}
      </th>
    )
  })

  const tableBody = results.map(result => {
    // For each result, return row
    const row = fields.map((field, id) => {
      // The row should only contain the results of the selected display fields
      if (!result[field]) {
        return (
          <td
            className="text-sm text-gray-900 font-light w-32"
            key={"entry_" + id + "_" + field}>
            &nbsp;
          </td>)
      }
      else if (Array.isArray(result[field]) && result[field].length > 1) {
        return (
          <td
            className="text-sm text-gray-900 font-light w-32"
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
            className="text-sm text-gray-900 font-light w-32"
            key={"entry_" + id + "_" + field}>
            <pre className="whitespace-pre-line">
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
            className="text-sm text-gray-900 font-light w-32"
            key={"entry_" + id + "_" + field}>
            <a href={url}>{result[field]}</a>
          </td>
        )
      }
      else if (field === "attest") {
        var items = []
        if (typeof (result[field]) === typeof ("")) {
          items = result[field].split("$$$").map((line, id) => {
            return (<li key={"list-item_" + field + "_" + id}>{line}</li>)
          })
        }
        return (
          <td
            className="text-sm text-gray-900 font-light w-32"
            key={"entry_" + id + "_" + field}>
            <ul className="list-disc px-6">{items}</ul>
          </td>
        )
      }
      else {
        return (
          <td
            className="text-sm text-gray-900 font-light w-32"
            key={"entry_" + id + "_" + field}>
            {result[field]}
          </td>
        )
      }
    })

    return (
      <tr
        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
        key={"row_" + result["id"]}>
        {row}
      </tr>
    )
  })

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="ml-4 mr-4 inline-block sm:px-6 lg:px-8">
            <table className="w-screen">
              <thead className="bg-white border-b">
                <tr>
                  <th colSpan="100%" className="text-black text-sm">
                    {dict}
                  </th>
                </tr>
                <tr>
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

export default CustomTable
