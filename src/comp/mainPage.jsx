import React, { useState, useEffect } from "react";
import SearchBar from "./searchBar/searchBar";
import BoardPage from "./board/board";
import { request, pokeApi } from "./userStore/api/api";
import { useInView } from "react-intersection-observer";

function MainPage() {
  const [PokémonState, setPokémonState] = useState({
    list: [],
    keyword: "포켓몬",
    searchValue: "",
    pakesprites: [],
  });

  const { ref, inView, entry } = useInView({});

  const Pokémonlist = async (url) => {
    const lists = await pokeApi(url);
    let pritesList = [];
    console.log("lists", lists);

    lists.results.forEach(async (item) => {
      const pokeState = await request(item.url);
      pritesList.push({
        ...pokeState,
        name: item.name,
        url: item.url,
        prites: pokeState.sprites.front_default,
      });
      const list = PokémonState.pakesprites.concat(pritesList);
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
        Pokémonlist();
      } else {
        Pokémonlist(PokémonState.list.next);
      }
    } catch {
      console.log("api를 못받아 왔어!");
    }
  }, [inView]); //

  return (
    <div>
      <h1> 포켓몬 도감</h1>
      <SearchBar
        PokémonState={PokémonState}
        setPokémonState={setPokémonState}
      />
      <BoardPage
        PokémonState={PokémonState}
        setPokémonState={setPokémonState}
      />

      <div ref={ref}>
        <h2>{`${inView}`}</h2>
      </div>
    </div>
  );
}

export default MainPage;
