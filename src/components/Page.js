import './Page.css'
import React, { useContext } from "react";
import { Container } from "@material-ui/core";

import Header from "./Header";
// import Inventory from "./Inventory";
import Cart from "./Cart";
import { AppContext } from "./AppProvider";
// import Settings from './Settings';

function Router({ route }) {
  switch (route) {
    // case "catalog": {
    //   return <Inventory />;
    // }
    // case "pos": {
    //   return <POS />;
    // }
    // case "settings": {
    //     return <Settings />;
    // }
    default: {
      return <Cart />;
    }
  }
}

export default function Page() {
  const { route, navigateTo } = useContext(AppContext);
  return (
    <div className={'page'}>
      <Header navigateTo={navigateTo} />
      <Container
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Router route={route} />
      </Container>
    </div>
  );
}
