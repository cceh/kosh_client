import { useContext } from "react"
import KoshContext from "./KoshContext"
import DisplaySelect from "./DisplaySelect"
import Spinner from "./Spinner"

const KoshResultParams = () => {
  const { search_fields, display_fields, setDisplayFields, loading } = useContext(KoshContext)

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

  return (
    <div className="flex flex-row m-2 justify-between pb-2">
      <div className="flex flex-col">
        {loading ? <Spinner /> :
          <DisplaySelect
            fields={search_fields}
            label="Display fields: "
            preselected={isChecked}
            onc={selectedTargets}
          />
        }
      </div>
    </div>
  )
}

export default KoshResultParams