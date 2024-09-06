import React, { useRef, useEffect,useState } from "react";
import { Chart, registerables } from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';

// Register necessary Chart.js components
Chart.register(...registerables, CandlestickController, CandlestickElement);

const CandlestickChart = () => {
    const chartRef = useRef(null);
    const [data,setData] = useState();
    const[chart,updateChart] = useState();
    const parsedData = (origData) => {
        return origData.map(({ x, open: o, high: h, low: l, close: c }) => ({
            x: new Date(x), 
            o,
            h,
            l,
            c
        }));
    }
    function requestDataCandle(){
        
        
        fetch(`http://127.0.0.1:8000/api/candlestick-data/`)
            .then(response => response.json())
            .then(res => {
                console.log(parsedData(res.data));
                
                setData(parsedData(res.data));
                
               
                
            }).then(()=>{
                if(!chart){
                    updateChart(new Chart(chartRef.current, {
                        type: "candlestick",
                        data: {
                            datasets: [
                                {
                                    label: "Candlestick Chart",
                                    data: parsedData(res.data)
                                }
                            ]
                        }
                    }))
                }
               
                console.log(chart.data);
                console.log(chart.data);
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }
    
    /*
    data: [
        { x: new Date("2023-08-01"), o: 100, h: 120, l: 90, c: 110 },
        { x: new Date("2023-08-02"), o: 110, h: 130, l: 100, c: 120 },
        { x: new Date("2023-08-03"), o: 120, h: 140, l: 110, c: 130 },
        { x: new Date("2023-08-04"), o: 130, h: 150, l: 120, c: 140 },
        { x: new Date("2023-08-05"), o: 140, h: 160, l: 130, c: 150 }
    ]

    */

    useEffect(() => {
        
        if (!chartRef.current) return;
        requestDataCandle();
        
    }, []);

    return <canvas ref={chartRef} />;
};

export default CandlestickChart;