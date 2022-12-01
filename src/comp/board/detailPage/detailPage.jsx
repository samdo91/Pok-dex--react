import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../userStore/api/api";

function DetailPage() {
  const params = useParams();

  const apiList = async (params) => {
    const PokémonSpecialList = await request(
      `api/v2/pokemon-species/${params}`
    );
    const PokémonList = await request(
      `https://pokeapi.co/api/v2/pokemon/${params}`
    );
    console.log("PokémonSpecialList", PokémonSpecialList);
    console.log("PokémoList", PokémonList);
  };

  useEffect(() => {
    apiList(params.itemName);
  }, []);

  return (
    <div>
      <h1> 그릉가?</h1>
      <h1> fffd</h1>
    </div>
  );
}

export default DetailPage;
