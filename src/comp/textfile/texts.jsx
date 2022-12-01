import React, { useContext } from "react";
import {
  PokémonStateContext,
  setPokémonStateContext,
} from "../userStore/contextApi/contextApi";

function Tests() {
  const PokémonState = useContext(PokémonStateContext);
  const setPokémonState = useContext(setPokémonStateContext);

  return <div></div>;
}

export default Tests;
