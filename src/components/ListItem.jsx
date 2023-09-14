import React, { useState } from "react";
import { useGlobalState } from "../GlobalStateContext";

const ListItem = ({ item, onEdit, onDelete }) => {
  const { globalState, setGlobalState } = useGlobalState();

  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(item.id, editedItem);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
  };
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: globalState.userCurrency,
  });
  return (
    <li className="w-full flex justify-around gap-2 px-2 mt-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedItem.itemName}
            onChange={(e) =>
              setEditedItem({ ...editedItem, itemName: e.target.value })
            }
          />
          <input
            type="number"
            value={editedItem.price}
            onChange={(e) =>
              setEditedItem({
                ...editedItem,
                price: parseFloat(e.target.value),
              })
            }
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <span>{item.itemName}</span>
          <span>{currencyFormatter.format(item.price)}</span>
          <div>
            <button onClick={handleEditClick}>🖍</button>
            <button onClick={handleDeleteClick}>✖</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ListItem;
