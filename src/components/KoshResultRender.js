import { React, useContext } from "react"
import KoshContext from "./KoshContext"
import LanguageContext from "../Website/LanguageContext"
import CustomTable from "./CustomTable"
import Spinner from "../Spinner"

const KoshResultRender = () => {
  const { state, dict_base_url, query_string, display_fields, dict_fields, loading, results } = useContext(KoshContext)
  const language = useContext(LanguageContext)

  if (query_string === "") {
    return (
      <div key="type_search" role="alert" className="bg-teal-100 rounded-lg py-2 px-4 text-teal-700 m-3 w-full inline-flex items-center">
        <svg className="w-4 h-4 mr-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="teal" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
        </svg>{language.language.lang === "english" ? "Type to search..." : "Suchbegriff eingeben..."}</div>
    )
  }

  if (!results || Object.keys(results).every(key => { return results[key].length === 0 })) {
    return (
      <div key="no_entries" role="alert" className="bg-yellow-100 rounded-lg py-2 px-4 text-yellow-700 m-3 w-full inline-flex items-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" className="w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path fill="orange" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
        </svg>{language.language.lang === "english" ? "No entries found." : "Keine Einträge gefunden."}</div>
    )
  }

  const available_fields = Object.keys(display_fields).filter(key => display_fields[key] === true)

  const ViewList = () => Object.keys(results).map((key) => {
    if (results[key].length && state.view.table) {
      // Check if there are any results for the available fields
      const emptyTable = results[key].map(result => {
        // Remove any null values
        Object.keys(result).forEach((field) => result[field] == null && delete result[field])
        
        return available_fields.filter(field => Object.keys(result).includes(field))
      }).every(entry => entry.length === 0)
      
      // Don't return a table if there aren't any results
      // TODO: Fix edge case where one dict selected & table completely empty
      if (emptyTable) { return null }

      return (
        <CustomTable key={"table_" + key} dict={key} fields={available_fields} dict_fields={dict_fields} results={results[key]} dict_base_url={dict_base_url}></CustomTable>
      )
    } else { return null }
  })

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        {loading ? <Spinner /> : <ViewList />}
      </div>
    </div>
  )

}

export default KoshResultRender