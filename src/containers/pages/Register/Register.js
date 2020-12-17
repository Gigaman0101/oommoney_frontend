import React, { useState } from 'react';
import { Row, Col, Button, notification, Steps } from "antd";
import axios from "../../../config/axios";
import { withRouter } from "react-router-dom";
import RegisterForm from '../../../components/Register/RegisterForm';
import AddressForm from '../../../components/Register/AddressForm';
import UploadImage from '../../../components/Register/UploadImage';

const { Step } = Steps;

function Register(props) {

    //State
    const [current, setCurrent] = useState(0);
    const [fileName, setFileName] = useState("");
    const [addressValue, setAddressValue] = useState(null);
    const [formValue, setFormValue] = useState(null);

    // function กด step
    const nextStep = current => {
        console.log('nextStep:', current);
        setCurrent(prev => prev + 1);
    };

    const prevStep = current => {
        console.log('prevStep:', current);
        setCurrent(prev => prev + 1);
    }

    const onChange = current => {
        console.log('onChange:', current);
        setCurrent(current);
    }

    // กำหนด step
    const steps = [
        {
            title: 'Register',
            content: <RegisterForm next={nextStep} current={current} formValue={formValue} setFormValue={setFormValue} />
        },
        {
            title: 'Address',
            content: <AddressForm next={nextStep} current={current} addressValue={addressValue} setAddressValue={setAddressValue} />
        },
        {
            title: 'Upload image',
            content: <UploadImage current={current} fileName={fileName} setFileName={setFileName} />
        }
    ];


    const onSubmit = () => {
        console.log(fileName.originFileObj)
        const formData = new FormData();
        formData.append('password', formValue.password);
        formData.append('firstName', formValue.firstName);
        formData.append('lastName', formValue.lastName);
        formData.append('email', formValue.email);
        formData.append('education_level', formValue.education_level);
        formData.append('status', formValue.status);
        formData.append('phone_number', formValue.phone_number);
        formData.append('id_card', formValue.id_card);
        formData.append('career', formValue.career);
        formData.append('price_range', formValue.price_range);
        formData.append('house_no', addressValue.house_no);
        formData.append('moo', addressValue.moo);
        formData.append('floor', addressValue.floor);
        formData.append('village', addressValue.village);
        formData.append('soi', addressValue.soi);
        formData.append('province', addressValue.province);
        formData.append('road', addressValue.road);
        formData.append('district', addressValue.district);
        formData.append('sub_district', addressValue.sub_district);
        formData.append('username', formValue.username);
        formData.append('postal_code', addressValue.postal_code);
        formData.append('image', fileName.originFileObj);

        // ยิง axios
        axios.post("/users/register",
            formData
        )
            .then(res => {
                notification.success({
                    description: "Signup successfully"
                });
                props.history.push("/");
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Something went wrong."
                });
            });
    };



    return (
        <Row
            justify="center"
            style={{ height: "80vh", margin: " 50px 0" }}
        >

            <Col span={18}>
                <Steps current={current} onChange={onChange}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>

                <Row justify="center" style={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zindex: 1, backgroundColor: 'transparent' }} >
                    <div className="right-content">
                        {steps[current].content}
                    </div>
                </Row>

                <div className="steps-action">
                    {/* {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={prevStep}>
                            Previous
                        </Button>
                    )} */}
                    {/* {current < steps.length - 1 && (
                        <Button type="primary" onClick={nextStep}>
                            Next
                        </Button>
                    )} */}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={onSubmit}>
                            Done
                        </Button>
                    )}
                </div>
            </Col>
        </Row>

    );
}

export default withRouter(Register);