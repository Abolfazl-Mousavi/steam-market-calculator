import React, { useState } from "react";
import { useGlobalState } from "../GlobalStateContext";

const UserBalance = () => {
  //global state
  const { globalState, setGlobalState } = useGlobalState();
  const setBalance = (steamBalance) => {
    setGlobalState({ ...globalState, steamBalance });
  };
  //formatter
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: globalState.userCurrency,
  });
  //states
  const [setSteamBalanceModal, setSetSteamBalanceModal] = useState(false);
  return (
    <div className="relative">
      <span
        className="underline font-semibold cursor-pointer select-none"
        onClick={() => {
          setSetSteamBalanceModal(!setSteamBalanceModal);
        }}
      >
        Balance:
      </span>{" "}
      {currencyFormatter.format(globalState.steamBalance)}
      {setSteamBalanceModal && (
        <div className="absolute -bottom-2   left-0 bg-slate-900 py-3 px-2 rounded-md -translate-x-1/2 translate-y-full">
          <input
            className="px-2 rounded-md"
            maxLength={10}
            value={globalState.steamBalance}
            placeholder="0"
            onChange={(e) => {
              setBalance(parseFloat(e.target.value));
              localStorage.setItem("BALANCE", parseFloat(e.target.value));
            }}
            type="number"
          />
          <input
            onClick={() => setSetSteamBalanceModal(false)}
            className="bg-rose-600 text-slate-900 px-2 mt-2 py-1 rounded-sm cursor-pointer"
            type="submit"
          />
        </div>
      )}
    </div>
  );
};

export default UserBalance;
