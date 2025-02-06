import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { UserIcon,InterestingIcon } from "../../components/MuiIcon";
import CardData from "../../components/CardData";
import { toast } from 'react-toastify';
import Barchart from "../../components/Barchart";

type DashboardPageApi = {
  api: AxiosInstance;
};
function Dashboard({ api }: DashboardPageApi) {
  const [users, setUsers] = useState<object[]>([]);
  const [postList, setPostList] = useState<object[]>([]);

  useEffect(():void => {
    fetchData();
  }, []);

  const fetchData = async ():Promise<void> => {
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
  


  return (
    <div className="w-full">
      <h1 className="m-5  text-3xl font-bold text-black bg-gray-100 p-5 rounded-2xl">Dashboard</h1>
      <div className="p-5">
        {users.length > 0 && postList.length > 0 ? (
          <div>
          <div className="flex gap-5 items-center bg-gray-100 p-5 rounded-2xl w-full mb-5">
            <button className="bg-amber-500  text-white font-bold p-3 rounded-2xl hover:opacity-75 cursor-pointer m-2" onClick={handleReload}>Reload</button>

            <CardData style="bg-blue-500 w-15 h-20 sm:w-40 sm:h-20 md:w-70 lg:w-80 lg:h-40 rounded-2xl gap-4 flex flex-col items-center justify-center p-2" data={users.length} Icon={UserIcon} content={"Number of users:"}/>
            <CardData style="bg-emerald-300 w-15 h-20 sm:w-40 sm:h-20 md:w-70 lg:w-80 lg:h-40 rounded-2xl gap-4 flex flex-col items-center justify-center p-2" data={postList.length} Icon={InterestingIcon} content={"Number of posts:"}/>
          
          </div>
          <div className="grid grid-cols-2 gap-5">
          <Barchart data={users} chartName="User amount" nameData="Users"/>
          <Barchart data={postList} chartName="Post amount" nameData="Posts"/>
          
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

