import React, { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import style from "./HomePage.module.css";
import MedicineListBox from "../MedicineListBox/MedicineListBox";
import axios from "axios";

export const HomePage = () => {
  const [inputText, setInputText] = useState("");
  const [searchMedicine, setSearchMedicine] = useState(false);
  const [medicine_input_array, setMedicine_input_array] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAPIData = async () => {
    const result = await axios.get(
      `https://backend.cappsule.co.in/api/v1/new_search?q=${inputText}&pharmacyIds=1,2,3`
    );

    const sorted_result = result.data.data.saltSuggestions.sort(
      (obj1, obj2) => obj2?.["salt_frequency"] - obj1?.["salt_frequency"]
    );

    var res = sorted_result.map((salt) => {
      var total_form = salt?.available_forms.flatMap((_, i, a) =>
        i % 2 ? [] : [a.slice(i, i + 2)]
      );
      var form_selected = salt?.available_forms[0];

      var total_strengths = Object.keys(
        salt?.salt_forms_json?.[form_selected]
      ).flatMap((_, i, a) => (i % 2 ? [] : [a.slice(i, i + 2)]));
      var strength_selected = Object.keys(
        salt?.salt_forms_json?.[form_selected]
      )[0];

      var total_Packaging = Object.keys(
        salt?.salt_forms_json?.[form_selected]?.[strength_selected]
      ).flatMap((_, i, a) => (i % 2 ? [] : [a.slice(i, i + 2)]));
      var packaging_selected = Object.keys(
        salt?.salt_forms_json?.[form_selected]?.[strength_selected]
      )[0];

      return {
        id: salt?.id,
        salt_forms_json: salt?.salt_forms_json,
        saltName: salt?.salt,
        form_selected,
        strength_selected,
        packaging_selected,
        total_form,
        total_strengths,
        total_Packaging,
      };
    });

    setMedicine_input_array(res);
    setSearchMedicine(false);
    setLoading(false);
  };

  const inputChangeHandler = (e) => {
    setInputText(e.currentTarget.value);
  };

  useEffect(() => {
    if (searchMedicine) {
      fetchAPIData();
    }
  }, [searchMedicine]);

  return (
    <div className={style.homePage_div}>
      <header>
        <h2>Cappsule web development test</h2>
      </header>
      <SearchBar
        setInputText={setInputText}
        setMedicine_input_array={setMedicine_input_array}
        inputChangeHandler={inputChangeHandler}
        inputText={inputText}
        setSearchMedicine={setSearchMedicine}
        setLoading={setLoading}
      />
      <MedicineListBox
        medicine_input_array={medicine_input_array}
        setMedicine_input_array={setMedicine_input_array}
        loading={loading}
      />
    </div>
  );
};
