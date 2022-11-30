import { css } from "@emotion/css";
function SearchBar(props) {
  const { PokémonState, setPokémonState } = props;
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.dataset.keyword);
    console.log(PokémonState.searchValue);
  };
  const handleInputOnChange = (e) => {
    setPokémonState({
      ...PokémonState,
      searchValue: e.target.value,
    });
  };

  const handleSelectOnChange = (e) => {
    console.log(e.target.value);
    setPokémonState({
      ...PokémonState,
      keyword: e.target.value,
    });
  };

  return (
    <div
      className={css`
    margin: 55px;
  }
`}
    >
      <form onSubmit={handleOnSubmit} data-keyword={PokémonState.keyword}>
        <input
          type="text"
          placeholder={`여기에 검색할 ${PokémonState.keyword}을 입력해주새요`}
          onChange={handleInputOnChange}
        ></input>

        <select id="keywordSelect" onChange={handleSelectOnChange}>
          <option value="모켓몬">포켓몬</option>
          <option value="번호">번호</option>
          <option value="기술명">기술명</option>
          <option value="특성">특성</option>
        </select>
        <button value={`${PokémonState.keyword}`}> 검색</button>
      </form>
    </div>
  );
}

export default SearchBar;
