import { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react';

type UserPageApi={
  api:AxiosInstance
}
function User({api}:UserPageApi) {
  const [users, setUsers] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user");
      setUsers(response.data);
      console.log(users)
    } catch (error) {
      console.log("Failed to fetch users: ",error);
    }
    setLoading(false);
  };

    //Cách gọi api:
  //post: tương tự get dùng api.post('/user')
  //delete: api.delete('/user/:id') (ví dụ: api.delete(`/user/${id}`));
  //put: api.put('/user/:id') (ví dụ: api.put(`/user/${id}`));
  //get by id: api.get('/user/:id') (ví dụ: api.getget(`/user/${id}`));
  
  return (
    <div>User</div>
  )
}

export default User