//https://medium.com/@jeffbutsch/using-d3-in-react-with-hooks-4a6c61f1d102
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import MyD3ComponentWrapper from './MyD3Component.styles';
/* Component */
var data = [];
var width = 500;
var height = 500;
var globalX = 0;
var duration = 500;
var max = 500;
var step = 10;
var x = d3
  .scaleLinear()
  .domain([0, 500])
  .range([0, 500]);
var y = d3
  .scaleLinear()
  .domain([0, 500])
  .range([500, 0]);
// -----------------------------------
var line = d3
  .line()
  .x(function(d) {
    return x(d.x);
  })
  .y(function(d) {
    return y(d.y);
  });
var smoothLine = d3
  .line()
  .curve(d3.curveCardinal)
  .x(function(d) {
    return x(d.x);
  })
  .y(function(d) {
    return y(d.y);
  });
var lineArea = d3
  .area()
  .x(function(d) {
    return x(d.x);
  })
  .y0(y(0))
  .y1(function(d) {
    return y(d.y);
  })
  .curve(d3.curveCardinal);
var chart;
var xAxis;
var axisX;
var path;
var areaPath;
var realData = [];
export default props => {
  const d3Container = useRef(null);
  useEffect(() => {
    console.log('outtick');
    chart = d3
      .select(d3Container.current)
      .attr('width', width + 50)
      .attr('height', height + 50);
    // -----------------------------------

    // Draw the grid
    chart
      .append('path')
      .datum([{ x: 0, y: 150 }, { x: 500, y: 150 }])
      .attr('class', 'grid')
      .attr('d', line);
    chart
      .append('path')
      .datum([{ x: 0, y: 300 }, { x: 500, y: 300 }])
      .attr('class', 'grid')
      .attr('d', line);
    chart
      .append('path')
      .datum([{ x: 0, y: 450 }, { x: 500, y: 450 }])
      .attr('class', 'grid')
      .attr('d', line);
    chart
      .append('path')
      .datum([{ x: 50, y: 0 }, { x: 50, y: 500 }])
      .attr('class', 'grid')
      .attr('d', line);
    chart
      .append('path')
      .datum([{ x: 250, y: 0 }, { x: 250, y: 500 }])
      .attr('class', 'grid')
      .attr('d', line);
    chart
      .append('path')
      .datum([{ x: 450, y: 0 }, { x: 450, y: 500 }])
      .attr('class', 'grid')
      .attr('d', line);
    // Draw the axis
    xAxis = d3.axisBottom().scale(x);
    axisX = chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, 500)')
      .call(xAxis);

    // Append the holder for line chart and fill area
    path = chart.append('path');
    areaPath = chart.append('path');
    //tick()
  }, []);

  useEffect(() => {
    let vMax;
    let vMin;
    if (props.data) {
      realData.push(props.data);
      if (realData.length > 1) {
        vMax = Math.max.apply(
          Math,
          realData.map(function(o) {
            return o.price;
          })
        );
        vMin = Math.min.apply(
          Math,
          realData.map(function(o) {
            return o.price;
          })
        );
      } else {
        vMax = props.data.price * 2;
        vMin = 0;
      }
    }
    console.log('realData', realData);
    var realY = d3
      .scaleLinear()
      .domain([vMin, vMax])
      .range([0.2, 0.8]);
    console.log(
      'point',
      props.data ? realY(props.data.price) : null,
      props.data ? props.data.price : null
    );
    // Generate new data
    var point = {
      x: globalX,
      y: ((props.data ? realY(props.data.price) : 0) * 450 + 50) >> 0,
    };
    // console.log(Math.random())
    // console.log('1 point',point)
    // console.log('2 data',data)
    // console.log('3 props.data',props.data)
    data.push(point);
    globalX += step;
    // Draw new line
    path
      .datum(data)
      .attr('class', 'smoothline')
      .attr('d', smoothLine);
    // Draw new fill area
    areaPath
      .datum(data)
      .attr('class', 'area')
      .attr('d', lineArea);
    // Shift the chart left
    x.domain([globalX - (max - step), globalX]);
    axisX
      .transition()
      .duration(duration)
      .ease(d3.easeLinear, 2)
      .call(xAxis);
    path
      .attr('transform', null)
      .transition()
      .duration(duration)
      .ease(d3.easeLinear, 2)
      .attr('transform', 'translate(' + x(globalX - max) + ')');
    areaPath
      .attr('transform', null)
      .transition()
      .duration(duration)
      .ease(d3.easeLinear, 2)
      .attr('transform', 'translate(' + x(globalX - max) + ')');

    // Remote old data (max 50 points)
    if (data.length > 50) data.shift();
    if (realData.length > 50) realData.shift();
  }, [props.data]);
  return (
    <MyD3ComponentWrapper>
      <svg
        className="d3-component"
        width={400}
        height={200}
        ref={d3Container}
      />
    </MyD3ComponentWrapper>
  );
};
