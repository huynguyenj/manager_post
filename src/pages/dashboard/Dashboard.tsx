import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { UserIcon } from "../../components/MuiIcon";
import CardData from "../../components/CardData";
import { BarChart } from '@mui/x-charts/BarChart';
import { toast } from 'react-toastify';

type DashboardPageApi = {
  api: AxiosInstance;
};
function Dashboard({ api }: DashboardPageApi) {
  const [users, setUsers] = useState<[]>([]);
  const [postList, setPostList] = useState<[]>([]);
  const [selectedYear,setSelectedYear] = useState<string>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/user");
      const posts = await api.get("/post");
      setUsers(response.data); 
      setPostList(posts.data);
      console.log(users);
    } catch (error) {
      toast.error('Get data fail!');
      console.log("Failed to fetch users: ", error);
    }
  };

  const handleReload = ():void=>{
    try {
      fetchData();
      toast.success('Reload data successfully!');
    } catch (error) {
      toast.error('Reload fail!');
      console.log(error)
    }
  }
  
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>):void=>{
    setSelectedYear(e.target.value)
  }

  const groupDataByYear =():Record<string,Record<number,number>>=>{
      const dataSet: Record<string, Record<number, number>> = {};
      // const dataSet:{[key:string]:{[value:number]:number}} = {}; //the same above
    
      users.forEach((data)=>{
        const date = new Date(data.createDate);
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

 const data = groupDataByYear();
 const availibleYear = Object.keys(data).map(Number).sort((a,b)=> b-a).map(String);

 useEffect(()=>{
    if(availibleYear.length > 0){
      setSelectedYear(availibleYear[0])
    }
 },[availibleYear]);

 const chartData = selectedYear ? Object.entries(data[selectedYear]||{}).map(([month,value])=>({
    month,
    value
 })):[]

 const monthNames:string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
 const formattedChartData = chartData.map((data) => ({
  ...data,
  month: monthNames[+data.month - 1], // Convert month number to text 
}));

  return (
    <div className="w-full">
      <h1 className="ml-10 mt-2 text-3xl font-bold text-gray-500">Dashboard</h1>
      <div className="p-5">
        {users.length > 0 && postList.length > 0 ? (
          <div>
            <button className="bg-amber-500 text-white font-bold p-3 rounded-2xl hover:opacity-75 cursor-pointer m-2" onClick={handleReload}>Reload</button>
          <div className="flex gap-5 items-center">

            <CardData style="bg-blue-500 w-50 h-30 md:w-70 lg:w-80 lg:h-40 rounded-2xl gap-4 flex flex-col items-center justify-center p-2" data={users.length} Icon={UserIcon} content={"Number of users:"}/>
            <CardData style="bg-emerald-300 w-50 h-30 md:w-70 lg:w-80 lg:h-40 rounded-2xl gap-4 flex flex-col items-center justify-center p-2" data={postList.length} Icon={UserIcon} content={"Number of posts:"}/>
          
          </div>
          <label className="mr-2" htmlFor="year">Select year</label>
          <select id="year" value={selectedYear} onChange={handleChange} className="w-50 mt-5 p-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            {availibleYear.length > 0 && availibleYear.map((year)=>(
              <option value={year} key={year}>{year}</option>
            ))}
          </select>
          <div className="bg-gray-50 mt-5 p-2 shadow-md">
            <h2 className="font-bold m-2">User amount</h2>
          <BarChart
            series={[{label:'Users',data:chartData.map((data)=>data.value)},]}
            height={290}
            xAxis={[{ data: formattedChartData.map((data)=>data.month), scaleType: 'band' }]}
            margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
          />
          </div>
        </div>
        ) : (
          <Loading />
        )}
      </div>
     
    </div>
  );
}

export default Dashboard;

