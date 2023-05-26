import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '@/components/Header';
import Program from './program';
import DashBoard from './dashboard';
import './index.less';
import { programStore } from '@/stores/mobx';

const Home: FC = () => {
    useEffect(() => {
        programStore.getProgramList();
    }, []);

    return (
        <>
            <Header></Header>
            <div className="content">
                <Program></Program>
                <DashBoard></DashBoard>
            </div>
        </>
    );
};
export default observer(Home);
