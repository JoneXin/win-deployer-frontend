import { request } from '@/utils/axios';

export type ProgramConfigType = {
    configContent: string;
    configPath: string;
};

export type NewProgramInfo = {
    config: Array<ProgramConfigType>;
    deployPath: string;
};

export type UpdateProgramInfo = {
    desc: string;
    programPkg: string;
    versionName: string;
    name: string;
};

export type LogsReaderConf = {
    logsPath: string;
    startTime: string;
    endTime: string;
    pageSize: number;
    pageNumber: number;
};
export async function getProgramListApi() {
    return await request({
        url: 'program',
        method: 'get',
    });
}

export async function addProgramListApi(data: NewProgramInfo) {
    return await request({
        url: 'program/add',
        method: 'post',
        data,
    });
}

export async function startServiceApi(name: string) {
    return await request({
        url: 'service/start',
        method: 'get',
        params: { name },
    });
}

export async function stopServiceApi(name: string) {
    return await request({
        url: 'service/stop',
        method: 'get',
        params: { name },
    });
}

export async function restartServiceApi(name: string) {
    return await request({
        url: 'service/restart',
        method: 'get',
        params: { name },
    });
}

export async function uninstallServiceApi(name: string) {
    return await request({
        url: 'program/uninstall',
        method: 'get',
        params: { name },
    });
}

export async function updateConfigApi(data: { name: string; version: string; config: Array<ProgramConfigType> }) {
    return await request({
        url: 'program/update_config',
        method: 'post',
        data,
    });
}

export async function getProgramLogsApi(data: LogsReaderConf) {
    return await request({
        url: 'program/logs',
        method: 'post',
        data,
    });
}

export async function updateRunningAppConfApi(data: { name: string; deployPath: string; config: Array<ProgramConfigType> }) {
    return await request({
        url: 'program/update_running_config',
        method: 'post',
        data,
    });
}

export async function updateProgramVersionApi(data: UpdateProgramInfo) {
    return await request({
        url: 'program/update_program',
        method: 'post',
        data,
    });
}
