import React, { useState } from "react";
import styled from "styled-components";
import nanoid from "nanoid";
import { format } from "date-fns";

import IconButton from "./shared/IconButton";
import addIcon from "./assets/add.svg";
import removeIcon from "./assets/trash.svg";
import Table from "./shared/Table";
import Input from "./shared/Input";

const Thing = styled.div`
  padding: 16px;
  background: ${p =>
    p.selected ? p.theme.selectedBackground : p.theme.background};
  margin: 8px 0;
`;
const ThingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
`;
const ThingSelector = styled.div`
  flex: 0 0 24px;
  height: 24px;
  border: 2px solid #1885bd;
  border-radius: 35%;
  margin-right: 16px;
  background-color: ${props => (props.selected ? "#1885bd" : "transparent")};
`;
const ThingText = styled.h3`
  flex: 1;
  text-align: left;
  font-size: 1rem;
  font-weight: 200;
  color: ${p => p.theme.itemColor};
`;
const ActionButton = styled(IconButton)`
  flex: 0 0 32px;
`;

const ThingContent = styled.div``;
const NewThingDone = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 40px;
  margin-top: 8px;
`;
const NewThingDoneInput = styled(Input)`
  border-bottom: 1px solid ${p => p.theme.itemColor};
  color: ${p => p.theme.newItemColor};
  margin-right: 8px;
`;
const ThingsDoneTable = styled(Table)`
  font-size: 0.7rem;
  margin-top: 8px;
  color: ${p => p.theme.newItemColor};
  tr td:nth-child(1) {
    text-align: left;
  }
  tr td:nth-child(2) {
    text-align: right;
  }
`;

const sortItems = items => items.sort((a, b) => b.date - a.date);
const pluralOrSingular = (number, singular, plural) => {
  return `${number} ${number === 1 ? singular : plural}`;
};

const ThingItem = ({ id, text, when, removeThing, onNewThingDone }) => {
  const [selected, setSelected] = useState(false);
  const [obs, setObs] = useState("");
  return (
    <Thing selected={selected}>
      <ThingHeader>
        <ThingSelector
          selected={selected}
          onClick={() => setSelected(!selected)}
        />
        <ThingText onClick={() => setSelected(!selected)}>
          {`${text} `}
          <small>({pluralOrSingular(when.length, "vez", "vezes")})</small>
        </ThingText>
        {selected && (
          <ActionButton
            iconUrl={removeIcon}
            iconAlt="Deletar coisa"
            onClick={() => removeThing(id)}
          />
        )}
      </ThingHeader>
      {selected && (
        <ThingContent>
          <NewThingDone
            onSubmit={e => {
              e.preventDefault();
              onNewThingDone(id, { id: nanoid(), date: Date.now(), obs });
              setObs("");
            }}
          >
            <NewThingDoneInput
              data-testid="new-thing-item"
              type="text"
              value={obs}
              placeholder="Alguma observação?"
              onChange={e => setObs(e.target.value)}
            />
            <ActionButton
              data-testid="mark-as-done"
              iconUrl={addIcon}
              iconAlt="Marcar como feito"
            />
          </NewThingDone>
          <ThingsDoneTable data-testid="things-table">
            <tbody>
              {sortItems(when).map(w => (
                <tr key={w.id}>
                  <td style={{ minWidth: 90 }}>
                    {format(w.date, "dd/MM/yy hh:mm")}
                  </td>
                  <td>{w.obs}</td>
                </tr>
              ))}
            </tbody>
          </ThingsDoneTable>
        </ThingContent>
      )}
    </Thing>
  );
};

export default ThingItem;
