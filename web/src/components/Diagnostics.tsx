import {useEffect, useState, useRef} from "react";

import Form from "./Form";
import Modal from "./Modal";

import PlusIcon from "../assets/plus.svg";

import {getInsights, addInsight} from "../client";



export default function Diagnostics() {
    const [insights, setInsights] = useState([]);
    const [isInsightModalOpen, setIsInsightModalOpen] = useState(false);

    const createdAt = useRef();
    const insightType = useRef();
    const insightSeverity = useRef();

    useEffect(() => {
        reloadInsights();
    }, []);

    function reloadInsights() {
        getInsights(new Date()).then((insights: []) => {
            setInsights(insights);
        });
    }

    function closeAddInsightModal() {
        setIsInsightModalOpen(false);
    }

    function openAddInsightModal() {
        setIsInsightModalOpen(true);
    }

    function handleSendingNewInsight() {
        const createdAtValue = createdAt.current.value;
        const insightTypeValue = insightType.current.value;
        const insightSeverityValue = insightSeverity.current.value;

        addInsight(
            createdAtValue, insightTypeValue, insightSeverityValue
        ).then(() => {
             setIsInsightModalOpen(false);
             reloadInsights();
        });
    }

    const diagnosticItems = insights.map(insight => {
        return (
           <DiagnosticItem
                key={insight.id}
                createdDate={new Date(insight.created_at)}
                faultType={insight.type}
                severity={insight.severity}
            />
        );
    });

    const newInsightForm = (
        <Form
            fields={[
                {
                    id: "created-date",
                    label: "Diagnostic date",
                    htmlElement: <input id="created-date" type="date" name="created_at" ref={createdAt}/>
                }, {
                    id: "type",
                    label: "Fault type",
                    htmlElement: (
                        <select id="type" name="type" ref={insightType}>
                            <option value="gear">Gear</option>
                            <option value="motor">Motor</option>
                            <option value="bearing">Bearing</option>
                        </select>
                    )
                }, {
                    id: "severity",
                    label: "Severity",
                    htmlElement: (
                        <select id="severity" name="severity" ref={insightSeverity}>
                            <option value="healthy">Healthy</option>
                            <option value="critical">Critical</option>
                            <option value="alarm">Alarm</option>
                        </select>
                    )
                }
            ]}
            actions={[
                <button type="button" className="button" onClick={closeAddInsightModal} key="cancel">
                    Cancel
                </button>,
                <button type="button" className="button" onClick={handleSendingNewInsight} key="save">
                    Save
                </button>
            ]}
        />
    );

    return (
        <>
            <Modal
                header="Add new diagnostic"
                content={newInsightForm}
                isActive={isInsightModalOpen}
            />

            {/* TODO Update with custom button component instead of inline CSS */}
            <div style={{marginBottom: "16px"}} className="space-between">
                <h2>Diagnostics</h2>
                <button className="button purple" onClick={openAddInsightModal}>
                    <div style={{display: "flex"}}>
                        <img src={PlusIcon} alt="plus sign"/>
                        <div style={{marginLeft: "10px"}}>Add new</div>
                    </div>
                </button>
            </div>

            <div className="panel">
                <div className="panel__tabel-header">
                    <div>Diagnostic date</div>
                    <div>Fault type</div>
                    <div>Severity</div>
                </div>
                { diagnosticItems }
            </div>
        </>
    );
}


function DiagnosticItem({createdDate, faultType, severity}) {
    const formattedDay = createdDate.getDate().toString().padStart(2, "0");
    const formattedMonth = (createdDate.getMonth() + 1).toString().padStart(2, "0");
    const formattedDate = `${formattedDay}.${formattedMonth}.${createdDate.getFullYear()}`;
    return (
        <div className="panel__table-item">
            <div>{formattedDate}</div>
            <div>{faultType}</div>
            <div>{severity}</div>
        </div>
    );
}
