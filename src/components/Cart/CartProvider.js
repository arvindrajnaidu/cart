import React, { useEffect, createContext, useState, useReducer } from "react";

// import { menuData } from './menu-fixture';
export const CartContext = createContext({});

const initialState = { order: { lineItems: {}, total: 0.0 } };

function reducer(state, action) {
  switch (action.type) {
    case "load-inventory": {
      return { ...state, inventory: action.inventory };
    }
    case "set-selected-item": {
      return { ...state, selectedItem: action.item };
    }
    case "set-variation": {
      return { ...state, selectedItem: action.item };
    }
    case "update-lineitem": {
      let newOrder = { ...state.order };
      let { lineItems } = newOrder;
      let { id, price, qty, name } = action;
      // console.log('>>>>> lineItems', lineItems)
      if (qty < 1) {
        delete lineItems[id];
      } else {
        lineItems[id] = {
          id,
          price,
          qty,
          name,
        };
      }

      newOrder.total = Object.keys(lineItems).reduce((acc, varId) => {
        acc = acc + lineItems[varId].price * lineItems[varId].qty;
        return acc;
      }, 0.0);
      return { ...state, selectedItem: undefined, order: newOrder };
    }
    case "remove-item":
      let newOrder = { ...state.order };
      if (!newOrder[action.id]) return;
      if (newOrder[action.id] === 0) return;
      newOrder[action.id] = newOrder[action.id] - 1;
      return { ...state, order: newOrder };
    case "reset-cart": {
      return { order: { lineItems: {}, total: 0.0 } };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [menu, setMenu] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadInventory = async () => {
      console.log('Loading inventory ...')
      const inventory = await window.CasualSeller.db.getItem("inventory");
      if (!inventory) return;

      const { categories, items, variations } = inventory;

      let dbMenu = categories
        .map((cat) => {
          return {
            id: cat.id,
            name: cat.name,
            items: items
              .filter((i) => i.catId === cat.id)
              .map((i) => {
                return {
                  id: i.id,
                  name: i.name,
                  variations: variations.filter(
                    (v) => v.isAvailable && v.itemId === i.id
                  ),
                };
              })
              .filter((i) => i.variations.length),
          };
        })
        .filter((cat) => cat.items.length);

      setMenu({ categories: dbMenu });
    };
    loadInventory()
  }, []);

  return (
    <CartContext.Provider value={{ ...state, menu, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
