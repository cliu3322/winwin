//https://medium.com/@jeffbutsch/using-d3-in-react-with-hooks-4a6c61f1d102
//http://bl.ocks.org/denisemauldin/ceb7065687c125223339a26a47d58a28
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import MyD3ComponentWrapper from './MyD3Component.styles';
/* Component */
export default props => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);
  var x = d3
    .scaleLinear()
    .domain([0, 500])
    .range([0, 500]);
  var y = d3
    .scaleLinear()
    .domain([0, 500])
    .range([500, 0]);
  var smoothLine = d3
    .line()
    .curve(d3.curveCardinal)
    .x(function(d) {
      console.log('this is smoothLine', d);
      return x(d.x);
    })
    .y(function(d) {
      return y(d.y);
    });
  var chart = d3.select(d3Container.current);
  var data = [];
  var trans = 0;
  useEffect(() => {
    console.log('init');
  }, []);
  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      if (props.data && d3Container.current) {
        var smoothLine1 = d3
          .line()
          .curve(d3.curveCardinal)
          .x(function(d) {
            console.log('this is smoothLine', d);
            return x(d.x);
          })
          .y(function(d) {
            return y(d.y);
          });
        trans = trans + 50;
        console.log('tick', props.data);
        // Bind D3 data
        data.push(props.data);
        var path = chart.append('path');
        path
          .datum(props.data)
          .attr('class', 'smoothline')
          .attr('d', smoothLine1);

        path
          .attr('transform', null)
          .transition()
          .duration(500)
          .ease(d3.easeLinear, 2)
          .attr('transform', 'translate(' + 50 + ')');
      }
    },

    /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    [props.data]
  );

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
