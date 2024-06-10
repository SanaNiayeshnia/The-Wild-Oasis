import styled from "styled-components";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
const StyledFilter = styled.div`
  display: flex;
  gap: 0.25rem;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.25rem;
  box-shadow: 0px 0px 5px 0 #cbd5e1;
  & button {
    background-color: white;
  }
  & button.active {
    background-color: var(--color-green-500);
    color: white;
    cursor: auto;
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get(filterField)?.replaceAll("-", " ") ||
    options[0].toLowerCase();

  return (
    <StyledFilter>
      {options.map((opt, i) => (
        <Button
          key={i}
          className={currentFilter === opt.toLowerCase() && "active"}
          onClick={() => {
            searchParams.set(
              filterField,
              opt.replaceAll(" ", "-").toLowerCase()
            );
            setSearchParams(searchParams);
          }}
        >
          {opt}
        </Button>
      ))}
    </StyledFilter>
  );
}

export default Filter;
