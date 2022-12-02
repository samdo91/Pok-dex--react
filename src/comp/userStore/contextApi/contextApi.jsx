import React, { createContext, useState } from "react";

export const PokémonStateContext = createContext();
export const setPokémonStateContext = createContext();
const ContextApi = (props) => {
  const [PokémonState, setPokémonState] = useState({
    list: [],
    keyword: "포켓몬",
    searchValue: "",
    pakesprites: [],
    pakeSpecialList: [],
  });

  return (
    <PokémonStateContext.Provider value={PokémonState}>
      <setPokémonStateContext.Provider value={setPokémonState}>
        {props.children}
      </setPokémonStateContext.Provider>
    </PokémonStateContext.Provider>
  );
};

export default ContextApi;
