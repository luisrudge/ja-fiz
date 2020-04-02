import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: none;
  color: #fff;
  border-bottom: solid 1px rgba(255, 255, 255, 0.8);
  border-radius: 0;
  transition: all 0.3s linear;
  padding-bottom: 4px;
  background-color: transparent;
  &:focus {
    border-bottom-color: solid 1px rgba(255, 255, 255, 1);
    outline: 0;
  }
`;

export default Input;
