import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { Col, Divider, Row, Segmented, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './index.less';
import { programStore } from '@/stores/mobx';
import * as echarts from 'echarts/core';
import {
    DatasetComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    TransformComponent,
    ToolboxComponent,
    LegendComponent,
    DataZoomComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
]);

import { cpuOption, memoryOption } from './monitor_opt';
import { CpuMonitorType, MemoryMonitorType } from '@/stores/mobx/program';

type MonitorChartsProps = {
    monitorType: 'cpu' | 'memory';
};

const MonitorCharts: FC<MonitorChartsProps> = (props: MonitorChartsProps) => {
    const [monitorCharts, setMonitorCharts] = useState<echarts.ECharts>();

    const chartsRef = useRef(null);

    useEffect(() => {
        initCharts();
    }, []);

    useEffect(() => {
        if (monitorCharts) {
            setMonitorData(monitorCharts);
        }
    }, [props.monitorType]);

    useEffect(() => {
        if (monitorCharts) {
            setMonitorData(monitorCharts);
        }
    }, [programStore.slectProgramMonitor]);

    const initCharts = () => {
        if (chartsRef.current) {
            const monitorCharts = echarts.init(chartsRef.current);
            setMonitorCharts(monitorCharts);
            setMonitorData(monitorCharts);
        }
    };

    const setMonitorData = (monitorCharts: echarts.ECharts) => {
        if (props.monitorType == 'cpu') {
            setCpuData(programStore.slectProgramMonitor.cpu, cpuOption, monitorCharts);
        } else {
            setMemoryData(programStore.slectProgramMonitor.memory, memoryOption, monitorCharts);
        }
    };

    const setCpuData = (data: Array<CpuMonitorType>, options: any, charts: echarts.ECharts) => {
        options.xAxis.data = data.map(v => v.time);
        options.series[0].data = data.map(v => v.cpuUsed);
        options.series[1].data = data.map(v => v.cpuProcessUsed);
        charts.setOption(options, true);
    };

    const setMemoryData = (data: Array<MemoryMonitorType>, options: any, charts: echarts.ECharts) => {
        console.log(monitorCharts, '-==');

        options.xAxis.data = data.map(v => v.time);
        options.series[0].data = data.map(v => v.memoryUsed);
        options.series[1].data = data.map(v => v.memoryProccessUsed);
        options.yAxis.max = data[0].memorySum;
        charts.setOption(options, true);
    };

    return <div style={{ width: '100%', height: '100%' }} ref={chartsRef}></div>;
};
export default observer(MonitorCharts) as FC<MonitorChartsProps>;
