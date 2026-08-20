import WebFont from "webfontloader";
import React from "react";
import ReactDOM from "react-dom/client";
import JobTracker from "./JobTracker.jsx";

WebFont.load({
  google: {
    families: ['Aboreto','Figtree','Arapey']
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JobTracker />
  </React.StrictMode>
);
