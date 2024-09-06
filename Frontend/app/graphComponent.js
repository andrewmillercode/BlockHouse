'use client';
//import Link from 'next/link';
import { useEffect, useRef, useState} from 'react';
import Chart, { Colors } from 'chart.js/auto';
import { Bar, Line, Pie } from 'react-chartjs-2';
import CandlestickChart from './customCharts/candlestickChart';
const GraphComponent = ({typeChart}) => {
    const chart = useRef(null);
    const [labels,setLabels] = useState([]);
    const [data,setData] = useState([]);
    const [error,Seterror] = useState(false);
    let chartConfigData = {
        labels: labels,
        datasets: [
            {
                data: data,
                fill: true,
                
                borderColor: typeChart=='Pie' ? ['#FA3A3A','#035CF7','#FFEF00'] : 'rgb(75, 192, 192)',
                borderWidth:3,
                tension: 1,
            },
        ],
    };
    let chartConfigoptions = {
        plugins : {
            legend:{
                display:false
            }
        }
    };

    function requestData(){
        if(!typeChart) return;
        let apiParam = null;
        switch(typeChart){
            case "Line":
                apiParam ='line-chart-data';
                break;
            case "Bar":
                apiParam ='bar-chart-data';
                break;
            case "Pie":
                apiParam ='pie-chart-data';
                break;
            default:
                return;
        }
        fetch(`http://127.0.0.1:8000/api/${apiParam}/`)
            .then(response => response.json())
            .then(res => {
                setData(res.data);
                setLabels(res.labels);
               
                
            }).then(()=>{
                
                chart.current.update();
            })
            .catch(error => {
                Seterror(true);
                console.log('Error fetching data:', error);
            });
    }
    useEffect(()=>{
        requestData();
    },[])

    
    //<Bar data={data} options={options}/>
  return (
    <div className='graphComponent'>
        <h1>{typeChart} Chart</h1>
        {error==true && <h1 style={{color:'red'}}>error!</h1>}
        {!error && typeChart=="Line" && <Line ref={chart}data={chartConfigData} options={chartConfigoptions}/>}
        {!error && typeChart=="Bar" && <Bar ref={chart}data={chartConfigData} options={chartConfigoptions}/>}
        {!error && typeChart=="Pie" && 
       
        <div style={{height:"75%",position:"relative", marginBottom:"25%", padding:"0"}}>
            <Pie ref={chart}data={chartConfigData} options={chartConfigoptions}/>
        </div>}
        {!error && typeChart=="Candlestick" && <CandlestickChart upderror={Seterror}/>}
    </div>
    
  );
};

export default GraphComponent;