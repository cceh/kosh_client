import { React, useContext, useEffect } from "react"
import KoshContext from "./KoshContext"
import CustomCheckbox from "./CustomCheckbox"
import LanguageContext from "../Website/LanguageContext"
import Spinner from "../Spinner"

const KoshResultParams = () => {
  const { search_fields, display_fields, setDisplayFields, setViewName, loading } = useContext(KoshContext)
  const language = useContext(LanguageContext)

  const selectedTargets = (e, v) => {
    setDisplayFields(prevTargets => ({
      ...prevTargets,
      [v]: e.target.checked
    }))
    return false
  }

  const isChecked = (v) => {
    return display_fields[v]
  }

  useEffect(() => {
    if (language.language.lang === "deutsch") {
      setViewName([
        { name: "Tabelle", value: "table" }
      ])
    } else if (language.language.lang === "english") {
      setViewName([
        { name: "TableView", value: "table" }
      ])
    }
  }, [language.language.lang, display_fields, loading, setDisplayFields, setViewName])

  return (
    <div className="flex flex-row m-2 justify-between pb-2">
      <div className="flex flex-col">
        {loading ? <Spinner /> :
          <CustomCheckbox
            fields={search_fields}
            label={language.language.lang === "english" ? "Display fields: " : "Anzeigefelder: "}
            preselected={isChecked}
            onc={selectedTargets}
          />
        }
      </div>
    </div>
  )
}

export default KoshResultParams