import { FC, forwardRef, useEffect, type RefObject } from 'react';
import SetSpeed from '@/components/SetSpeed';
import SpeedShow from '@/components/SpeedShow';

const Speed: FC = () => {
    return (
        <>
            <SpeedShow />
            <SetSpeed />
        </>
    );
};
export default Speed;
