import styled from 'styled-components';
import { palette } from 'styled-theme';

const MyD3ComponentWrapper = styled.div`
  .axis {
    font-family: sans-serif;
    fill: #d35400;
    font-size: 12px;
  }
  .line {
    fill: none;
    stroke: #f1c40f;
    stroke-width: 3px;
  }
  .smoothline {
    fill: none;
    stroke: #e74c3c;
    stroke-width: 3px;
  }
  .area {
    fill: #e74c3c;
    opacity: 0.5;
  }
  .circle {
    stroke: #e74c3c;
    stroke-width: 3px;
    fill: #fff;
  }
  .grid {
    stroke: #ddd;
    stroke-width: 1px;
    fill: none;
  }
`;

export default MyD3ComponentWrapper;
