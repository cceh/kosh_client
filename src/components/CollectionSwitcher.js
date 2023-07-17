import { useContext } from "react";
import Context from "../data/Context";
import Dropdown from "../ui/Dropdown";

const CollectionSwitcher = () => {
  const {
    collection_id,
    collection_ids,
    setAPIEndpoint,
    setCollectionId,
    setCollectionBasePath,
    setQueryField,
    setQueryString,
    setResults,
  } = useContext(Context);
  const default_api = "https://kosh.uni-koeln.de";

  const selectCollection = (e) => {
    const uid = e.target.value;
    setCollectionId(uid);

    document.getElementById("query").value = "";
    setQueryString("");
    setResults("");

    switch (uid) {
      case "CDSD":
        setAPIEndpoint(default_api);
        setCollectionBasePath("cdsd");
        setQueryField("headword");
        break;
      case "Creole":
        setAPIEndpoint(default_api);
        setCollectionBasePath("creole");
        setQueryField("lemma");
        break;
      case "Freedict":
        setAPIEndpoint(default_api);
        setCollectionBasePath("freedict");
        setQueryField("headword");
        break;
      case "Kosh Data":
        setAPIEndpoint(default_api);
        setCollectionBasePath("api");
        setQueryField("lemma");
        break;
      case "MPCD Glossaries":
        setAPIEndpoint(default_api);
        setCollectionBasePath("mpcd");
        setQueryField("trc");
        break;
      case "C-SALT Sanskrit":
        setAPIEndpoint("https://api.c-salt.uni-koeln.de");
        setCollectionBasePath("dicts");
        setQueryField("headword_slp1");
        break;
      default:
        setAPIEndpoint("");
        setCollectionBasePath("api");
        setQueryField("lemma");
        break;
    }
  };

  return (
    <Dropdown
      label="Collection: "
      items={collection_ids}
      preselected={collection_id}
      onChange={selectCollection}
    />
  );
};

export default CollectionSwitcher;
