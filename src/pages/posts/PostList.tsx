import { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react'

type PostPageApi = {
  api:AxiosInstance
}
function Post({api}:PostPageApi) {

  const [postList,setPostList] = useState<[]>([]);
  useEffect(()=>{
    fetchPost();
  },[])

  const fetchPost = async ()=>{
    try {
      const posts =await api.get('/post');
      setPostList(posts.data);
      console.log(postList)
    } catch (error) {
      console.log(error);
    }
  }

  //Cách gọi api:
  //post: tương tự get dùng api.post('/post')
  //delete: api.delete('/post/:id') (ví dụ: api.delete(`/post/${id}`));
  //put: api.put('/post/:id') (ví dụ: api.put(`/post/${id}`));
  //get by id: api.get('/post/:id') (ví dụ: api.getget(`/post/${id}`));

  return (
    <div>Post</div>
  )
}

export default Post