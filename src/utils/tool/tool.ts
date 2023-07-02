import dayjs from 'dayjs';

export const transformTime = (time: number) => {
    return dayjs(time).format('YYYY/MM/DD HH:mm:ss');
};

export const daysBefor = (n: number) => {
    return new Date(dayjs().subtract(n, 'days').format());
};

export const hoursBefor = (n: number) => {
    return new Date(dayjs().subtract(n, 'hours').format());
};
