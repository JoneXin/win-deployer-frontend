import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

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
}

const statusColor = {
    运行中: 'success',
    停止: 'error',
    未安装: 'warning',
} as any;

export const columns: ColumnsType<ProgramDataType> = [
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
