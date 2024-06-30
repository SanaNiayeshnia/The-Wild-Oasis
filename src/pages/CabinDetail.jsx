import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CabinDataBox from "../features/cabins/CabinDataBox";

const StyledCabinDetail = styled.div`
  padding: 0 1rem;
  max-width: 65rem;
  max-height: min-content;
  margin: auto;
`;
const CabinHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 1.5rem;
  margin: auto;
  & p:first-child {
    font-size: 1.5rem;
    color: var(--color-Gray-800);
    font-weight: 600;
  }
  & span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-Gray-800);
    font-weight: 600;
    cursor: pointer;
  }
  & span svg {
    transition: all 0.3s;
  }
  & span:hover svg {
    color: var(--color-green-500);
    transform: scale(1.1);
  }
`;
function CabinDetail() {
  const navigate = useNavigate();
  return (
    <StyledCabinDetail>
      <CabinHead>
        <p>Cabin#246</p>
        <span onClick={() => navigate(-1)}>
          <HiArrowLeft />
          Back
        </span>
      </CabinHead>
      <CabinDataBox />
    </StyledCabinDetail>
  );
}

export default CabinDetail;
