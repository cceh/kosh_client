import React from "react";
import KoshView from "./components/KoshView";

const App = () => {
    return (
        <div className="w-full h-full flex flex-col overflow-y-scroll scrollbar-thumb-off scrollbar-thin scrollbar-track-main-dark">
            <KoshView />
        </div>
    );
}

export default App;
