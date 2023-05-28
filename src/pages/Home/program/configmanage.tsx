import { restartServiceApi, startServiceApi, stopServiceApi, uninstallServiceApi, updateConfigApi } from '@/api/program';
import JsonEditor from '@/components/JsonEditor';
import { programStore } from '@/stores/mobx';
import { Button, Collapse, message, Popconfirm, Spin, Tag } from 'antd';
import react, { FC, useState } from 'react';
import { statusColor } from './constan';
const { Panel } = Collapse;
const ConfigManage: FC = (props: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const saveConfig = async () => {
        setLoading(true);
        try {
            const curVersion = programStore.selectProgramInfo.versions.find(v => v.isCurrent);
            await updateConfigApi({
                name: programStore.selectProgramInfo.name,
                version: curVersion ? curVersion.versionName : '',
                config: programStore.selectProgramInfo.config,
            });
            messageApi.success('更新成功');
        } catch (error) {
            messageApi.error(String(error));
        }
        setLoading(false);
    };

    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <div className="new-deployer-nav">
                    <span>操作: </span>
                    <Button type="primary" style={{ marginLeft: 15 }} onClick={saveConfig}>
                        保存配置
                    </Button>
                </div>
                <Collapse style={{ marginTop: 15 }} onChange={onChange}>
                    {Array.isArray(programStore?.selectProgramInfo?.config) &&
                        programStore.selectProgramInfo?.config?.map((conf, idx) => (
                            <Panel header={conf.configPath} key={idx}>
                                <JsonEditor mode={conf.configPath.slice(conf.configPath.lastIndexOf('.'))} idx={idx}></JsonEditor>
                            </Panel>
                        ))}
                </Collapse>
            </Spin>
        </>
    );
};

export default ConfigManage as any;
