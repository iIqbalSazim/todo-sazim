import React from "react";
import { MantineProvider } from "@mantine/core";
import Home from "./pages/home";

export default class App extends React.Component {
  render() {
    return (
      <>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Home />
        </MantineProvider>
      </>
    );
  }
}
