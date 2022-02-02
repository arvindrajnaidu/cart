import React, { useContext } from "react";
import { AppProvider } from "./components/AppProvider";
import Page from "./components/Page";

export default function Home(props) {
  return (
    <AppProvider {...props}>
      <Page />
    </AppProvider>
  );
}
