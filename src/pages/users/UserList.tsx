import { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react';
import { Button, Form, Modal, Space, Table, Spin, Card, Typography, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import UserForm from '../../components/UserForm';
import type { User } from '../../types/user';
import { toast } from 'react-toastify';

type UserPageApi = {
  api: AxiosInstance
} 

const { Title } = Typography;

function User({ api }: UserPageApi) {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user");
      setUsers(response.data as User[]);
    } catch (error) {
      console.log("Failed to fetch users: ", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (values: any) => {
    if (editingUser) {
      Modal.confirm({
        title: 'Confirm Update',
        content: 'Are you sure you want to update this user?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: async () => {
          try {
            await api.put(
              `/user/${editingUser.id}`, 
              {
                ...values,
                updateDate: new Date().toISOString()
              }
            );
            toast.success('User updated successfully!');
            setIsModalOpen(false);
            form.resetFields();
            fetchUsers();
          } catch (error) {
            toast.error('Failed to update user. Please try again.');
            console.log("Failed to update user: ", error);
          }
        }
      });
    } else {
      try {
        await api.post('/user', {
          ...values,
          createDate: new Date().toISOString(),
          updateDate: new Date().toISOString()
        });
        toast.success('User created successfully!');
        setIsModalOpen(false);
        form.resetFields();
        fetchUsers();
      } catch (error) {
        toast.error('Failed to create user. Please try again.');
        console.log("Failed to create user: ", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await api.delete(`/user/${id}`);
          toast.success('User deleted successfully!');
          fetchUsers();
        } catch (error) {
          toast.error('Failed to delete user. Please try again.');
          console.log("Failed to delete user: ", error);
        }
      }
    });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created Date',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Updated Date',
      dataIndex: 'updateDate',
      key: 'updateDate',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <Card className="shadow-md w-full">
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>User Management</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => {
              setIsModalOpen(true);
              setEditingUser(null);
              form.resetFields();
            }}
            size="large"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add User
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
            dataSource={filteredUsers} 
            rowKey="id"
            className="shadow-sm w-full"
            pagination={{
              pageSize: 4,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`
            }}
            scroll={{ x: true }}
          />
        )}
      </Card>

      <Modal
        title={
          <Title level={4}>
            {editingUser ? "Edit User" : "Add New User"}
          </Title>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
        className="user-modal"
      >
        <UserForm 
          form={form}
          onFinish={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          editingUser={editingUser}
        />
      </Modal>
    </div>
  );
}

export default User;