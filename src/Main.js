import React from "react";
import styled from "styled-components";
import groupBy from "lodash.groupby";
import ThingItem from "./ThingItem";
import plus from "./assets/plus.svg";

const Container = styled.div`
  background-color: ${p => p.theme.background};
  color: ${p => p.theme.text};
  overflow-y: auto;
  padding: 1em;
`;

const EmptyContainer = styled.p`
  text-align: center;
  padding: 16px;
  font-size: 2rem;
  line-height: 4rem;
`;

const SmallCheckButton = styled.img`
  height: 32px;
  width: 32px;
  vertical-align: middle;
`;

const Category = styled.div``;
const CategoryName = styled.h3`
  font-size: 0.8rem;
  color: ${p => p.theme.categoryColor};
`;

const Main = ({ things, removeThing, onNewThingDone }) => {
  const byCategory = groupBy(things, t => t.category);
  return (
    <Container>
      {things.length === 0 && (
        <EmptyContainer>
          Não tem nada aqui. Clique em{" "}
          <SmallCheckButton src={plus} alt="Adicionar tarefa" /> para começar.
        </EmptyContainer>
      )}
      {Object.keys(byCategory).map(c => (
        <Category key={c}>
          <CategoryName>{c}</CategoryName>
          {byCategory[c].map(t => (
            <ThingItem
              key={t.id}
              {...t}
              removeThing={removeThing}
              onNewThingDone={onNewThingDone}
            />
          ))}
        </Category>
      ))}
      {/* <pre>{JSON.stringify(byCategory, null, 1)}</pre> */}
    </Container>
  );
};

export default Main;
