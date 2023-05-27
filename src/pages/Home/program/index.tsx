import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { Button, Input, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProgramDataType, programColumns, tabItems } from './constan';
import { getProgramListApi } from '@/api/program';
import { programStore } from '@/stores/mobx';
import './index.less';
import RenModal from '@/components/RenModal';
import ProgramOperation from './operation';
import NewProgram from './newprogram';

const Program: FC = () => {
    const [selectId, setSelectId] = useState(0);

    const programDetailModalRef = useRef(null);
    const newProgramModalRef = useRef(null);

    // row select
    const handleSelectRow = (record: ProgramDataType, idx: number | undefined) => {
        programStore.setProgramInfo(record);
        setSelectId(idx || 0);
    };

    const showProgramDetailModal = () => {
        (programDetailModalRef?.current as any).showModal();
    };

    const showNewProgramModal = () => {
        (newProgramModalRef?.current as any).showModal();
    };

    const programColum = programColumns.map(col => {
        if (col.key == 'operation') {
            return {
                ...col,
                render: () => (
                    <Button type="primary" onClick={() => showProgramDetailModal()}>
                        操作
                    </Button>
                ),
            };
        }
        return col;
    });

    return (
        <div>
            <div className="search-bar">
                <Input placeholder="搜索应用" />
                <Button type="primary" onClick={() => showNewProgramModal()}>
                    新增应用
                </Button>
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
                    columns={programColum}
                    rowKey={record => record.name}
                    dataSource={programStore.programList.map((v: any, index) => ({ ...v, key: index }))}
                />
            </div>
            <RenModal ref={programDetailModalRef} title="程序详情" handleOk={() => {}}>
                <ProgramOperation></ProgramOperation>
            </RenModal>
            <RenModal ref={newProgramModalRef} title="新增程序" handleOk={() => {}}>
                <NewProgram></NewProgram>
            </RenModal>
        </div>
    );
};
export default observer(Program);
