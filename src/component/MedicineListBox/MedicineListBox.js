import React from "react";
import style from "./Medicine.module.css";
import MedicineList from "./MedicineList";

const MedicineListBox = ({
  medicine_input_array,
  setMedicine_input_array,
  loading,
}) => {
  const changeSelectedFormValueHandler = (id, type, selectedValue) => {
    var updated_result = [];
    if (type === "form_selected") {
      updated_result = medicine_input_array.map((salt) => {
        if (salt.id === id) {
          var form_selected = selectedValue;

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
            ...salt,
            form_selected,
            strength_selected,
            packaging_selected,
            total_strengths,
            total_Packaging,
          };
        } else {
          return salt;
        }
      });
    } else if (type === "strength_selected") {
      updated_result = medicine_input_array.map((salt) => {
        if (salt.id === id) {
          var form_selected = salt?.form_selected;

          var total_strengths = salt?.total_strengths;
          var strength_selected = selectedValue;

          var total_Packaging = Object.keys(
            salt?.salt_forms_json?.[form_selected]?.[strength_selected]
          ).flatMap((_, i, a) => (i % 2 ? [] : [a.slice(i, i + 2)]));

          var packaging_selected = Object.keys(
            salt?.salt_forms_json?.[form_selected]?.[strength_selected]
          )[0];

          return {
            ...salt,
            form_selected,
            strength_selected,
            packaging_selected,
            total_strengths,
            total_Packaging,
          };
        } else {
          return salt;
        }
      });
    } else {
      updated_result = medicine_input_array.map((salt) => {
        if (salt.id === id) {
          var form_selected = salt?.form_selected;

          var total_strengths = salt?.total_strengths;
          var strength_selected = salt?.strength_selected;

          var total_Packaging = salt?.total_Packaging;
          var packaging_selected = selectedValue;

          return {
            ...salt,
            form_selected,
            strength_selected,
            packaging_selected,
            total_strengths,
            total_Packaging,
          };
        } else {
          return salt;
        }
      });
    }

    setMedicine_input_array(updated_result);
  };
  const inputChangeHandler = (id, type, selectedValue) => {
    changeSelectedFormValueHandler(id, type, selectedValue);
  };

  return (
    <div className={style.medicineBox_div}>
      {loading ? (
        <p
          style={{
            fontSize: "1.4rem",
            color: "#aeaeae",
            position: "fixed",
            top: "50%",
            fontWeight: "500",
          }}
        >
          Loading..
        </p>
      ) : medicine_input_array.length !== 0 ? (
        medicine_input_array.map((medicine, index) => {
          return (
            <MedicineList
              key={index}
              id={medicine?.id}
              medicine={medicine}
              inputChangeHandler={inputChangeHandler}
            />
          );
        })
      ) : (
        <p
          style={{
            fontSize: "1.4rem",
            color: "#aeaeae",
            position: "fixed",
            top: "50%",
            fontWeight: "500",
          }}
        >
          "Find medicine with amazing discounts"
        </p>
      )}
    </div>
  );
};

export default MedicineListBox;
