import React, { useEffect } from 'react';
import { Card, Col, Form, Row, message, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderComponent from '../../components/headertutor/index';
import studentpic from '../../assets/tutorpic.png';
import { EditOutlined } from '@ant-design/icons';
import { GetUsersById } from "../../services/https/index";
import dayjs from 'dayjs';

function TutorProfile() {
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
            experience: res.data.experience,
            education: res.data.education,
            biography: res.data.biography,
          });
        } else {
          messageApi.open({
            type: "error",
            content: "ไม่พบข้อมูลผู้ใช้",
          });
          setTimeout(() => {
            navigate("/tutorprofile");
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
              padding: '40px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Row align="middle" gutter={16}>
  <Col xs={24} sm={12} style={{ textAlign: 'center' }}>
    <img
      src={studentpic}
      alt="Profile"
      className="pic2"
      style={{
        width: '100%',
        height: 'auto',
        maxWidth: '300px', 

      }}
    />
  </Col>
  <Col xs={24} sm={12} style={{ textAlign: 'center', alignSelf: 'center' }}>
    <h1>Username</h1>
  </Col>
</Row>
            <Col xs={24} style={{ textAlign: 'center' }}>
              <h1>{form.getFieldValue('first_name')} {form.getFieldValue('last_name')}</h1>
              <h3 style={{ color: 'gray' }}>{form.getFieldValue('email')}</h3>
              <p><strong>การศึกษา:</strong> {form.getFieldValue('education')}</p>
              <p><strong>ประสบการณ์:</strong> {form.getFieldValue('experience')}</p>
              <div style={{ marginTop: '20px' }}>
                <strong>ประวัติย่อ:</strong>
                <p>{form.getFieldValue('biography')}</p>
              </div>
              <Button 
                style={{ marginTop: '20px' }}
                onClick={() => navigate('/edittutor')}
              >
                <EditOutlined /> แก้ไขข้อมูลโปรไฟล์
              </Button>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default TutorProfile;
