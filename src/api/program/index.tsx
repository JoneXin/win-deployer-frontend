import { request } from '@/utils/axios';

export function getProgramListApi() {
    return request({
        url: 'program',
        method: 'get',
    });
}
