import { restartServiceApi, startServiceApi, stopServiceApi, uninstallServiceApi } from '@/api/program';
import { programStore } from '@/stores/mobx';
import { Button, message, Popconfirm, Spin, Tag } from 'antd';
import react, { FC, useState } from 'react';
import { statusColor } from './constan';

const StatusManage: FC = (props: any) => {
    const [loading, setLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const startService = async () => {
        setLoading(true);
        try {
            await startServiceApi(programStore.selectProgramInfo.name);
            await programStore.getProgramList();
            messageApi.success('启动成功!');
        } catch (error) {
            messageApi.error(String(error));
        }
        setLoading(false);
    };

    const stopService = async () => {
        setLoading(true);
        try {
            await stopServiceApi(programStore.selectProgramInfo.name);
            await programStore.getProgramList();
            messageApi.success('停止成功!');
        } catch (error) {
            messageApi.error(String(error));
        }
        setLoading(false);
    };

    const restartService = async () => {
        setLoading(true);
        try {
            await restartServiceApi(programStore.selectProgramInfo.name);
            await programStore.getProgramList();
            messageApi.success('重启成功!');
        } catch (error) {
            messageApi.error(String(error));
        }
        setLoading(false);
    };

    const unistallService = async () => {
        setLoading(true);
        try {
            await uninstallServiceApi(programStore.selectProgramInfo.name);
            await programStore.getProgramList();
            messageApi.success('卸载成功!');
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
                    <span>当前状态: </span>
                    <span style={{ marginLeft: 20 }}>
                        <Tag color={(statusColor[programStore.selectProgramInfo?.status] as any) || 'warning'}>{programStore.selectProgramInfo.status ?? '~'}</Tag>
                    </span>
                </div>
                <div className="status-operate">
                    <p>程序状态管理:</p>
                    <div className="operator">
                        <Button type="primary" style={{ backgroundColor: 'green' }} onClick={() => startService()}>
                            启动
                        </Button>
                        <Button type="primary" style={{ backgroundColor: 'grey' }} onClick={() => stopService()}>
                            关闭
                        </Button>
                        <Button type="primary" onClick={() => restartService()}>
                            重启
                        </Button>
                        <Popconfirm title={'确定卸载此程序'} description="卸载后整个应用将被移除!!!" onConfirm={unistallService} okText="确认" cancelText="再想想">
                            <Button danger>卸载</Button>
                        </Popconfirm>
                    </div>
                </div>
            </Spin>
        </>
    );
};

export default StatusManage as any;
