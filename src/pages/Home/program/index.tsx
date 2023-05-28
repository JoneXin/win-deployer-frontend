import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { Button, Input, message, Spin, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProgramDataType, programColumns, tabItems } from './constan';
import { addProgramListApi, getProgramListApi } from '@/api/program';
import { programStore } from '@/stores/mobx';
import './index.less';
import RenModal from '@/components/RenModal';
import ProgramOperation from './operation';
import NewProgram from './newprogram';

const Program: FC = () => {
    const [selectId, setSelectId] = useState(0);

    const [messageApi, contextHolder] = message.useMessage();

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

    const hideProgramDetailModal = () => {
        (programDetailModalRef?.current as any).hideModal();
    };

    const showNewProgramModal = () => {
        (newProgramModalRef?.current as any).showModal();
    };

    const hideProgramModal = () => {
        (newProgramModalRef?.current as any).hideModal();
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
            {contextHolder}

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
            <RenModal ref={programDetailModalRef} title="程序详情" footer={[<Button onClick={hideProgramDetailModal}>关闭</Button>]}>
                <ProgramOperation></ProgramOperation>
            </RenModal>

            <NewProgram ref={newProgramModalRef} title="新增程序"></NewProgram>
        </div>
    );
};
export default observer(Program);
