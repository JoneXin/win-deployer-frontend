import { ColumnsType } from 'antd/es/table';
import { Tabs, Tag } from 'antd';

export type ProgramVersion = {
    versionName: string;
    deployTime: string;
    isCurrent: boolean;
};

export type ProgramConfigType = {
    configContent: string;
    configPath: string;
};
export interface ProgramDataType {
    key: React.Key;
    name: string;
    status: string;
    maxRetries: string;
    maxRestarts: string;
    description: string;
    script: string;
    grow: number;
    wait: number;
    deployPath: string;
    versions: Array<ProgramVersion>;
    config: Array<ProgramConfigType>;
}

export const statusColor = {
    运行中: 'success',
    停止: 'error',
    未安装: 'warning',
} as any;

export const programColumns: ColumnsType<ProgramDataType> = [
    {
        title: '应用名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '应用状态',
        dataIndex: 'status',
        key: 'status',

        render: status => (
            <>
                <Tag color={statusColor[status] as any}>{status}</Tag>
            </>
        ),
    },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
        title: '操作',
        key: 'operation',

        width: 100,
        render: () => <a>操作</a>,
    },
];

export const programVersionColumns: ColumnsType<ProgramVersion> = [
    {
        title: '版本名称',
        dataIndex: 'versionName',
        key: 'versionName',
    },
    {
        title: '发布时间',
        dataIndex: 'deployTime',
        key: 'deployTime',
    },

    {
        title: '版本状态',
        dataIndex: 'isCurrent',
        key: 'isCurrent',
        render: isCurrent => <Tag color={isCurrent ? 'green' : 'grey'}>{isCurrent ? '最新版本' : '老版本'}</Tag>,
    },

    {
        title: '操作',
        key: 'operation',
        width: 100,
        // render: row => <a>{row.isCurrent ? '版本回退' : ''}</a>,
    },
];

export const tabItems = [
    {
        label: '新增发布',
        key: 0,
        children: `Content of Tab  `,
    },
    {
        label: '状态管理',
        key: 1,
        children: `Content of Tab  `,
    },
    {
        label: '配置管理',
        key: 2,
        children: `Content of Tab  `,
    },
    {
        label: '日志管理',
        key: 3,
        children: `Content of Tab  `,
    },
    {
        label: '版本管理',
        key: 4,
        children: `Content of Tab  `,
    },
];
