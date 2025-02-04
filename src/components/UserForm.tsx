import { Form, Input, Button } from 'antd';
import type { User } from '../types/user';

interface UserFormProps {
  onFinish: (values: any) => void;
  onCancel: () => void;
  form: any;
  editingUser: User | null;
}

function UserForm({ onFinish, onCancel, form, editingUser }: UserFormProps) {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="pt-4"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Please input name!' },
          {
            validator: (_, value) => {
              if (/\d/.test(value)) {
                return Promise.reject('Name cannot contain numbers');
              }
              return Promise.resolve();
            }
          }
        ]}
        normalize={(value: string) => {
          if (!value) return value;
          return value
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }}
      >
        <Input size="large" placeholder="Enter user name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input email!' },
          { type: 'email', message: 'Please input valid email!' }
        ]}
      >
        <Input size="large" placeholder="Enter email address" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please input password!' },
          { min: 8, message: 'Password must be at least 8 characters' },
          { max: 20, message: 'Password cannot exceed 20 characters' },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              if (/^\d/.test(value)) {
                return Promise.reject('Password cannot start with a number');
              }
              if (!/\d/.test(value)) {
                return Promise.reject('Password must contain at least one number');
              }
              return Promise.resolve();
            }
          }
        ]}
      >
        <Input.Password size="large" placeholder="Enter password" />
      </Form.Item>
      <Form.Item className="mb-0">
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            {editingUser ? "Update" : "Create"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default UserForm;
