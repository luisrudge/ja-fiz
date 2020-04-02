import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useLocalStorageState } from "react-storage-hooks";

import Header from "./Header";
import NewThingBanner from "./NewThingBanner";
import Main from "./Main";

const Container = styled.div`
  position: fixed;
  display: grid;
  height: 100vh;
  height: fill-available;
  width: 100%;
  grid-template-rows: 64px 130px auto;
`;

const THEMES = {
  dark: {
    background: "#3e3e3e",
    selectedBackground: "#333",
    text: "#fff",
    itemColor: "#fff",
    newItemColor: "#fff",
    categoryColor: "#fff",
    headerFilter: "brightness(0) invert(1)"
  },
  light: {
    background: "#fff",
    selectedBackground: "#f4f2f2",
    text: "#333",
    itemColor: "#243b6b",
    newItemColor: "#536388",
    categoryColor: "#929db6",
    headerFilter: "none"
  }
};

const App = () => {
  const [things, setThings] = useLocalStorageState("jafiz:db", []);
  const [darkTheme, setDarkTheme] = useLocalStorageState("jafiz:dark", false);
  return (
    <ThemeProvider theme={THEMES[darkTheme ? "dark" : "light"]}>
      <Container>
        <Header toggleDarkTheme={() => setDarkTheme(!darkTheme)} />
        <NewThingBanner onNewThing={t => setThings([...things, t])} />
        <Main
          things={things}
          onNewThingDone={(thingId, thingDone) =>
            setThings([
              ...things.map(t2 => {
                if (thingId !== t2.id) {
                  return t2;
                }
                return { ...t2, when: [...t2.when, thingDone] };
              })
            ])
          }
          removeThing={id => {
            if (!window.confirm("Tem certeza?")) {
              return;
            }
            setThings([...things.filter(t2 => t2.id !== id)]);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
