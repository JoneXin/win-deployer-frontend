import { programStore } from '@/stores/mobx';
import { Button, DatePicker, Input, List, Pagination, Select, Spin, message } from 'antd';
import react, { useEffect, useState, FC } from 'react';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { RangeValue } from 'rc-picker/lib/interface';
import dayjs from 'dayjs';
import { getProgramLogsApi } from '@/api/program';
import './index.less';

const { RangePicker } = DatePicker;

const LogManage: FC = () => {
    const [logType, setLogType] = useState('out');
    const [timeRange, selectTimeRange] = useState<RangeValue<dayjs.Dayjs>>([dayjs(), dayjs()]);
    const [logsContentList, setLogsContentList] = useState([]);
    const [logsPageNumCount, setLogsPageNumCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleSearchKeyWords = (val: any) => {};

    const changePageInfo = (pageNum: number, pageSize: number) => {
        handleSearchLogs(pageNum, pageSize);
    };

    const handleSearchLogs = async (pageNumber: number = 1, pageSize: number = 20) => {
        if (timeRange?.length) {
            setLoading(true);
            try {
                const logs = await getProgramLogsApi({
                    logsPath: getlogsPath(logType),
                    startTime: timeRange[0]?.format('YYYY-MM-DD HH:mm:ss') as string,
                    endTime: timeRange[1]?.format('YYYY-MM-DD HH:mm:ss') as string,
                    pageSize,
                    pageNumber,
                });
                setLogsContentList(logs.logsContentList);
                setLogsPageNumCount(logs.count);
            } catch (error) {
                messageApi.error(String(error));
            }
            setLoading(false);
        }
    };

    const getlogsPath = (logType: string): string => {
        const transformdScript = programStore.selectProgramInfo.script.replaceAll('\\', '/');
        return `${transformdScript.slice(0, transformdScript.lastIndexOf('/'))}/daemon/${programStore.selectProgramInfo.name}.${logType}.log`;
    };

    return (
        <>
            {contextHolder}
            <div className="new-deployer-nav">
                <span style={{ marginRight: 10 }}>日志筛选:</span>
                <RangePicker showTime locale={locale} onChange={v => selectTimeRange(v)} />
                <span style={{ margin: '0 10px' }}>日志类型:</span>
                <Select
                    defaultValue="out"
                    style={{ width: 120 }}
                    onChange={val => setLogType(val)}
                    options={[
                        { value: 'out', label: 'out' },
                        { value: 'err', label: 'err' },
                        { value: 'wrapper', label: 'wrapper' },
                    ]}
                />
                <Button style={{ marginLeft: 10 }} onClick={() => handleSearchLogs()} type="primary">
                    查询
                </Button>
            </div>
            <div className="new-deployer-nav" style={{ height: 30 }}>
                <span>日志地址:</span>
                <span style={{ marginLeft: 10, color: 'red' }}>{getlogsPath(logType)}</span>
            </div>

            {/* <div className="logs-search">
                <span>筛选</span>
                <Input onInput={handleSearchKeyWords}></Input>
            </div> */}
            <Spin spinning={loading}>
                <div className="logs" style={{ margin: ' 10px 0px' }}>
                    <List size="small" bordered dataSource={logsContentList} renderItem={item => <List.Item>{item}</List.Item>} />
                </div>
                <div className="footer-logs">
                    <Pagination showQuickJumper showSizeChanger defaultCurrent={1} total={logsPageNumCount} onChange={changePageInfo} />
                </div>
            </Spin>
        </>
    );
};

export default LogManage;
