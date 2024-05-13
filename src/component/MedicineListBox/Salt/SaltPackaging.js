import React, { useState } from "react";
import style from "../Medicine.module.css";

const SaltPackaging = ({
  id,
  medicine,
  checkMed_available_handler,
  inputChangeHandler,
}) => {
  const [moreActive_packaging, setMoreActive_packaging] = useState(false);
  return (
    <div className={style.med_type}>
      <div id={style.med_type_label}>
        <span>Packaging:</span>
      </div>
      <div className={style.med_type_parentDiv}>
        {medicine?.total_Packaging.slice(0, 2).map((packagings) => {
          return (
            <div className={style.med_type_div}>
              {packagings?.map((packging) => {
                return (
                  <div
                    className={`${
                      medicine?.packaging_selected === packging
                        ? checkMed_available_handler("", "", packging)
                          ? `${style.med_div} ${style.med_selected}`
                          : `${style.med_div} ${style.med_selected_notAvailable}`
                        : checkMed_available_handler("", "", packging)
                        ? `${style.med_div} ${style.med_notSelected}`
                        : `${style.med_div} ${style.med_notSelect_notAvailable}`
                    }`}
                    onClick={() =>
                      inputChangeHandler(id, "packaging_selected", packging)
                    }
                  >
                    <span>{packging}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
        {medicine?.total_Packaging.length > 2 &&
          (moreActive_packaging ? (
            <span
              onClick={() => setMoreActive_packaging(false)}
              className={style.moreSpan}
            >
              Hide..
            </span>
          ) : (
            <span
              onClick={() => setMoreActive_packaging(true)}
              className={style.moreSpan}
            >
              More..
            </span>
          ))}
        {moreActive_packaging &&
          medicine?.total_Packaging
            .slice(2, medicine?.total_Packaging.length)
            .map((packagings) => {
              return (
                <div className={style.med_type_div}>
                  {packagings?.map((packaging) => {
                    return (
                      <div
                        className={`${
                          medicine?.packaging_selected === packaging
                            ? checkMed_available_handler("", "", packaging)
                              ? `${style.med_div} ${style.med_selected}`
                              : `${style.med_div} ${style.med_selected_notAvailable}`
                            : checkMed_available_handler("", "", packaging)
                            ? `${style.med_div} ${style.med_notSelected}`
                            : `${style.med_div} ${style.med_notSelect_notAvailable}`
                        }`}
                        onClick={() =>
                          inputChangeHandler(
                            id,
                            "packaging_selected",
                            packaging
                          )
                        }
                      >
                        <span>{packaging}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default SaltPackaging;
