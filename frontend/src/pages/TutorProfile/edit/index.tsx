import { useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Upload,
  InputNumber,
  Select,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { UsersInterface } from "../../../interfaces/IUser";
import { GetUsersById, UpdateUsersById } from "../../../services/https/index";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import HeaderComponent from '../../../components/headertutor/index';

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const getUserById = async (id: string) => {
    let res = await GetUsersById(id);
    if (res.status === 200) {
      form.setFieldsValue({
        name: res.data.name,
        biography: res.data.biography,
        education: res.data.education,
        experience: res.data.experience,
        profilePicture: res.data.profilePicture, // Assuming profilePicture URL
      });
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลผู้ใช้",
      });
      setTimeout(() => {
        navigate("/customer");
      }, 2000);
    }
  };

  const onFinish = async (values: UsersInterface) => {
    let payload = {
      ...values,
      // Add the logic to handle file uploads if necessary
    };
    const res = await UpdateUsersById(id, payload);
    if (res.status === 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      setTimeout(() => {
        navigate("/customer");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const handleUploadChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully`);
      // Optionally update the form value with the file URL
      form.setFieldsValue({ profilePicture: file.response.url });
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  useEffect(() => {
    getUserById(id);
  }, [id]);

  return (
    <div>
      {contextHolder}
      <HeaderComponent />
      <Row style={{ height: '100vh', backgroundColor: '#FFFFFF', margin: 0 , }}>
        <Card className="card-profile"
          style={{
            marginTop: '100px',
            width: '100%',
            maxWidth: 1400,
            height: '80%',
            border: 'none',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            justifyContent: 'center'
          }}
        >
          <h2>แก้ไขข้อมูลผู้ใช้</h2>
          <Divider />
          <Form
            name="basic"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  label="รูปโปรไฟล์"
                  name="profilePicture"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
                >
                  <Upload
                    name="file"
                    action="/upload" // Replace with your upload URL
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    onChange={handleUploadChange}
                    showUploadList={{ showPreviewIcon: true }}
                  >
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  label="ประวัติย่อ"
                  name="biography"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกประวัติย่อ!",
                    },
                  ]}
                >
                  <Input.TextArea rows={2} placeholder="กรุณากรอกประวัติย่อ" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  label="การศึกษา"
                  name="education"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกการศึกษา!",
                    },
                  ]}
                >
                  <Input.TextArea rows={2} placeholder="กรุณากรอกการศึกษา" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  label="ประสบการณ์"
                  name="experience"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกประสบการณ์!",
                    },
                  ]}
                >
                  <Input.TextArea rows={2} placeholder="กรุณากรอกประสบการณ์" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end">
              <Col style={{ marginTop: "40px" }}>
                <Form.Item>
                  <Space>
                    <Link to="/profileuser">
                      <Button htmlType="button" style={{ marginRight: "10px" }}>
                        ยกเลิก
                      </Button>
                    </Link>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<PlusOutlined />}
                    >
                      บันทึก
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Row>
    </div>
  );
}

export default EditUser;
