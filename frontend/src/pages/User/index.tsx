import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, message, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderComponent from '../../components/header/index';
import studentpic from '../../assets/studentpic.png';
import { LockOutlined, EditOutlined } from '@ant-design/icons';
import { GetUsersById } from "../../services/https/index";
import dayjs from 'dayjs';

function ProfileUser() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams(); // Assuming you have a route parameter for the user ID

  const [form] = Form.useForm();

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const getUserById = async (id: string) => {
      try {
        const res = await GetUsersById(id);

        if (res.status === 200) {
          form.setFieldsValue({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
            birthday: dayjs(res.data.birthday),
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
      } catch (error) {
        console.error('Error fetching user data:', error);
        messageApi.error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
      }
    };

    if (id) {
      getUserById(id);
    }
  }, [id, messageApi, navigate, form]);

  return (
    <>
      <HeaderComponent />
      {contextHolder}
      <Row style={{ height: '100vh', backgroundColor: '#FFFFFF', margin: 0 }}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <Card
            className="card-profile"
            style={{
              width: '100%',
              maxWidth: 1400,
              height: '80%',
              border: 'none',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Row gutter={[16, 24]} justify="center">
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <img
                  src={studentpic}
                  alt="Profile"
                  className="pic2"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '100%',
                    marginBottom: '20px',
                  }}
                />
              </Col>
            </Row>
            <div>
              <h1 style={{ textAlign: 'center' }}>{form.getFieldValue('first_name')} {form.getFieldValue('last_name')}</h1>
              <h3 style={{ textAlign: 'center', color: 'gray' }}>{form.getFieldValue('email')}</h3>
              <Col xs={24} style={{ textAlign: 'center' }}>
                <Form form={form} name="basic" layout="vertical" autoComplete="off"></Form>
              </Col>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 'large',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Button
                style={{ width: '60%', justifyContent: 'left', marginBottom: '20px' }}
                onClick={() => navigate('/edituser')}
              >
                <EditOutlined /> แก้ไขข้อมูลผู้ใช้
              </Button>
              <Button
                style={{ width: '60%', justifyContent: 'left' }}
                onClick={() => navigate('/changepassword')}
              >
                <LockOutlined /> เปลี่ยนรหัสผ่าน
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProfileUser;
