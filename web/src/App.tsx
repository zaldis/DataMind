import {useEffect, useState} from "react";
import { styled } from "styled-components";

import Header from './components/Header';
import HorizontalMenu from "./components/HorizontalMenu";
import MenuLayout from "./components/MenuLayout";
import Login from "./components/Login";
import Diagnostics from "./components/Diagnostics";
import InsightsGraph from "./components/InsightsGraph";
import Icon from "./components/Icon";

import industryWindowIcon from "./assets/industry-window.svg";
import circleInfoIcon from "./assets/circle-info.svg";
import bellIcon from "./assets/bell.svg";
import fileIcon from "./assets/file.svg";
import gearIcon from "./assets/gear.svg";
import arrowRightFromBracket from "./assets/arrow-right-from-bracket.svg";
import {getInsights} from "./client.tsx";


const CenteredDiv = styled.div`
    text-align: center;
`;


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
                        element: <Icon src={industryWindowIcon} alt="industry window icon"/>,
                        isActive: true,
                    }, {
                        element: <Icon src={circleInfoIcon} alt="circle info icon"/>,
                    }, {
                        element: <Icon src={bellIcon} alt="bell icon"/>,
                    }, {
                        element: <Icon src={fileIcon} alt="file icon"/>,
                    }, {
                        element: <Icon src={gearIcon} alt="settigns"/>,
                    }
                ]}
                bottomItems={[
                    {
                        element: <Icon src={arrowRightFromBracket} alt="log out"/>,
                        onClick: () => handleLogOut(),
                    }, {
                        element: (
                            <CenteredDiv style={{ textTransform: "uppercase" }}>
                                {firstName[0]}{lastName[0]}
                            </CenteredDiv>
                        ),
                        isCircle: true
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
