import ReactLoading from "react-loading";
import styled from "styled-components";
import PropsTypes from "prop-types";

export default function Loader({ height = 64, width = 64 }) {
  return (
    <LoaderWrap>
      <ReactLoading className="loading" type="spin" color="#ffe500" height={height} width={width} />
      상대를 기다리는 중입니다..
    </LoaderWrap>
  );
}

const LoaderWrap = styled.div`
  width: 100%;
  height: 30%;
  top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: absolute;
  font-weight: bold;

  .loading {
    margin-bottom: 2rem;
  }

`;

Loader.defaultProps = {
  height: 64,
  width: 64,
};

Loader.propTypes = {
  height: PropsTypes.number,
  width: PropsTypes.number,
};
