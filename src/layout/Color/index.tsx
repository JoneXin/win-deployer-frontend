import { FC, useEffect, useRef } from 'react';
import mobxStores from '@/stores/mobx';
import { observer } from 'mobx-react-lite';
import style from './index.module.less';

import { useAppDispatch, useAppSelector } from '@/stores/redux/hooks';
import { updateFlag, updateFlagSync } from '@/stores/redux/features';
import { selectFlag } from '@/stores/redux/selectors';
import { Button, Tooltip } from 'antd';

const Color: FC = () => {
    // redux
    const flag = useAppSelector(selectFlag);
    const dispatch = useAppDispatch();

    useEffect(() => {
        document.onclick = () => {
            console.log('flag', flag);
            console.log('click', mobxStores.status.speed);
        };

        return () => {
            document.onclick = null;
        };
    }, []);

    return (
        <>
            <Tooltip title={flag ? 'blue' : 'red'}>
                <p className={flag ? style.blue : style.red}>less 颜色</p>
            </Tooltip>
            <Button onClick={() => dispatch(updateFlag({ flag: !flag }))}>setColor</Button>
            <Button onClick={() => dispatch(updateFlagSync(!flag))}>setColorSync</Button>
        </>
    );
};
export default observer(Color);
