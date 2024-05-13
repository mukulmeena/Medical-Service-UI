import React, { useState } from "react";
import style from "../Medicine.module.css";

const SaltStrength = ({ id, medicine, checkMed_available_handler, inputChangeHandler }) => {
  const [moreActive_strength, setMoreActive_strength] = useState(false);
  return (
    <div className={style.med_type}>
      <div id={style.med_type_label}>
        <span>Strength:</span>
      </div>
      <div className={style.med_type_parentDiv}>
        {medicine?.total_strengths.slice(0, 2).map((strengths) => {
          return (
            <div className={style.med_type_div}>
              {strengths?.map((strength) => {
                return (
                  <div
                    className={`${
                      medicine?.strength_selected === strength
                        ? checkMed_available_handler("", strength, "")
                          ? `${style.med_div} ${style.med_selected}`
                          : `${style.med_div} ${style.med_selected_notAvailable}`
                        : checkMed_available_handler("", strength, "")
                        ? `${style.med_div} ${style.med_notSelected}`
                        : `${style.med_div} ${style.med_notSelect_notAvailable}`
                    }`}
                    onClick={() =>
                      inputChangeHandler(id, "strength_selected", strength)
                    }
                  >
                    <span>{strength}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
        {medicine?.total_strengths.length > 2 &&
          (moreActive_strength ? (
            <span
              onClick={() => setMoreActive_strength(false)}
              className={style.moreSpan}
            >
              Hide..
            </span>
          ) : (
            <span
              onClick={() => setMoreActive_strength(true)}
              className={style.moreSpan}
            >
              More..
            </span>
          ))}
        {moreActive_strength &&
          medicine?.total_strengths
            .slice(2, medicine?.total_strengths.length)
            .map((strengths) => {
              return (
                <div className={style.med_type_div}>
                  {strengths?.map((strength) => {
                    return (
                      <div
                        className={`${
                          medicine?.strength_selected === strength
                            ? checkMed_available_handler("", strength, "")
                              ? `${style.med_div} ${style.med_selected}`
                              : `${style.med_div} ${style.med_selected_notAvailable}`
                            : checkMed_available_handler("", strength, "")
                            ? `${style.med_div} ${style.med_notSelected}`
                            : `${style.med_div} ${style.med_notSelect_notAvailable}`
                        }`}
                        onClick={() =>
                          inputChangeHandler(id, "strength_selected", strength)
                        }
                      >
                        <span>{strength}</span>
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

export default SaltStrength;
