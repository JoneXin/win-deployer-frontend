import * as echarts from 'echarts';

/**
 * 内存options
 */
export const memoryOption = {
    tooltip: {
        trigger: 'axis',
        // position: function (pt: any[]) {
        //     return [pt[0], '10%'];
        // },
        formatter: function (data: Array<any>) {
            console.log(data[0], '===');
            let str = `时间：${data[0]?.axisValue}<br/>`;
            data.forEach(v => {
                str += `${v.seriesName}: ${v.data > 1024 ? (v.data / 1024).toFixed(2) : v.data} ${
                    v.data > 1024 ? 'GB' : 'MB'
                }<br/>`;
            });

            return str;
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true,
    },
    title: {
        text: '近一周内存占用',
    },
    toolbox: {
        feature: {
            saveAsImage: {},
        },
    },
    legend: {
        data: ['总内存占用', '进程内存占用'],
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
    },
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 100,
        },
        {
            start: 0,
            end: 10,
        },
    ],
    series: [
        {
            name: '总内存占用',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
                color: '#6e9bc5',
            },
            tooltip: {
                trigger: 'axis',
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#68945c',
                    },
                    {
                        offset: 1,
                        color: '#6e9bc5',
                    },
                ]),
            },
            data: [],
        },
        {
            name: '进程内存占用',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
                color: 'rgb(255, 70, 131)',
            },
            tooltip: {
                trigger: 'axis',
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 158, 68)',
                    },
                    {
                        offset: 1,
                        color: 'rgb(255, 70, 131)',
                    },
                ]),
            },
            data: [],
        },
    ],
};

/**
 * cpu 折线options
 */
export const cpuOption = {
    title: {
        text: '近一周的CPU占用',
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (data: Array<any>) {
            console.log(data[0], '===');
            let str = `时间：${data[0]?.axisValue}<br/>`;
            data.forEach(v => {
                str += `${v.seriesName}: ${v.data}%<br/>`;
            });

            return str;
        },
    },
    legend: {
        data: ['系统CPU使用率', '进程CPU使用率'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true,
    },
    toolbox: {
        feature: {
            saveAsImage: {},
        },
    },
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 100,
        },
        {
            start: 0,
            end: 10,
        },
    ],
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
    },
    yAxis: {
        type: 'value',
        min: 0,
        max: 100,
    },
    series: [
        {
            name: '系统CPU占用',
            type: 'line',
            color: 'green',
            data: [],
        },
        {
            name: '进程CPU占用',
            type: 'line',
            color: 'red',
            data: [],
        },
    ],
};
