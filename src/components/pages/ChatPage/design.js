import styled from "styled-components";
import { Typography } from "antd";

const { Title } = Typography;

export const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px;
`;

export const TitleUnderlined = styled(Title)`
  border-bottom: 1px solid grey;
`;
//   border-radius: 5px;
//   box-shadow: 0px 4px 20px rgba(80, 80, 80, 0.8);
