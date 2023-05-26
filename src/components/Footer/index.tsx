import { FC, useEffect } from 'react';

const Footer: FC = () => {
    useEffect(() => {
        console.log('Footer   render!!!!');
    }, []);

    return (
        <div>
            <br />
            <p>让身边的人变得更好leaper~~</p>
            <br />
        </div>
    );
};
export default Footer;
