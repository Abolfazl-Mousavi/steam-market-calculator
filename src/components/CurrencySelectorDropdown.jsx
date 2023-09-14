import React, { useEffect } from "react";
import SteamSupportedCurrencys from "../constants/SteamSupportedCurrencys";
import { useGlobalState } from "../GlobalStateContext";

const CurrencySelectorDropdown = ({
  dropid,
  changeUserCurrency,
  stateSetter,
}) => {
  const { globalState, setGlobalState } = useGlobalState();
  const setUserCurrency = (userCurrency) => {
    setGlobalState({ ...globalState, userCurrency });
  };
  //selection of dropdown in initial run
  useEffect(() => {
    if (dropid !== null) {
      const dropdown = document.getElementById(`dropdown${dropid}`);
      const options = Array.from(dropdown.options);
      const selectedOption = options.filter((option) => {
        return option.value === globalState.userCurrency;
      });
      options[selectedOption[0].index].selected = "selected";
    }

    return () => {};
  }, []);

  return (
    <select
      id={`dropdown${dropid}`}
      className=" ml-1 w-2/3 sm:w-auto sm:min-w-[200px] h-11 sm:h-9 px-5 py-1 border-1 border-black border-solid rounded-lg"
      onChange={(e) => {
        if (changeUserCurrency === true) {
          localStorage.setItem("USER_CURRENCY", e.target.value);
          setUserCurrency(e.target.value);
        }
        if (stateSetter) {
          stateSetter(e.target.value)
        }
      }}
    >
      {SteamSupportedCurrencys.map((item) => (
        <option key={item.id} value={item.acronym}>
          {item.acronym} / {item.country}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelectorDropdown;
