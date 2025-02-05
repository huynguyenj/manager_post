import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Popconfirm, Table, Tag, Spin, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { Post } from '../../types/post';
import type { User } from '../../types/user';
import Title from 'antd/es/typography/Title';
import PostForm from '../../components/PostForm';

type PostPageApi = {
  api: AxiosInstance;
};

function Post({ api }: PostPageApi) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const posts = await api.get('/post');
      setPosts(posts.data);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user');
      setUsers(response.data as User[]);
    } catch (error) {
      console.log('Failed to fetch users: ', error);
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    console.log('Looking for user ID:', userId, 'Found:', user); // Debugging
    return user ? user.name : 'Unknown User';
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/post/${id}`);
      message.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.log(error)
      message.error('Failed to delete post');
    }
  };

  const showModal = (post: Post | null) => {
    setEditingPost(post);
    form.setFieldsValue(post || { userId: '', title: '', description: '', status: false });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingPost) {
        await api.put(`/post/${editingPost.id}`, values);
        message.success('Post updated successfully');
      } else {
        await api.post('/post', {...values,createDate: new Date().toISOString(),updateDate: new Date().toISOString()});
        message.success('Post created successfully');
      }
      setIsModalVisible(false);
      fetchPosts();
    } catch (error) {
      console.log(error)
      message.error('Failed to save post');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'User', key: 'user', render: (text: string, record: Post) => getUserName(record.userId) },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Status',
      key: 'status',
      render: (text: string, record: Post) => (
        <Tag color={record.status ? 'green' : 'gray'}>
          {record.status ? 'Published' : 'Draft'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Post) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this post?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
            ></Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchText.toLowerCase()) ||
    post.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <Card className="shadow-md w-full">
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>Post Management</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalVisible(true);
              setEditingPost(null);
              form.resetFields();
            }}
            size="large"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add Post
          </Button>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Search by name or email"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="large"
            className="max-w-md"
            allowClear
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredPosts}
            rowKey="id"
            className="shadow-sm w-full"
            pagination={{
              pageSize: 4,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} posts`
            }}
            scroll={{ x: true }}
          />
        )}
      </Card>

      <Modal
        title={
          <Title level={4}>
            {editingPost ? "Edit Post" : "Add New Post"}
          </Title>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={500}
        className="user-modal"
      >
        <PostForm
          form={form}
          onFinish={handleOk}
          onCancel={handleCancel}
          users={users}
          editingPost={editingPost}
        />
      </Modal>
    </div>
  );
}

export default Post;
