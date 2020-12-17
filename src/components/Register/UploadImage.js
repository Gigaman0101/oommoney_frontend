import React from 'react';
import { Form, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from 'antd/lib/upload/Dragger';

const layout = {
    labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 5, xxl: 5 },
    wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 19, xxl: 19 },
};

function UploadImage(props) {

    const onFinish = values => {

    };

    const propsUpload = {
        name: 'image',
        multiple: false,
        action: `https://www.mocky.io/v2/5cc8019d300000980a055e76`,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                props.setFileName(info.file);
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Form
            style={{ width: "100%", padding: "20px" }}
            {...layout}
            name="address"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item>
                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                                </p>
                </Dragger>
            </Form.Item>
        </Form>
    )
}

export default UploadImage
