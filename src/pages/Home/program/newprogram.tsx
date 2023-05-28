import { Button, Checkbox, Form, Input, message, Select, Space, Spin, Upload, UploadProps } from 'antd';
import react, { useState, FC, useRef, useImperativeHandle, forwardRef } from 'react';
import './index.less';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import JsonEditorModal from '@/components/JsonEditorModal';
import RenModal from '@/components/RenModal';
import { addProgramListApi } from '@/api/program';
import { programStore } from '@/stores/mobx';

// 新增发布
const NewProgram: FC = (props: any, ref) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [configList, setConfigList] = useState([]);
    const [curConfIdx, setCurConfIdx] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();

    const jsonEditorModalRef = useRef<any>(null);
    const modalRef = useRef<any>(null);

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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

    const showJsonEditorModalRef = (idx: number) => {
        setCurConfIdx(idx);
        const { configContent } = form.getFieldValue('config')[idx] || [];
        (jsonEditorModalRef?.current as any).showModal(configContent || '');
    };

    const hideJsonEditorModalRef = () => {
        (jsonEditorModalRef?.current as any).hideModal();
    };

    const getEditorInfo = (jsonInfo: any) => {
        const configList = form.getFieldValue('config') || [];
        !configList[curConfIdx] && (configList[curConfIdx] = {});

        configList[curConfIdx].configContent = jsonInfo;
        form.setFieldValue('config', configList);
        hideJsonEditorModalRef();
    };

    useImperativeHandle(ref, () => ({
        getProgramInfo: () => form.getFieldsValue(),
        showModal: modalRef.current.showModal,
        hideModal: modalRef.current.hideModal,
    }));

    const addProgram = async () => {
        try {
            await form.validateFields();
        } catch (error) {}
        setLoading(true);
        try {
            await addProgramListApi(form.getFieldsValue());
            // test
            setTimeout(async () => {
                await programStore.getProgramList();
                messageApi.success('新增成功');
                modalRef.current.hideModal();
            }, 1000);
        } catch (error) {
            messageApi.error(String(error) as string, 5);
        }
        setLoading(false);
    };

    return (
        <RenModal maskClosable={false} ref={modalRef} handleOk={addProgram} title="新增应用" handleCancel={() => form.resetFields()}>
            {contextHolder}
            <Spin spinning={loading}>
                <Form
                    name="newProgramForm"
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ width: 600 }}
                    initialValues={{ remember: false }}
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

                    <Form.Item label="发布路径" name="deployPath" rules={[{ required: true, message: '请输入发布路径' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="入口文件路径" name="execPath" rules={[{ required: true, message: '请输入入口文件路径' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="最大重启次数" name="maxRestarts" initialValue={9999} rules={[{ required: true, message: '请输入最大重启次数' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="最大重试次数" name="maxRetries" initialValue={9999} rules={[{ required: true, message: '请输入最大重试次数' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="重启延迟" name="wait" initialValue={3} rules={[{ required: true, message: '请输入重启延迟' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="重启延迟增量" name="grow" initialValue={0} rules={[{ required: true, message: '请输入重启延迟增量' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="备注信息" name="desc" rules={[{ required: false }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.List name="config">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key + field.name} align="baseline">
                                        <Form.Item {...field} name={[field.name, 'configPath']} style={{ width: '300px' }} label="文件路径" rules={[{ required: true, message: '请输入配置文件路径' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'configContent']}
                                            style={{ width: '300px' }}
                                            label="文件内容:"
                                            rules={[{ required: true, message: '请输入配置文件内容' }]}
                                        >
                                            <Input onDoubleClick={() => showJsonEditorModalRef(field.key)} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} rev={undefined} />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button style={{ marginLeft: '155px' }} type="dashed" onClick={() => add()} block icon={<PlusOutlined rev={undefined} />}>
                                        增加配置文件
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>

                <JsonEditorModal ref={jsonEditorModalRef} handleOk={getEditorInfo} mode="json"></JsonEditorModal>
            </Spin>
        </RenModal>
    );
};
export default forwardRef(NewProgram as any) as any;
