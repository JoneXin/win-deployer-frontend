import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { Col, Divider, Row, Segmented, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './index.less';
import { programStore } from '@/stores/mobx';
import MonitorCharts from './monitor';

const DashBoard: FC = () => {
    const [monitorType, setMonitorType] = useState<'cpu' | 'memory'>('cpu');

    return (
        <div>
            <div className="desc">
                <Row style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <span className="programKey">程序名称:</span>
                        <span className="programValue">{programStore.selectProgramInfo.name ?? ''}</span>
                    </Col>
                    <Col span={6}>
                        <span className="programKey">最大重启次数:</span>
                        <span className="programValue">{programStore.selectProgramInfo.maxRestarts ?? '~'}</span>
                    </Col>
                    <Col span={6}>
                        <span className="programKey">最大重试次数:</span>
                        <span className="programValue">{programStore.selectProgramInfo.maxRetries ?? '~'}</span>
                    </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <span className="programKey">发布路径:</span>
                        <span className="programValue">{programStore.selectProgramInfo.deployPath ?? '~'}</span>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <span className="programKey">入口文件路径:</span>
                        <span className="programValue">{programStore.selectProgramInfo.script ?? '~'}</span>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <span className="programKey">重启时间延迟:</span>
                        <span className="programValue">{programStore.selectProgramInfo.wait ?? '~'}</span>
                    </Col>
                    <Col span={6}>
                        <span className="programKey">重启时间增量:</span>
                        <span className="programValue">{programStore.selectProgramInfo.grow ?? '~'}</span>
                    </Col>
                </Row>
            </div>
            {/* <Divider /> */}
            <div className="map">
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
                </div>
                <div className="charts">
                    <MonitorCharts monitorType={monitorType}></MonitorCharts>
                </div>
            </div>
        </div>
    );
};
export default observer(DashBoard);
