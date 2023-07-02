import { Button, Checkbox, Form, Input, message, Select, Space, Spin, Upload, UploadProps } from 'antd';
import react, { useState, FC, useRef, useImperativeHandle, forwardRef } from 'react';
import './index.less';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import JsonEditorModal from '@/components/JsonEditorModal';
import RenModal from '@/components/RenModal';
import { addProgramListApi } from '@/api/program';
import { programStore } from '@/stores/mobx';

// 新增发布
const AddConfig: FC = (props: any, ref) => {
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
            await programStore.getProgramList();
            messageApi.success('新增成功');
            modalRef.current.hideModal();
        } catch (error) {
            messageApi.error(String(error) as string, 5);
        }
        setLoading(false);
    };

    return (
        <RenModal
            maskClosable={false}
            ref={modalRef}
            handleOk={addProgram}
            title="新增配置"
            handleCancel={() => form.resetFields()}
        >
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
                    <Form.List name="config">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key + field.name} align="baseline">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'configPath']}
                                            style={{ width: '300px' }}
                                            label="文件路径"
                                            rules={[{ required: true, message: '请输入配置文件路径' }]}
                                        >
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
                                    <Button
                                        style={{ marginLeft: '155px' }}
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined rev={undefined} />}
                                    >
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
export default forwardRef(AddConfig as any) as any;
