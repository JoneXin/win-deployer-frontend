import { Button, Checkbox, Form, Input, message, Select, Space, Upload, UploadProps } from 'antd';
import react, { useState, FC } from 'react';
import './index.less';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

// 新增发布
const NewProgram: FC = () => {
    const [form] = Form.useForm();

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
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ width: 600 }}
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

                <Form.Item label="发布路径" name="deployPath" rules={[{ required: true, message: '请输入发布路径' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="入口文件路径" name="deployPath" rules={[{ required: true, message: '请输入入口文件路径' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="备注信息" name="desc" rules={[{ required: false }]}>
                    <Input.TextArea />
                </Form.Item>

                <Form.List name="config">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Space key={field.key} align="baseline">
                                    <Form.Item {...field} style={{ margin: '5px 40px' }} label="配置文件路径" name={field.name} rules={[{ required: true, message: '请输入配置文件路径' }]}>
                                        <Input style={{ marginLeft: '15px' }} />
                                    </Form.Item>
                                    <Form.Item {...field} style={{ margin: '5px 0px' }} label="配置文件内容:" name={field.name} rules={[{ required: true, message: '请输入配置文件内容' }]}>
                                        <Input.TextArea style={{ marginLeft: '15px' }} />
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(field.name)} rev={undefined} />
                                </Space>
                            ))}

                            <Form.Item>
                                <Button style={{ marginLeft: '125px' }} type="dashed" onClick={() => add()} block icon={<PlusOutlined rev={undefined} />}>
                                    增加配置文件
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                    <Button type="primary" htmlType="submit">
                        发布
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default NewProgram;
