import "./App.css";
import {
  CurrencyConverterCard,
  CurrencySelectorDropdown,
  UserBalance,
} from "./components";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <header className="bg-slate-50 items-center w-[80vw] mx-auto mt-5 rounded-lg px-12 py-2 flex justify-between">
        <CurrencySelectorDropdown dropid={0} changeUserCurrency={true} />
        <UserBalance />
      </header>
      <main className="mx-auto flex flex-col items-center mt-18">
        <CurrencyConverterCard />
       <Cart/>
      </main>
      <div className="h-[100px]"></div>
    </>
  );
}

export default App;
