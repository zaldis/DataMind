import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { styled } from "styled-components";

import Panel from "./Panel";
import Form from "./Form";

import ChartLineIcon from "../assets/chart-line.svg";

import { dateToString } from "../utls.tsx";
import Icon from "./Icon.tsx";


const SpaceBetweenDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CenteredRowDiv = styled.div`
    display: flex;
    align-items: center;
`;


export default function InsightsGraph({ insights, insightsFromDate, onChangeInsightsFromDate }) {
    function handleFromDateChange(event) {
        onChangeInsightsFromDate(new Date(event.target.value));
    }

    const severityMap = {
        "critical": 0,
        "alarm": 1,
        "healthy": 2
    }
    const usedDates = new Map();
    let alignedInsights = insights.map(insight => ({
        ...insight,
        created_at: insight.created_at.split('T')[0]
    }));
    for (const insight of alignedInsights) {
        if (usedDates.has(insight.created_at)) {
            const savedInsight = usedDates.get(insight.created_at);
            if (severityMap[savedInsight.severity] < severityMap[insight.severity]) {
                continue;
            }
        }
        usedDates.set(insight.created_at, insight);
    }
    alignedInsights = [...usedDates.values()].sort().reverse().map(insight => {
        return {
            ...insight,
            severityIndex: severityMap[insight.severity],
        }
    });

    const formattedInsightsFromDate = dateToString(insightsFromDate, '-', true);

    return (
        <Panel>
            <SpaceBetweenDiv style={{ fontWeight: "bold", margin: "10px 0 10px 0" }}>
                <CenteredRowDiv>
                    <Icon src={ChartLineIcon} alt="chart-line" /> <div style={{ marginLeft: "10px" }}>Fusion trend</div>
                </CenteredRowDiv>

                <CenteredRowDiv>
                    <Form fields={[
                    {
                        id: "from-date",
                        label: "From: ",
                        orientation: "horizontal",
                        htmlElement: (
                            <input id="from-date" name="from-date" type="date"
                                   value={formattedInsightsFromDate} onChange={handleFromDateChange}
                            />
                        )
                    }
                    ]}/>
                </CenteredRowDiv>
            </SpaceBetweenDiv>
            <div style={{ width: "100%", height: "400px" }}>
                <ResponsiveContainer style={{ backgroundColor: "white", borderRadius: "10px" }}>
                   <LineChart
                    width={3000} height={400}
                    data={alignedInsights}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <Line type="monotone" dataKey="severityIndex" stroke="#8884d8" dot={<CustomDot />} />
                    <XAxis dataKey="created_at" />
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
                </ResponsiveContainer>
            </div>
        </Panel>
    );
}


function CustomTooltip({ payload, label, active }) {
    if (active && payload[0]) {
        return (
            <div>{payload[0].payload.type}</div>
        );
    }
    return null;
}

function CustomDot({ cx, cy, stroke, payload, value }) {
    let dotColor = "green";
    if (payload.severity === "critical") dotColor = "red";
    if (payload.severity === "alarm") dotColor = "orange";
    return (
        <svg x={cx-60} y={cy-60} width={120} height={120} fill={dotColor} viewBox="0 0 1024 1024">
          <circle r={60} cx={512} cy={512} fill={dotColor} />
        </svg>
    );
}
