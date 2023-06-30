import { getProgramListApi } from '@/api/program';
import { ProgramDataType } from '@/pages/Home/program/constan';
import { message } from 'antd';
import { makeAutoObservable, runInAction } from 'mobx';

export type MemoryMonitorType = {
    time: string;
    memorySum: number;
    memoryUsed: number;
    memoryProccessUsed: number;
};

export type CpuMonitorType = {
    time: string;
    cpuUsed: number;
    cpuProcessUsed: number;
};

export type MonitorType = {
    cpu: Array<CpuMonitorType>;
    memory: Array<MemoryMonitorType>;
};

const programStore = makeAutoObservable({
    /**
     * 选中的程序
     */
    selectProgramInfo: {} as ProgramDataType,
    /**
     * 程序列表
     */
    programList: [] as Array<ProgramDataType>,
    /**
     * 选中程序的monitor数据
     */
    slectProgramMonitor: {
        cpu: [
            {
                cpuProcessUsed: 5.12,
                cpuUsed: 81.23,
                time: '2022/5/2 09:20:21',
            },
            {
                cpuProcessUsed: 4.12,
                cpuUsed: 89.12,
                time: '2022/5/2 09:30:21',
            },
            {
                cpuProcessUsed: 3.12,
                cpuUsed: 92.16,
                time: '2022/5/2 09:40:21',
            },
        ],
        memory: [
            {
                memoryProccessUsed: 645,
                memorySum: 16000,
                memoryUsed: 12001,
                time: '2022/5/2 09:20:21',
            },
            {
                memoryProccessUsed: 545,
                memorySum: 16000,
                memoryUsed: 11001,
                time: '2022/5/2 09:20:21',
            },
            {
                memoryProccessUsed: 415,
                memorySum: 16000,
                memoryUsed: 10001,
                time: '2022/5/2 09:20:21',
            },
        ],
    } as MonitorType,

    async getProgramList() {
        try {
            this.programList = await getProgramListApi();
            this.selectProgramInfo = this.programList[0] || {};
        } catch (error) {
            message.error(error as any);
        }
    },
    setProgramInfo(info: ProgramDataType) {
        this.selectProgramInfo = info;
    },
});

export default programStore;
