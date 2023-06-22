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
  } = useContext(Context);
  const default_api = "https://kosh.uni-koeln.de";

  const selectCollection = (e) => {
    const uid = e.target.value;
    setCollectionId(uid);

    switch (uid) {
      case "CDSD":
        setAPIEndpoint(default_api);
        setCollectionBasePath("cdsd");
        break;
      case "Creole":
        setAPIEndpoint(default_api);
        setCollectionBasePath("creole");
        break;
      case "Freedict":
        setAPIEndpoint(default_api);
        setCollectionBasePath("freedict");
        break;
      case "Kosh Data":
        setAPIEndpoint(default_api);
        setCollectionBasePath("api");
        break;
      case "MPCD":
        setAPIEndpoint(default_api);
        setCollectionBasePath("mpcd");
        break;
      case "C-SALT Sanskrit":
        setAPIEndpoint("https://api.c-salt.uni-koeln.de");
        setCollectionBasePath("dicts");
        break;
      case "localhost":
        setAPIEndpoint("http://localhost:5000");
        setCollectionBasePath("api");
        break;
      default:
        setAPIEndpoint("http://localhost:5000");
        setCollectionBasePath("api");
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
