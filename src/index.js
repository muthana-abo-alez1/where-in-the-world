import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./pages/Error-Page/ErrorPage.js";
import MoreDetails from "./pages/More-Details/MoreDetails.js";
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/where-in-the-world/" element={<App />} />
        <Route path="/where-in-the-world/moreDetails/:name" element={<MoreDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

reportWebVitals();
