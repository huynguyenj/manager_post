import { Form, Input, Button, Select } from 'antd';
import type { Post } from '../types/post';
import type { User } from '../types/user';

interface PostFormProps {
    onFinish: (values: any) => void;
    onCancel: () => void;
    form: any;
    users: User[];
    editingPost: Post | null;
}

function PostForm({ onFinish, onCancel, form, users, editingPost }: PostFormProps) {
    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="pt-4"
        >
            <Form.Item
                name="userId"
                label="User"
                rules={[{ required: true, message: 'Please select a user!' }]}
            >
                <Select placeholder="Select a user" size="large">
                    {users.map(user => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input title!' }]}
            >
                <Input size="large" placeholder="Enter post title" />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input description!' }]}
            >
                <Input.TextArea size="large" placeholder="Enter post description" />
            </Form.Item>
            <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select a status!' }]}
            >
                <Select placeholder="Select a status" size="large">
                    <Select.Option value="draft">Draft</Select.Option>
                    <Select.Option value="published">Published</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item className="mb-0">
                <div className="flex justify-end gap-2">
                    <Button onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        {editingPost ? "Update" : "Create"}
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}

export default PostForm;
