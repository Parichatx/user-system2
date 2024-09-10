import {
  Button,
  Card,
  Form,
  Input,
  message,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Select,
} from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { CreateUser } from "../../../services/https";

import { UsersInterface } from "../../../interfaces/IUser";

import logo1 from "../../../assets/logo1.png";

function SignUpStudentPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

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
      <Col xs={24} sm={4} md={4} lg={4} xl={4} style={{ backgroundColor: "#333D51", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", position: "relative" }}>
        <img
          alt="logo"
          style={{ width: "50%" , marginTop: "-200%"}}
          src={logo1}
          className="images-logo"
        />
      </Col>

        <Col xs={24} sm={20} md={20} lg={20} xl={20} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", paddingRight: "50px", }} >
          <Card className="card-login" style={{ width: 1100 , height: "100%" ,border: "none",}}>
          <Button  type="link"  onClick={() => navigate(-1)}  style={{ position: "absolute", top: "10px", left: "10px", fontSize: "16px" }}>
              <ArrowLeftOutlined /> ย้อนกลับ
          </Button>
            <Row align={"middle"} justify={"center"}>
              <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                <h2 className="header" style={{marginBottom: "50px" }} >Student Account Sign Up</h2>

                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Row gutter={[16, 0]} align={"middle"}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="ชื่อ"
                        name="first_name"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกชื่อ !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="นามสกุล"
                        name="last_name"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกนามสกุล !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="อีเมล"
                        name="email"
                        rules={[
                          {
                            type: "email",
                            message: "รูปแบบอีเมลไม่ถูกต้อง !",
                          },
                          {
                            required: true,
                            message: "กรุณากรอกอีเมล !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="วัน/เดือน/ปี เกิด"
                        name="birthday"
                        rules={[
                          {
                            required: true,
                            message: "กรุณาเลือกวัน/เดือน/ปี เกิด !",
                          },
                        ]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกรหัสผ่าน !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกรหัสผ่าน !",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item
                        label="Confirm Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "กรุณากรอกรหัสผ่าน !",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>

                    

            

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginBottom: 20 }} >
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

export default SignUpStudentPages;
