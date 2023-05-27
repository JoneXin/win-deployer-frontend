import { Button, Checkbox, Form, Input, message, Upload, UploadProps } from 'antd';
import react, { useState, FC } from 'react';
import './index.less';
import { UploadOutlined } from '@ant-design/icons';
// 新增发布
const NewDeployer: FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const props: UploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <>
            {/* <div className="new-deployer-nav">
                <Button type="primary">新增发布</Button>
            </div> */}
            <div className="new-deployer-form">
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ width: 500 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        valuePropName="programPkg"
                        getValueFromEvent={(e: any) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e?.fileList;
                        }}
                        label="程序包"
                        name="programPkg"
                        rules={[{ required: true, message: '请上传程序包' }]}
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined rev={undefined} />}>程序包上传</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="版本名" name="versionName" rules={[{ required: true, message: '请输入版本名' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="备注信息" name="desc" rules={[{ required: false }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Button type="primary" htmlType="submit">
                            发布
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default NewDeployer;
