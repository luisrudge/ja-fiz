import styled from "styled-components";

const Select = styled.select`
  width: 100%;
  color: #fff;
  position: relative;
  display: inline-block;
  border-radius: 0.25em;
  position: relative;
  z-index: 1;
  appearance: none;
  padding: 0.5em;
  padding-right: 2em;
  border: 1px solid;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s linear;
  border-color: rgba(255, 255, 255, 0.8);
  &:focus {
    border-color: rgba(255, 255, 255, 1);
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0.75em;
    transform: translateY(-75%) rotateZ(45deg);
    padding: 0.1875em;
    border-right: 0.125em solid;
    border-bottom: 0.125em solid;
  }

  &::-ms-expand {
    display: none;
  }
`;

export default Select;
