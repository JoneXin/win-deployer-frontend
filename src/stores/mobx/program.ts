import { MonitorQueryType, getProcessMonitorData } from '@/api/monitor';
import { getProgramListApi } from '@/api/program';
import { ProgramDataType } from '@/pages/Home/program/constan';
import { transformTime } from '@/utils/tool/tool';
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
        cpu: [],
        memory: [],
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
    /**
     * 获取指定时间范围类，指定proccess监控数据
     */
    async getMonitorData(param: MonitorQueryType) {
        const monitorData = await getProcessMonitorData(param);
        this.slectProgramMonitor = {
            cpu: monitorData.cpu.map((v: any) => ({ ...v, time: transformTime(v.time) })),
            memory: monitorData.memory.map((v: any) => ({ ...v, time: transformTime(v.time) })),
        };
    },
});

export default programStore;
