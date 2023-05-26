import './index.less';
import logo from '@/assets/lp.png';

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="" />
                <p>WinDeployer</p>
            </div>
            <div className="nav"></div>
        </div>
    );
};

export default Header;
