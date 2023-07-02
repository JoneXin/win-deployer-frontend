import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Divider, Row, Segmented, Tabs, message, Checkbox } from 'antd';
import type { TabsProps } from 'antd';
import './index.less';
import { programStore } from '@/stores/mobx';
import MonitorCharts from './monitor';
import { DateRangePicker } from 'element-react';
import 'element-theme-default';
import { daysBefor, hoursBefor } from '@/utils/tool/tool';

const DashBoard: FC = () => {
    const [monitorType, setMonitorType] = useState<'cpu' | 'memory'>('cpu');
    const [timeRage, setTimeRange] = useState<[Date, Date]>([daysBefor(1), daysBefor(0)]);
    const [messageApi, contextHolder] = message.useMessage();
    const [realTimeMonitor, setRealTimeMonitor] = useState(true);
    const [timmer, setTimmer] = useState<NodeJS.Timer>();

    useEffect(() => {
        // init monitor data
        getMonitorData();
    }, []);

    // 实时数据
    useEffect(() => {
        if (realTimeMonitor) {
            const timmer = setInterval(() => {
                getMonitorData(hoursBefor(1).getTime(), Date.now());
            }, 1000 * 30);
            setTimmer(timmer);
        } else {
            clearInterval(timmer);
        }
    }, [realTimeMonitor]);

    const getMonitorData = (start?: number, end?: number) => {
        const startTime = start || timeRage[0].getTime();
        const endTime = end || timeRage[1].getTime();
        if (!timeRage || !timeRage.length) return messageApi.warning('请选择时间!');
        // init monitor data
        programStore.getMonitorData({
            startTime,
            endTime,
            programName: programStore.selectProgramInfo.name,
        });
    };

    return (
        <div>
            {contextHolder}
            <div className="desc">
                <p className="title">程序启动配置信息:</p>
                <Row align="middle" justify="center" style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <span className="programKey">程序名称:</span>
                        <span className="programValue">{programStore.selectProgramInfo.name ?? ''}</span>
                    </Col>
                    <Col span={4}>
                        <span className="programKey">最大重启次数:</span>
                        <span className="programValue">{programStore.selectProgramInfo.maxRestarts ?? '~'}</span>
                    </Col>
                    <Col span={4}>
                        <span className="programKey">最大重试次数:</span>
                        <span className="programValue">{programStore.selectProgramInfo.maxRetries ?? ''}</span>
                    </Col>
                    <Col span={5}>
                        <span className="programKey">重启时间延迟:</span>
                        <span className="programValue">{programStore.selectProgramInfo.wait + '秒' ?? '~'}</span>
                    </Col>
                    <Col span={5}>
                        <span className="programKey">重启时间增量:</span>
                        <span className="programValue">{programStore.selectProgramInfo.grow + '秒' ?? '~'}</span>
                    </Col>
                </Row>

                <Row align="middle" justify="center" style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <span className="programKey">发布路径:</span>
                        <span className="programValue">{programStore.selectProgramInfo.deployPath ?? '~'}</span>
                    </Col>
                    <Col span={12}>
                        <span className="programKey">入口文件路径:</span>
                        <span className="programValue">{programStore.selectProgramInfo.script ?? '~'}</span>
                    </Col>
                </Row>
            </div>
            {/* <Divider /> */}
            <div className="map-type">
                <Segmented
                    onChange={(mode: any) => setMonitorType(mode)}
                    style={{ margin: '0px 5px' }}
                    options={[
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <div>CPU 使用率</div>
                                </div>
                            ),
                            value: 'cpu',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <div>内存使用率</div>
                                </div>
                            ),
                            value: 'memory',
                        },
                    ]}
                />
                <div>
                    <DateRangePicker
                        value={timeRage}
                        placeholder="选择日期范围"
                        isShowTime={true}
                        onChange={date => {
                            console.debug('DateRangePicker1 changed: ', date);
                            setTimeRange(date);
                        }}
                    />
                </div>
                <div>
                    <Button onClick={() => getMonitorData()} type="primary">
                        查询
                    </Button>
                </div>
                <div>
                    <Checkbox onChange={e => setRealTimeMonitor(e.target.checked)} checked={realTimeMonitor}>
                        实时监控数据
                    </Checkbox>
                </div>
            </div>
            <div className="map">
                <div className="charts">
                    <MonitorCharts monitorType={monitorType}></MonitorCharts>
                </div>
            </div>
        </div>
    );
};
export default observer(DashBoard);
