import { Button, Checkbox, Form, Input, message, Spin, Upload, UploadProps } from 'antd';
import react, { useState, FC } from 'react';
import './index.less';
import { UploadOutlined } from '@ant-design/icons';
import { updateProgramVersionApi } from '@/api/program';
import { programStore } from '@/stores/mobx';
// 新增发布
const NewDeployer: FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await updateProgramVersionApi({
                ...values,
                name: programStore.selectProgramInfo.name,
            });
            form.resetFields();
            messageApi.success('发布成功!');
        } catch (error) {
            messageApi.error(String(error));
        }
        form.resetFields();
        setLoading(false);
    };

    const onFinishFailed = (errorInfo: any) => {};

    const uploadProps: UploadProps = {
        name: 'file',
        action: `/api/program/upload`,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 上传成功!`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name}  上传失败!`);
            }
        },
    };

    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <div className="new-deployer-form">
                    <Form
                        form={form}
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
                            <Upload {...uploadProps}>
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
            </Spin>
        </>
    );
};
export default NewDeployer;
