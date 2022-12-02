import React, { useState, useEffect, useContext } from "react";
import SearchBar from "./searchBar/searchBar";
import BoardPage from "./board/board";
import { request, pokeApi, pokeSpecialApi } from "./userStore/api/api";
import { useInView } from "react-intersection-observer";
import Tests from "./textfile/texts";
import {
  PokémonStateContext,
  setPokémonStateContext,
} from "./userStore/contextApi/contextApi";
function MainPage() {
  const PokémonState = useContext(PokémonStateContext);
  const setPokémonState = useContext(setPokémonStateContext);

  const [koreanNamelistState, setKreanNamelistState] = useState({
    koreanNamelist: [],
    speciesList: "",
  });

  const { ref, inView, entry } = useInView({});

  const koreanNamefuntion = async (url) => {
    const specialList = await pokeSpecialApi(url);
    const nameList = [];
    specialList.results.map(async (item) => {
      const list = await request(item.url);

      const koreanName = list.names.find(
        (elements) => elements.language.name === "ko"
      ).name;

      nameList.push(koreanName);

      const koreanNameslist =
        koreanNamelistState.koreanNamelist.concat(nameList);

      setKreanNamelistState({
        ...koreanNamelistState,
        koreanNamelist: koreanNameslist,
        speciesList: specialList,
      });
    });
  };

  const Pokémonlist = async (url) => {
    const lists = await pokeApi(url);
    let pritesList = [];

    lists.results.forEach(async (item) => {
      const pokeState = await request(item.url);
      pritesList.push({
        ...pokeState,
        name: item.name,
        url: item.url,
        prites: pokeState.sprites.front_default,
      });
      const list = PokémonState.pakesprites
        .concat(pritesList)
        .sort(function (a, b) {
          return a.id - b.id;
        });

      setPokémonState({
        ...PokémonState,
        list: lists,
        pakesprites: list,
      });
    });
  };

  useEffect(() => {
    try {
      if (PokémonState.list.length === 0) {
        koreanNamefuntion();
        Pokémonlist();
      } else {
        koreanNamefuntion(koreanNamelistState.speciesList.next);
        Pokémonlist(PokémonState.list.next);
      }
    } catch {
      console.log("api를 못받아 왔어!");
    }
  }, [inView]); //

  return (
    <div>
      <h1> 포켓몬 도감</h1>
      <SearchBar />
      <BoardPage koreanNamelistState={koreanNamelistState} />

      <div ref={ref}>
        <h2>{`${inView}`}</h2>

        <Tests />
      </div>
    </div>
  );
}

export default MainPage;
