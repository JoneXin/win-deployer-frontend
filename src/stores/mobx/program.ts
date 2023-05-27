import { getProgramListApi } from '@/api/program';
import { ProgramDataType } from '@/pages/Home/program/constan';
import { message } from 'antd';
import { makeAutoObservable, runInAction } from 'mobx';

const programStore = makeAutoObservable({
    selectProgramInfo: {} as ProgramDataType,
    programList: [] as Array<ProgramDataType>,
    async getProgramList() {
        try {
            this.programList = await getProgramListApi();
            this.selectProgramInfo = this.programList[0];
        } catch (error) {
            message.error(error as any);
        }
    },
    setProgramInfo(info: ProgramDataType) {
        this.selectProgramInfo = info;
    },
});

export default programStore;
