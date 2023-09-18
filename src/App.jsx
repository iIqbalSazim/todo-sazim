import { MantineProvider } from "@mantine/core";
import Home from "./Pages/HomePage/HomePage";

const App = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Home />
      </MantineProvider>
    </>
  );
};

export default App;
