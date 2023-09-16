import React, { useEffect, useState } from "react";
import ToBuySellCart from "./ToBuySellCart";
import Checkbox from "./Checkbox";
import { useGlobalState } from "../GlobalStateContext";

const Cart = () => {
  const { globalState, setGlobalState } = useGlobalState();

  const [calculateBalance, setCalculateBalance] = useState(true);
  const [calculateWithTF2Key, setCalculateWithTF2Key] = useState(false);
  const [taxFree, setTaxFree] = useState(false);

  const [totalBuyValue, setTotalBuyValue] = useState();
  const [totalSellValue, setTotalSellValue] = useState();

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: globalState.userCurrency,
  });
  const Calculated = () => {
    let totalValue = totalSellValue - totalBuyValue;
    if (calculateBalance) {
      totalValue =
        parseFloat(globalState.steamBalance) + (totalSellValue - totalBuyValue);
    }
    if (calculateWithTF2Key) {
      totalValue = totalValue / globalState.TF2KeyPrice;
    } else {
      totalValue = currencyFormatter.format(totalValue);
    }
    return totalValue;
  };

  return (
    <section>
      <div className="bg-slate-50 items-center w-[80vw] mx-auto mt-9 rounded-lg px-12 py-2 flex gap-5">
        <Checkbox
          setIsChecked={setCalculateBalance}
          isChecked={calculateBalance}
          innerText={"Calculate Balance"}
        />
        <Checkbox
          setIsChecked={setCalculateWithTF2Key}
          isChecked={calculateWithTF2Key}
          innerText={"Calculate With TF2 Key"}
        />
        <Checkbox
          setIsChecked={setTaxFree}
          isChecked={taxFree}
          innerText={"TaxFree"}
        />
        <div>your Balance will be: {Calculated()}</div>
      </div>
      <div className=" flex justify-around mt-5 gap-5">
        <ToBuySellCart buy sum={setTotalBuyValue} />
        <ToBuySellCart sell sum={setTotalSellValue} tax={taxFree} />
      </div>
    </section>
  );
};

export default Cart;
