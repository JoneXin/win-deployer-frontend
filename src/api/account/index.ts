import { request } from '@/utils/axios';
import { type userInfoType } from './model';

export function updatePassword(data: userInfoType) {
    return request({
        url: 'account/password',
        method: 'post',
        data,
    });
}
