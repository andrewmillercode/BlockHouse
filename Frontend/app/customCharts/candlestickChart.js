import React, { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import 'chartjs-adapter-date-fns';

// Register necessary Chart.js components
Chart.register(...registerables, CandlestickController, CandlestickElement);

const CandlestickChart = ({ upderror }) => {
  const chartRef = useRef(null);
  //const [chartInstance, setChartInstance] = useState(null);

  const parsedData = (origData) => {
    return origData.map(({ x, open: o, high: h, low: l, close: c }) => ({
      x: new Date(x),
      o,
      h,
      l,
      c
    }));
  };

  const requestDataCandle = () => {
    
  };

  useEffect(() => {
    if(!chartRef.current) return;

    let chart = null;
    fetch(`http://127.0.0.1:8000/api/candlestick-data/`)
      .then(response => response.json())
      .then(res => {
        const data = parsedData(res.data);

        

        // Create a new chart instance
        chart = new Chart(chartRef.current, {
          type: "candlestick",
          data: {
            datasets: [
              {
                label: "Candlestick Chart",
                data: data,
                backgroundColors: {
                  up: '#3ebf30',
                  down: '#FA3A3A',
                  unchanged: '#999',
                },
                borderColors: {
                  up: '#3ebf30',
                  down: '#FA3A3A',
                  unchanged: '#999',
                }
              }
            ]
          },
          options: {
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });

        
      })
      .catch(error => {
        //figure out chart unmounting error
        //upderror(true);
        console.log('Error fetching data:', error);
      });

    
    return () => {
      if (chart) {chart.destroy();}
    };
  }, []); 

  return <canvas ref={chartRef} />;
};

export default CandlestickChart;
