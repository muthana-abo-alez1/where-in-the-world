import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./pages/error page/errorPage";
import MoreDetails from "./pages/moreDetails/moreDetails.js";
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="" element={<App />} />
        <Route path="/moreDetails/:name" element={<MoreDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

reportWebVitals();
