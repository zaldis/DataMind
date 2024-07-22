import {useState} from "react";

import Header from './components/Header';
import HorizontalMenu from "./components/HorizontalMenu";
import ProfileCircle from "./components/ProfileCircle";
import MenuLayout from "./components/MenuLayout.tsx";
import Login from "./components/Login";
import Diagnostics from "./components/Diagnostics";

import industryWindowIcon from "./assets/industry-window.svg";
import circleInfoIcon from "./assets/circle-info.svg";
import bellIcon from "./assets/bell.svg";
import fileIcon from "./assets/file.svg";
import gearIcon from "./assets/gear.svg";
import arrowRightFromBracket from "./assets/arrow-right-from-bracket.svg";


function App() {
    const [userData, setUserData] = useState({
        username: '',
        token: ''
    });

    function handleOnSuccessLogin(username, token) {
        setUserData(prevState => ({
            ...prevState,
            username: username,
            token: token
        }));
    }

    function handleLogOut() {
        setUserData({
            username: '',
            token: ''
        });
    }

    const firstName = userData.username.split('.')[0] || '';
    const lastName = userData.username.split('.')[1] || '';

    let menu = undefined;
    if (userData.token) {
        menu = (
            <HorizontalMenu
                items={[
                    {
                        element: <img className="icon-img" src={industryWindowIcon} alt="industry window icon"/>,
                        isActive: true,
                    }, {
                        element: <img className="icon-img" src={circleInfoIcon} alt="circle info icon"/>,
                        isActive: false,
                    }, {
                        element: <img className="icon-img" src={bellIcon} alt="bell icon"/>,
                        isActive: false,
                    }, {
                        element: <img className="icon-img" src={fileIcon} alt="file icon"/>,
                        isActive: false,
                    }, {
                        element: <img className="icon-img" src={gearIcon} alt="settigns"/>,
                        isActive: false,
                    }
                ]}
                bottomItems={[
                    {
                        element: <img className="icon-img" src={arrowRightFromBracket} alt="log out"/>,
                        onClick: () => handleLogOut(),
                        isRadius: false
                    }, {
                        element: <ProfileCircle firstName={firstName} lastName={lastName} />,
                        isRadius: true
                    }
                ]}
            />
        );
    }

    let content = <Login onSuccessLogin={handleOnSuccessLogin} />;
    if (userData.token) {
        content = <Diagnostics />
    }

    return (
        <>
            <MenuLayout
                header={ <Header /> }
                menu={ menu }
                body={ content }
            />
        </>
    )
}

export default App
