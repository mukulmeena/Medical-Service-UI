import React, { useEffect, useState } from "react";
import style from "./Medicine.module.css";
import { SaltForm } from "./Salt/SaltForm";
import SaltStrength from "./Salt/SaltStrength";
import SaltPackaging from "./Salt/SaltPackaging";

const MedicineList = ({ id, medicine, inputChangeHandler }) => {
  const [checkMed_Available, setCheckMed_Available] = useState(false);
  const [min_price_med, setMin_Price_Med] = useState(null);

  const find_minimum_price_med = () => {
    var form_selected = medicine?.form_selected;
    var strength_selected = medicine?.strength_selected;
    var packaging_selected = medicine?.packaging_selected;

    const [med_available, pharmacy_contains_med] = check_med_available_utility(
      form_selected,
      strength_selected,
      packaging_selected
    );

    if (med_available) {
      setMin_Price_Med(pharmacy_contains_med?.[0]["selling_price"]);
      setCheckMed_Available(true);
    } else {
      setCheckMed_Available(false);
    }
  };

  const checkMed_available_handler = (
    form_selected_parm = "",
    strength_selected_parm = "",
    packaging_selected_parm = ""
  ) => {
    var form_selected =
      form_selected_parm === "" ? medicine?.form_selected : form_selected_parm;
    var strength_selected =
      strength_selected_parm === ""
        ? medicine?.strength_selected
        : strength_selected_parm;
    var packaging_selected =
      packaging_selected_parm === ""
        ? medicine?.packaging_selected
        : packaging_selected_parm;

    if (packaging_selected_parm !== "") {
      return check_med_available_utility(
        form_selected,
        strength_selected,
        packaging_selected
      )[0];
    } else if (strength_selected_parm !== "") {
      var total_Packaging = Object.keys(
        medicine?.salt_forms_json?.[form_selected]?.[strength_selected]
      );
      return total_Packaging.find((packaging) => {
        return check_med_available_utility(
          form_selected,
          strength_selected,
          packaging
        )[0];
      });
    } else {
      var total_strengths = Object.keys(
        medicine?.salt_forms_json?.[form_selected]
      );

      return total_strengths.find((strength) => {
        var total_Packaging = Object.keys(
          medicine?.salt_forms_json?.[form_selected]?.[strength]
        );
        return total_Packaging.find((packing) => {
          return check_med_available_utility(
            form_selected,
            strength,
            packing
          )[0];
        });
      });
    }
  };

  const check_med_available_utility = (
    form_selected,
    strength_selected,
    packaging_selected
  ) => {
    const pharmacy_obj =
      medicine?.salt_forms_json?.[form_selected]?.[strength_selected]?.[
        packaging_selected
      ];
    const pharmacy_contains_med = Object.values(pharmacy_obj)
      .filter((pharmacy) => pharmacy !== null)
      .flatMap((val) => val)
      .sort((obj1, obj2) => obj1?.selling_price - obj2?.selling_price);

    if (pharmacy_contains_med.length !== 0) {
      return [true, pharmacy_contains_med];
    } else {
      return [false, []];
    }
  };

  useEffect(() => {
    find_minimum_price_med();
  }, [medicine]);

  return (
    <>
      <div className={style.medicineList_div}>
        <div className={style.med_type_parent}>
          <SaltForm
            id={id}
            medicine={medicine}
            checkMed_available_handler={checkMed_available_handler}
            inputChangeHandler={inputChangeHandler}
          />
          <SaltStrength
            id={id}
            medicine={medicine}
            checkMed_available_handler={checkMed_available_handler}
            inputChangeHandler={inputChangeHandler}
          />
          <SaltPackaging
            id={id}
            medicine={medicine}
            checkMed_available_handler={checkMed_available_handler}
            inputChangeHandler={inputChangeHandler}
          />
        </div>
        <div className={style.med_info_div}>
          <p style={{ wordWrap: "break-all" }}>{medicine?.saltName}</p>
          <div>
            <span>{medicine?.form_selected} | </span>
            <span>{medicine?.strength_selected} | </span>
            <span>{medicine?.packaging_selected}</span>
          </div>
        </div>
        <div className={style.med_price_div}>
          {checkMed_Available && <h2>From&#8377;{min_price_med}</h2>}
          {!checkMed_Available && (
            <div className={style.med_notAvailable_div}>
              <p>No stores selling this product near you</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MedicineList;
