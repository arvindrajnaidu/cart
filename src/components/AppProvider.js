import React, { useEffect, createContext, useReducer } from "react";

export const AppContext = createContext({});

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    // case "set-call":
    //   console.log("SEtting call");
    //   return { ...state, call: action.call };
    // case "add-item": {
    //   let newOrder = { ...state.order };
    //   let { lineItems } = newOrder;
    //   if (!lineItems[action.id])
    //     lineItems[action.id] = {
    //       qty: 0,
    //       name: action.name,
    //       price: action.price,
    //     };
    //   lineItems[action.id].qty = lineItems[action.id].qty + 1;
    //   newOrder.total = Object.keys(lineItems).reduce((acc, varId) => {
    //     acc = acc + lineItems[varId].price * lineItems[varId].qty;
    //     return acc;
    //   }, 0.0);
    //   return { ...state, order: newOrder };
    // }
    // case "remove-item":
    //   let newOrder = { ...state.order };
    //   if (!newOrder[action.id]) return;
    //   if (newOrder[action.id] === 0) return;
    //   newOrder[action.id] = newOrder[action.id] - 1;
    //   return { ...state, order: newOrder };
    // case "set-current-call": {
    //   return { ...state, currentCall: action.call };
    // }
    // case "save-settings": {
    //   const { name, phone, address, upi } = action;
    //   return {
    //     ...state,
    //     settings: {
    //       name,
    //       phone,
    //       address,
    //       upi,
    //     },
    //   };
    // }
    case "load-settings": {
      return { ...state, settings: { ...action.settings } };
    }
    default:
      return state;
  }
}

const dummyHandler = () => {};

export const AppProvider = ({
  children,
  onOrderSubmitted = dummyHandler,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const settingsStr = window.localStorage.getItem("seller_settings");
    // setDidLoadFromStorage(true);
    if (!settingsStr) return;
    dispatch({
      type: "load-settings",
      settings: JSON.parse(settingsStr),
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
