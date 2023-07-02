import {
    restartServiceApi,
    startServiceApi,
    stopServiceApi,
    uninstallServiceApi,
    updateConfigApi,
    updateRunningAppConfApi,
} from '@/api/program';
import JsonEditor from '@/components/JsonEditor';
import { programStore } from '@/stores/mobx';
import { Button, Collapse, message, Popconfirm, Spin, Tag } from 'antd';
import react, { FC, useState } from 'react';
import { statusColor } from '../constan';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const ConfigManage: FC = (props: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const addConfig = () => {};

    const saveConfig = async () => {
        try {
            const curVersion = programStore.selectProgramInfo.versions.find(v => v.isCurrent);
            await updateConfigApi({
                name: programStore.selectProgramInfo.name,
                version: curVersion ? curVersion.versionName : '',
                config: programStore.selectProgramInfo.config,
            });
            messageApi.success('保存成功');

            return true;
        } catch (error) {
            messageApi.error(String(error));
            return false;
        }
    };

    const saveAndUpdateRunningApp = async () => {
        setLoading(true);
        const status = await saveConfig();
        if (status) {
            try {
                await updateRunningAppConfApi({
                    name: programStore.selectProgramInfo.name,
                    deployPath: programStore.selectProgramInfo.deployPath,
                    config: programStore.selectProgramInfo.config,
                });
            } catch (error) {
                messageApi.error(String(error));
            }
        }
        setLoading(false);
    };

    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <div className="new-deployer-nav">
                    <span>操作: </span>
                    <Button type="primary" style={{ marginLeft: 15 }} onClick={addConfig}>
                        新增配置
                    </Button>
                    <Button type="primary" style={{ marginLeft: 15 }} onClick={saveConfig}>
                        保存配置
                    </Button>

                    <Popconfirm
                        title="保存并应用到正在运行的服务"
                        description="这样会重启正在运行的程序，是否确定这样做？"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} rev={undefined} />}
                        onConfirm={saveAndUpdateRunningApp}
                        okText="确认"
                        cancelText="再想想"
                    >
                        <Button type="primary" style={{ marginLeft: 15, backgroundColor: 'green' }}>
                            保存并应用到正在运行的服务
                        </Button>
                    </Popconfirm>
                </div>
                <Collapse style={{ marginTop: 15 }} onChange={onChange}>
                    {Array.isArray(programStore?.selectProgramInfo?.config) &&
                        programStore.selectProgramInfo?.config?.map((conf, idx) => (
                            <Panel header={conf.configPath} key={idx}>
                                <JsonEditor
                                    mode={conf.configPath.slice(conf.configPath.lastIndexOf('.'))}
                                    idx={idx}
                                ></JsonEditor>
                            </Panel>
                        ))}
                </Collapse>
            </Spin>
        </>
    );
};

export default ConfigManage as any;
