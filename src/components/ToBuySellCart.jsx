import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import getTF2KeyPrice from "../api/getTF2KeyPrice";
import { useGlobalState } from "../GlobalStateContext";

const ToBuySellCart = ({ buy, sell, sum, tax }) => {
  const { globalState, setGlobalState } = useGlobalState();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ itemName: "", price: null });
  const [TF2KeyPrice, setTF2KeyPrice] = useState(61.28);
  const handleEdit = (id, updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item
    );
    setItems(updatedItems);
  };
  function setGlobalTF2KeyPrice(TF2KeyPrice) {
    let price = parseFloat(removeUntilNumber(TF2KeyPrice.replace(",", ".")));
    setGlobalState({ ...globalState, TF2KeyPrice: price });
    setTF2KeyPrice(price);
  }
  function removeUntilNumber(inputString) {
    const match = inputString.match(/\d/);

    if (match) {
      const indexOfNumber = match.index;

      const resultString = inputString.slice(indexOfNumber);

      return resultString;
    } else {
      return "";
    }
  }
  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };
  const handleAddItem = () => {
    const newId = Math.max(...items.map((item) => item.id), 0) + 1;
    const newItemWithId = { ...newItem, id: newId };
    setItems([...items, newItemWithId]);
    setNewItem({ itemName: "", price: 0 });
  };
  const handleAddTF2Key = async (keyPrice) => {
    const newId = Math.max(...items.map((item) => item.id), 0) + 1;
    setItems([
      ...items,
      {
        itemName: "TF2 Key",
        price: keyPrice,
        id: newId,
      },
    ]);
  };
  useEffect(() => {
    sell &&
      getTF2KeyPrice(globalState.userCurrency).then((data) => {
        setGlobalTF2KeyPrice(data.lowest_price);
      });
    return () => {};
  }, []);

  useEffect(() => {
    const total = items.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0);
    sum(tax ? total : total / 1.15);
    return () => {};
  }, [items,tax]);

  return (
    <div className=" flex flex-col pb-2 items-center bg-slate-100 rounded-md">
      <div className="bg-[#101010] p-3 mx-4 flex flex-col gap-2 mt-4 rounded-md">
        <input
          className="rounded-md px-3 py-1"
          type="text"
          placeholder="Item Name"
          value={newItem.itemName}
          onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
        />
        <input
          className="rounded-md px-3 py-1"
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({ ...newItem, price: parseFloat(e.target.value) })
          }
        />
        <input
          className="text-white cursor-pointer mx-auto  bg-green-700 w-fit  p-1  rounded-sm"
          type="submit"
          value="➕Add Item"
          onClick={handleAddItem}
        />
      </div>
      {sell && (
        <input
          className="text-white cursor-pointer mx-auto w-5/6  mt-2 bg-[#101010] rounded-lg  p-1  "
          type="submit"
          value="Add TF2 Key"
          onClick={() => handleAddTF2Key(TF2KeyPrice)}
        />
      )}
      <ul className="w-full">
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToBuySellCart;
