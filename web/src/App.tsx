import {useEffect, useState} from "react";

import Header from './components/Header';
import HorizontalMenu from "./components/HorizontalMenu";
import ProfileCircle from "./components/ProfileCircle";
import MenuLayout from "./components/MenuLayout.tsx";
import Login from "./components/Login";
import Diagnostics from "./components/Diagnostics";
import InsightsGraph from "./components/InsightsGraph.tsx";

import industryWindowIcon from "./assets/industry-window.svg";
import circleInfoIcon from "./assets/circle-info.svg";
import bellIcon from "./assets/bell.svg";
import fileIcon from "./assets/file.svg";
import gearIcon from "./assets/gear.svg";
import arrowRightFromBracket from "./assets/arrow-right-from-bracket.svg";
import {getInsights} from "./client.tsx";


function App() {
    const [username, setUsername] = useState('');
    const [insights, setInsights] = useState([]);
    const [insightsFromDate, setInsightsFromDate] = useState(new Date());

    useEffect(() => {
        const savedUsername = localStorage.getItem('username') || '';
        if (!username) {
            handleOnSuccessLogin(savedUsername);
        }
    }, [username]);

    useEffect(() => {
        reloadInsights();
    }, [insightsFromDate]);

    function reloadInsights() {
        getInsights(insightsFromDate).then((insights: []) => {
            setInsights(insights);
        });
    }

    function handleOnSuccessLogin(username) {
        setUsername(username);
        localStorage.setItem('username', username);
    }

    function handleLogOut() {
        setUsername('');
        localStorage.clear();
    }

    const firstName = username.split('.')[0] || '';
    const lastName = username.split('.')[1] || '';

    let menu = undefined;
    let content = (
        <div style={{ width: "30rem", margin: "auto" }}>
            <Login onSuccessLogin={handleOnSuccessLogin} />
        </div>
    );
    if (username) {
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
        content = (
            <>
                <InsightsGraph
                    insights={insights}
                    insightsFromDate={insightsFromDate}
                    onChangeInsightsFromDate={(newDate) => setInsightsFromDate(newDate)}
                    reloadInsights={reloadInsights}
                />
                <br />
                <Diagnostics insights={insights} reloadInsights={reloadInsights} />
            </>
        )
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
