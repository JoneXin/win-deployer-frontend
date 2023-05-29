import { programStore } from '@/stores/mobx';
import { Button, DatePicker, Select } from 'antd';
import react, { useEffect, useState, FC } from 'react';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { RangePicker } = DatePicker;

const LogManage: FC = () => {
    const [logType, setLogType] = useState('info');

    const handleSearchLogs = () => {};

    return (
        <>
            {/* <div className="new-deployer-nav">
                <span>info日志地址:</span>
                <span style={{ marginLeft: 10 }}>{`${programStore.selectProgramInfo.deployPath}/${programStore.selectProgramInfo.name}/daemon/${programStore.selectProgramInfo.name}.out.log`}</span>
            </div>
            <div className="new-deployer-nav">
                <span>error日志地址:</span>
                <span style={{ marginLeft: 10 }}>{`${programStore.selectProgramInfo.deployPath}/${programStore.selectProgramInfo.name}/daemon/${programStore.selectProgramInfo.name}.err.log`}</span>
            </div> */}
            <div className="new-deployer-nav">
                <span style={{ marginRight: 10 }}>日志筛选:</span>
                <RangePicker showTime locale={locale} />
                <span style={{ margin: '0 10px' }}>日志类型:</span>
                <Select
                    defaultValue="info"
                    style={{ width: 120 }}
                    onChange={val => setLogType(val)}
                    options={[
                        { value: 'info', label: 'info' },
                        { value: 'err', label: 'err' },
                        { value: 'wrapper', label: 'wrapper' },
                    ]}
                />
                <Button style={{ marginLeft: 10 }} onClick={handleSearchLogs} type="primary">
                    查询
                </Button>
            </div>
        </>
    );
};

export default LogManage;
