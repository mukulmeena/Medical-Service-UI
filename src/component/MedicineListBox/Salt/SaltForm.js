import React, { useState } from "react";
import style from "../Medicine.module.css";

export const  SaltForm = ({ id, medicine, checkMed_available_handler, inputChangeHandler }) => {
  const [moreActive_form, setMoreActive_Form] = useState(false);

  return (
    <div className={style.med_type}>
      <div id={style.med_type_label}>
        <span>Form:</span>
      </div>
      <div className={style.med_type_parentDiv}>
        {medicine?.total_form.slice(0, 2).map((forms) => {
          return (
            <div className={style.med_type_div}>
              {forms?.map((form) => {
                return (
                  <div
                    className={`${
                      medicine?.form_selected === form
                        ? checkMed_available_handler(form, "", "")
                          ? `${style.med_div} ${style.med_selected}`
                          : `${style.med_div} ${style.med_selected_notAvailable}`
                        : checkMed_available_handler(form, "", "")
                        ? `${style.med_div} ${style.med_notSelected}`
                        : `${style.med_div} ${style.med_notSelect_notAvailable}`
                    }`}
                    onClick={() =>
                      inputChangeHandler(id, "form_selected", form)
                    }
                  >
                    <span>{form}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
        {medicine?.total_form.length > 2 &&
          (moreActive_form ? (
            <span
              onClick={() => setMoreActive_Form(false)}
              className={style.moreSpan}
            >
              Hide..
            </span>
          ) : (
            <span
              onClick={() => setMoreActive_Form(true)}
              className={style.moreSpan}
            >
              More..
            </span>
          ))}
        {moreActive_form &&
          medicine?.total_form
            .slice(2, medicine?.total_form.length)
            .map((forms) => {
              return (
                <div className={style.med_type_div}>
                  {forms?.map((form) => {
                    return (
                      <div
                        className={`${
                          medicine?.form_selected === form
                            ? checkMed_available_handler(form, "", "")
                              ? `${style.med_div} ${style.med_selected}`
                              : `${style.med_div} ${style.med_selected_notAvailable}`
                            : checkMed_available_handler(form, "", "")
                            ? `${style.med_div} ${style.med_notSelected}`
                            : `${style.med_div} ${style.med_notSelect_notAvailable}`
                        }`}
                        onClick={() =>
                          inputChangeHandler(id, "form_selected", form)
                        }
                      >
                        <span>{form}</span>
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
