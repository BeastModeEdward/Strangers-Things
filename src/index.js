import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

const rootEl = document.getElementById("app");
const root = ReactDOMClient.createRoot(rootEl);
root.render(
  <BrowserRouter>
    {" "}
    <App />{" "}
  </BrowserRouter>
);

//ReactDOM.render(<App />, document.getElementById("app"));
