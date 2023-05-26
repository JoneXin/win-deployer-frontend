import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { Button, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProgramDataType, columns } from './constan';
import { getProgramListApi } from '@/api/program';
import { programStore } from '@/stores/mobx';
import './index.less';

const Program: FC = () => {
    const [selectId, setSelectId] = useState(0);

    // row select
    const handleSelectRow = (record: ProgramDataType, idx: number | undefined) => {
        programStore.setProgramInfo(record);
        setSelectId(idx || 0);
    };

    return (
        <div>
            <div className="search-bar">
                <Input placeholder="搜索应用" />
                <Button type="primary">新增应用</Button>
            </div>
            <div className="program-table">
                <Table
                    onRow={(record, idx) => {
                        return {
                            onClick: e => {
                                handleSelectRow(record, idx);
                            },
                        };
                    }}
                    rowClassName={(_, index) => (index === selectId ? 'activeRowStyle' : '')}
                    columns={columns}
                    rowKey={record => record.name}
                    dataSource={programStore.programList.map((v: any, index) => ({ ...v, key: index }))}
                />
            </div>
        </div>
    );
};
export default observer(Program);
