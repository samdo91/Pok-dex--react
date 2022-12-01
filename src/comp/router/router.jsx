import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextApi from "../userStore/contextApi/contextApi";
import MainPage from "../mainPage.jsx";
import DetailPage from "../board/detailPage/detailPage.jsx";
function Router() {
  return (
    <ContextApi>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          {/* url  Parameters로 넘길때는 
          item.id 라면 itemID가 되고
          item.name 라면 itemName가 된다.
                */}
          <Route path=":itemName" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </ContextApi>
  );
}

export default Router;
