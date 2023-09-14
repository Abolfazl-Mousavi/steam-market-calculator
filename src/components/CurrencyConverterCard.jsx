import React, { useState, useEffect } from "react";
import getCurrencyRatio from "../api/getCurrencyRatio";

import "./ccc.css";
import CurrencySelectorDropdown from "./CurrencySelectorDropdown";
import { useGlobalState } from "../GlobalStateContext";

const CurrencyConverterCard = () => {
  const { globalState, setGlobalState } = useGlobalState();
  const [fromCurrencyToBeConverted, setFromCurrencyToBeConverted] = useState(
    globalState.userCurrency
  );
  const [toBeConverted, setToBeConverted] = useState("USD");
  const [convertingRatio, setConvertingRatio] = useState(null);
  const [multiplyer, setMultiplyer] = useState(0);

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: toBeConverted,
  });
  useEffect(() => {
    setConvertingRatio(null);
    getCurrencyRatio(fromCurrencyToBeConverted, toBeConverted).then((data) => {
      setConvertingRatio(data);
    });
    return () => {};
  }, [fromCurrencyToBeConverted, toBeConverted]);

  return (
    <section className="card mt-10 relative bg-[#101010] rounded-3xl p-4 border border-white border-opacity-5">
      <div className="card-content flex flex-col justify-center items-end gap-4">
        <div>
          <span className="text-white text-xl">From </span>
          <CurrencySelectorDropdown
            changeUserCurrency={false}
            dropid={1}
            stateSetter={setFromCurrencyToBeConverted}
          />
        </div>
        <div>
          <span className="text-white text-xl">to </span>
          <CurrencySelectorDropdown
            changeUserCurrency={false}
            dropid={null}
            stateSetter={setToBeConverted}
          />
        </div>
        <div className=" grid place-items-center text-white text-xl w-full">
          <div>
            {" "}
            ratio :{" "}
            {convertingRatio ? (
              convertingRatio
            ) : (
              <>
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
              </>
            )}
          </div>
        </div>

        <input
          placeholder="Amount"
          className="w-[95%] px-4 py-2 rounded-sm"
          id="amount"
          type="text"
          name="amount"
          onChange={(e) => setMultiplyer(parseFloat(e.target.value))}
        />
        <div className="text-white text-2xl flex justify-center w-full font-mono">
          {currencyFormatter.format(multiplyer * convertingRatio)}
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverterCard;
