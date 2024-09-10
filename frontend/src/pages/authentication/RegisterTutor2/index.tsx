import {
  Button,
  Card,
  Form,
  Input,
  message,
  Row,
  Col,
  Upload,
} from "antd";
import React, { useState } from "react";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../../services/https";
import { UsersInterface } from "../../../interfaces/IUser";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import logo1 from "../../../assets/logo1.png";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function SignUpTutor2Pages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values: UsersInterface) => {
    let res = await CreateUser(values);

    if (res.status === 201) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Row style={{ height: "100vh", backgroundColor: "#FFFF" }}>
        <Col
          xs={24}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          style={{
            backgroundColor: "#333D51",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            alt="logo"
            style={{ width: "50%", marginTop: "-200%" }}
            src={logo1}
            className="images-logo"
          />
        </Col>

        <Col
          xs={24}
          sm={20}
          md={20}
          lg={20}
          xl={20}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            className="card-login"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              padding: "20px",
            }}
          >
            <Button
              type="link"
              onClick={() => navigate(-1)}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                fontSize: "16px",
              }}
            >
              <ArrowLeftOutlined /> ย้อนกลับ
            </Button>
            <Row
              align={"middle"}
              justify={"center"}
              style={{ marginBottom: "30px" }}
            >
              <Col xs={24} style={{ textAlign: "center" }}>
                <h2 className="header" style={{ marginBottom: "30px" }}>
                  Tutor Account Sign Up
                </h2>
              </Col>
              <Col xs={24} style={{ textAlign: "center" }}>
                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Row gutter={[16, 24]} justify="center">
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                      <Form.Item
                        label="รูปประจำตัว"
                        name="profilePicture"
                        valuePropName="fileList"
                      >
                        <ImgCrop rotationSlider>
                          <Upload
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            beforeUpload={(file) => {
                              setFileList([...fileList, file]);
                              return false;
                            }}
                            maxCount={1}
                            multiple={false}
                            listType="picture-card"
                          >
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>
                                คลิกเพื่ออัพโหลด
                              </div>
                            </div>
                          </Upload>
                        </ImgCrop>
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        label="การศึกษา"
                        name="education"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกการศึกษา !",
                          },
                        ]}
                      >
                        <Input.TextArea rows={2} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        label="ประวัติย่อ"
                        name="resume"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกประวัติย่อ !",
                          },
                        ]}
                      >
                        <Input.TextArea rows={2} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        label="ประสบการณ์"
                        name="experience"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกประสบการณ์ !",
                          },
                        ]}
                      >
                        <Input.TextArea rows={2} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} style={{ marginTop: "30px" }}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          style={{ marginBottom: 20 }}
                        >
                          ยืนยัน
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SignUpTutor2Pages;
