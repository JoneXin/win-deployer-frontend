import { request } from '@/utils/axios';

export type MonitorQueryType = {
    startTime: number;
    endTime: number;
    programName: string;
};

export function getProcessMonitorData(data: MonitorQueryType) {
    return request({
        url: 'monitor/data',
        method: 'get',
        params: data,
    });
}
