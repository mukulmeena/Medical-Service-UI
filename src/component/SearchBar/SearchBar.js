import React from "react";
import style from "./SearchBar.module.css";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";

export const SearchBar = ({
  inputText,
  inputChangeHandler,
  setInputText,
  setSearchMedicine,
  setMedicine_input_array,
  setLoading,
}) => {
  return (
    <div className={style.searchBar_div}>
      <div className={style.searchbar_inputDiv}>
        {inputText.length === 0 && <IoIosSearch className={style.searchIcon} />}
        {inputText.length !== 0 && (
          <IoIosArrowRoundBack
            onClick={() => {
              setMedicine_input_array([]);
              setInputText("");
            }}
            className={style.arrow_icon}
          />
        )}
        <input
          type="text"
          value={inputText}
          onChange={inputChangeHandler}
          placeholder="Type your medicine name here"
          className={style.search_textInput}
        ></input>
      </div>
      <p
        onClick={() => {
          setSearchMedicine(true);
          setLoading(true);
        }}
        className={style.search_text}
      >
        Search
      </p>
    </div>
  );
};
