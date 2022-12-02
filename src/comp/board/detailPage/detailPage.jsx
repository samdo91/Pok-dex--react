import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../userStore/api/api";

function DetailPage() {
  const params = useParams();
  const [pokelist, setpokeList] = useState({
    koreanName: "",
    flavorText: [],
    prites: "",
    koreanNameslist: [],
  });

  const [koreanNamelistState, setKreanNamelistState] = useState({
    koreanNamelist: [],
  });
  const apiList = async (params) => {
    console.log(pokelist);
    const PokémonSpecialList = await request(
      `api/v2/pokemon-species/${params}`
    );
    const PokémonList = await request(`api/v2/pokemon/${params}`);

    const koreanName = PokémonSpecialList.names.find(
      (elements) => elements.language.name === "ko"
    ).name;
    const flavorText = PokémonSpecialList.flavor_text_entries.filter(
      (elements) => elements.language.name === "ko"
    );
    const prites = PokémonList.sprites.front_default;

    setpokeList({
      ...pokelist,
      koreanName: koreanName,
      flavorText: flavorText,
      prites: prites,
    });
  };

  // const testList = async () => {
  //   const specialList = await request(
  //     `api/v2/pokemon-species/?limit=12&offset=0`
  //   );
  //   const nameList = [];
  //   specialList.results.map(async (item) => {
  //     const list = await request(item.url);

  //     const koreanName = list.names.find(
  //       (elements) => elements.language.name === "ko"
  //     ).name;

  //     nameList.push(koreanName);

  //     const koreanNameslist =
  //       koreanNamelistState.koreanNamelist.concat(nameList);

  //     setKreanNamelistState({
  //       ...koreanNamelistState,
  //       koreanNamelist: koreanNameslist,
  //     });
  //   });
  // };

  useEffect(() => {
    apiList(params.itemName);
  }, []);

  return (
    <div>
      <img src={pokelist.prites} />
      <h1> {`이름: ${pokelist.koreanName}`}</h1>
      <div>
        특성
        {pokelist.flavorText.map((item, index) => {
          return (
            <div key={index}>
              {` 버전 ${item.version.name}:  ${item.flavor_text}`}{" "}
            </div>
          );
        })}
        <div>
          {koreanNamelistState.koreanNamelist.map((item) => {
            return <div> {item}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
