import { BarChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react'

type DataChart = {
      data:object[];
      chartName:string
      nameData:string
}

function Barchart({data,chartName,nameData}:DataChart) {

      const [selectedYear,setSelectedYear] = useState<string>();
      const handleChange = (e:React.ChangeEvent<HTMLSelectElement>):void=>{
            setSelectedYear(e.target.value)
          }
      const groupDataByYear =():Record<string,Record<number,number>>=>{
            const dataSet: Record<string, Record<number, number>> = {};
            // const dataSet:{[key:string]:{[value:number]:number}} = {}; //the same above
          
            data.forEach((dataTime)=>{
              const date = new Date(dataTime.createDate);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
      
             // Checks if groupedData already has an entry for the extracted year. If not, initializes an empty object for that year.
              if(!dataSet[year]) dataSet[year] = {}; 
              //Checks if the extracted month exists in that year inside groupedData.If not, initializes it with 0.
              if(!dataSet[year][month]) dataSet[year][month] = 0;
      
              dataSet[year][month]+=1; // plus all data the same year,month to get amount user of that month in year
      
            })
            return dataSet;
      }
      
       const dataUsage = groupDataByYear();
       const availibleYear = Object.keys(dataUsage).map(Number).sort((a,b)=> b-a).map(String);
      
       useEffect(()=>{
          if(availibleYear.length > 0 && !selectedYear){
            setSelectedYear(availibleYear[0])
          }
       },[availibleYear]);
      
       const chartData = selectedYear ? Object.entries(dataUsage[selectedYear]||{}).map(([month,value])=>({
          month,
          value
       })):[]
      
       const monthNames:string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
       const formattedChartData = chartData.map((data) => ({
        ...data,
        month: monthNames[+data.month - 1], // Convert month number to text 
      }));
  return (
    <div>    
      <label className="mr-2" htmlFor="year">Select year</label>
      <select id="year" value={selectedYear} onChange={handleChange} className="w-50 mt-5 p-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      {availibleYear.length > 0 && availibleYear.map((year)=>(
        <option value={year} key={year}>{year}</option>
      ))}
    </select>
    <div className="bg-gray-50 mt-5 p-2 shadow-md">
      <h2 className="font-bold m-2">{chartName}</h2>
    <BarChart
      series={[{label:nameData,data:chartData.map((data)=>data.value)},]}
      height={290}
      xAxis={[{ data: formattedChartData.map((data)=>data.month), scaleType: 'band' }]}
      margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
    />
    </div></div>
  )
}

export default Barchart