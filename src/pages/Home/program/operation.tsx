import { programStore } from '@/stores/mobx';
import { Button, Form, Popconfirm, Table, Tabs } from 'antd';
import react, { FC, useState } from 'react';
import { ProgramVersion, programVersionColumns, tabItems } from './constan';
import { QuestionCircleOutlined } from '@ant-design/icons';
import NewDeployer from './newdeployer';
import StatusManage from './statusmanage';
import ConfigManage from './configmanage';

const ProgramOperation: FC = (props: any) => {
    const versionBack = () => {
        console.log('版本回退');
    };

    const programVersionCols = programVersionColumns.map(col => {
        if (col.title == '操作') {
            return {
                ...col,
                render: (row: ProgramVersion) => (
                    <>
                        {row.isCurrent ? (
                            <Popconfirm
                                title="回退版本提醒"
                                description="确认是要回退版本?"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} rev={undefined} />}
                                onConfirm={versionBack}
                                okText="确认"
                                cancelText="再想想"
                            >
                                <Button type="link">版本回退</Button>
                            </Popconfirm>
                        ) : (
                            ''
                        )}
                    </>
                ),
            };
        }
        return col;
    });

    const VersionMangement = () => (
        <>
            <div className="program-versions">
                <Table columns={programVersionCols} rowKey={record => record.name} dataSource={programStore.selectProgramInfo?.versions.map((v: any, index) => ({ ...v, key: index }))} />
            </div>
            ;
        </>
    );

    const programOperationItem = tabItems.map(tab => {
        if (tab.label == '新增发布') {
            return {
                ...tab,
                children: <NewDeployer></NewDeployer>,
            };
        }
        if (tab.label == '版本管理') {
            return {
                ...tab,
                children: <VersionMangement></VersionMangement>,
            };
        }
        if (tab.label == '状态管理') {
            return {
                ...tab,
                children: <StatusManage></StatusManage>,
            };
        }
        if (tab.label == '配置管理') {
            return {
                ...tab,
                children: <ConfigManage></ConfigManage>,
            };
        }
        return tab;
    });

    return (
        <>
            <Tabs tabPosition="left" items={programOperationItem as any} />
        </>
    );
};

export default ProgramOperation;
