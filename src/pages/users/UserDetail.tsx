import {
  UserOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  SendOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Image,
  Input,
  Space,
  Button,
  Modal,
  Anchor,
  Upload,
} from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function UserDetail() {
  const [username, setUsername] = useState("NguyenTrongQuy");
  const [location, setLocation] = useState("Can Tho, Thot Not");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://p.turbosquid.com/ts-thumb/MV/ITqvGE/bV/00/jpg/1615400013/600x600/fit_q87/b3ae740822c492b31a1b1a0bc425b3500aef44ce/00.jpg",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://www.yourtango.com/sites/default/files/2022/triangle-symbolism-eye-of-providence.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://www.shopbentley.com/cdn/shop/files/1026152001_f.jpg?v=1688737132&width=1000",
    },
  ]);
  const showModal = (modalName: string) => {
    setOpenModal(modalName);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenModal(null);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModal(null);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="w-screen pt-3 sm:pl-12 sm:pt-7 sm:pr-7 flex flex-col justify-center sm:justify-normal">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <Image
          width={150}
          className="rounded-full min-w-10"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div className="flex flex-col gap-1">
          {/* Username */}
          <p className="text-2xl font-bold font-sans">{username}</p>
          {/* Location */}
          <p className="text-gray-400 flex items-center gap-1">
            <EnvironmentOutlined /> {location}
          </p>
          <div className="flex flex-col sm:flex-row gap-1">
            <Button
              size="large"
              type="primary"
              onClick={() => showModal("editProfile")}
            >
              Edit profile
            </Button>
            <Button size="large" onClick={() => showModal("aboutMe")}>
              About me
            </Button>
            <Button size="large">
              <SettingOutlined />
            </Button>
            <Button size="large">
              <SendOutlined />
            </Button>
          </div>
        </div>
      </div>
      {/* Modal - Edit profile */}
      <Modal
        title="Edit Profile"
        open={openModal === "editProfile"}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Space className="pt-3" direction="vertical">
          <Space direction="horizontal">
            {/* Edit Username */}
            <Input
              placeholder="input username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              disabled={!isEditingUsername}
              size="large"
            />
            <Button
              onClick={() => setIsEditingUsername(!isEditingUsername)}
              style={{ width: 60 }}
              size="large"
            >
              {isEditingUsername ? "Done" : "Edit"}
            </Button>
          </Space>
          <Space direction="horizontal">
            {/* Edit Location */}
            <Input
              placeholder="input location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              prefix={
                <EnvironmentOutlined style={{ color: "rgba(0,0,0,.25)" }} />
              }
              disabled={!isEditingLocation}
              size="large"
            />
            <Button
              onClick={() => setIsEditingLocation(!isEditingLocation)}
              style={{ width: 60 }}
              size="large"
            >
              {isEditingLocation ? "Done" : "Edit"}
            </Button>
          </Space>
          <Space direction="horizontal">
            {/* Edit Password */}
            <Input.Password
              placeholder="input password"
              defaultValue="123456"
              size="large"
              disabled={!isEditingPassword}
            />
            <Button
              onClick={() => setIsEditingPassword(!isEditingPassword)}
              style={{ width: 60 }}
              size="large"
            >
              {isEditingPassword ? "Done" : "Edit"}
            </Button>
          </Space>
        </Space>
      </Modal>
      {/* Modal - About me */}
      <Modal
        title="About me"
        open={openModal === "aboutMe"}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <img src="https://cdn.venngage.com/template/thumbnail/small/84c22658-8ba9-4d94-8ea7-13a21d5e93a7.webp" alt="image" />
      </Modal>
      <div className="p-4.5">
        <Anchor
          direction="horizontal"
          items={[
            {
              key: "part-1",
              href: "#part-1",
              title: "Posts",
            },
            {
              key: "part-2",
              href: "#part-2",
              title: "Liked",
            },
            {
              key: "part-3",
              href: "#part-3",
              title: "Comments",
            },
          ]}
        />
      </div>
      <div className="pl-4">
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>
    </div>
  );
}
