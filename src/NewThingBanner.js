import React, { useState } from "react";
import { animated, useTransition, config } from "react-spring";
import styled from "styled-components";
import nanoid from "nanoid";

import plus from "./assets/plus.svg";
import IconButton from "./shared/IconButton";
import Input from "./shared/Input";
import Select from "./shared/Select";
import Button from "./shared/Button";

const Container = styled.div`
  background-color: #0f9de6;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

const Title = styled.h1`
  font-weight: 600;
`;

const Banner = ({ setAdding }) => (
  <React.Fragment>
    <Title>
      O que <br />
      você fez?
    </Title>
    <IconButton
      data-testid="add-button"
      iconUrl={plus}
      iconAlt="Adicionar coisa feita"
      onClick={() => setAdding(true)}
    />
  </React.Fragment>
);

const AddButton = styled(IconButton)`
  margin-left: 8px;
  height: 48px;
`;

const AddNewThingContainer = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-items: center;
`;

const InputButton = styled.div`
  margin-top: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CancelButton = styled(Button)`
  font-size: 0.8rem;
`;

const AddNewThing = ({ setAdding, onNewThing }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Outros");
  return (
    <AddNewThingContainer
      onSubmit={e => {
        e.preventDefault();
        if (text.trim() === "") {
          return;
        }
        setAdding(false);
        onNewThing({ id: nanoid(), category, text, when: [] });
        setText("");
      }}
    >
      <Select
        value={category}
        onChange={e => setCategory(e.target.value)}
        data-testid="category-select"
      >
        <option>Esportes</option>
        <option>Família</option>
        <option>Casa</option>
        <option>Trabalho</option>
        <option>Outros</option>
      </Select>
      <InputButton>
        <Input
          data-testid="new-thing-text"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <AddButton
          data-testid="submit-new-thing"
          type="submit"
          iconUrl={plus}
          iconAlt="Adicionar coisa feita"
        />
      </InputButton>
      <CancelButton onClick={() => setAdding(false)}>cancelar</CancelButton>
    </AddNewThingContainer>
  );
};

const Section = styled(animated.div)`
  padding: 1em 0.5em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const NewThingBanner = ({ onNewThing }) => {
  const [isAdding, setAdding] = useState(false);
  const transitions = useTransition(isAdding, null, {
    from: { position: "absolute", top: -300 },
    enter: { position: "relative", top: 0 },
    leave: { position: "absolute", top: -300 },
    config: config.stiff
  });
  return (
    <Container>
      {transitions.map(({ item: isAdding, key, props }) => (
        <Section key={key} style={props}>
          {isAdding ? (
            <AddNewThing setAdding={setAdding} onNewThing={onNewThing} />
          ) : (
            <Banner setAdding={setAdding} />
          )}
        </Section>
      ))}
    </Container>
  );
};

export default NewThingBanner;
