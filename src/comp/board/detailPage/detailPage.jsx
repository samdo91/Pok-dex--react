import { useParams } from "react-router-dom";
import React, { useContext } from "react";
import {
  PokémonStateContext,
  setPokémonStateContext,
} from "../../userStore/contextApi/contextApi";
function DetailPage() {
  const params = useParams();
  const PokémonState = useContext(PokémonStateContext);
  const setPokémonState = useContext(setPokémonStateContext);
  console.log(PokémonState);

  console.log(params);

  return (
    <div>
      <h1> 그릉가?</h1>
      <h1> fffd</h1>
    </div>
  );
}

export default DetailPage;
