import { useState, useRef } from "react";
import { styled } from "styled-components";

import Button from "./Button";
import Form from "./Form";
import Modal from "./Modal";

import PlusIcon from "../assets/plus.svg";

import {addInsight} from "../client";
import {dateToString} from "../utls";
import Table from "./Table.tsx";


const SpaceBetweenDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;


interface DiagnosticProps {
    insights: {
        type: string;
        severity: string;
        created_at: Date;
    }[];
    reloadInsights: () => void;
}


const Diagnostics: React.FC<DiagnosticProps> = ({ insights, reloadInsights }) => {
    const [isInsightModalOpen, setIsInsightModalOpen] = useState<boolean>(false);

    const createdAt = useRef<HTMLInputElement | null>(null);
    const insightType = useRef<HTMLSelectElement | null>(null);
    const insightSeverity = useRef<HTMLSelectElement | null>(null);

    function closeAddInsightModal(): void {
        setIsInsightModalOpen(false);
    }

    function openAddInsightModal(): void {
        setIsInsightModalOpen(true);
    }

    function handleSendingNewInsight(): void {
        const createdAtValue = createdAt.current!.value;
        const insightTypeValue = insightType.current!.value;
        const insightSeverityValue = insightSeverity.current!.value;

        addInsight(
            new Date(createdAtValue), insightTypeValue, insightSeverityValue
        ).then(() => {
             setIsInsightModalOpen(false);
             reloadInsights();
        });
    }

    const diagnosticRows = insights.map(insight => {
        return (
            [
                dateToString(new Date(insight.created_at)),
                insight.type,
                insight.severity
            ]
        );
    });

    const newInsightForm = (
        <Form
            style={{ padding: "2rem" }}
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
            actions={
                <>
                    <Button onClick={closeAddInsightModal} key="cancel">
                        Cancel
                    </Button>
                    <Button onClick={handleSendingNewInsight} theme="dark" key="save">
                        Save
                    </Button>
                </>
            }
        />
    );

    return (
        <>
            <Modal
                header="Add new diagnostic"
                content={newInsightForm}
                isActive={isInsightModalOpen}
            />

            <SpaceBetweenDiv style={{marginBottom: "16px", display: "flex", alignItems: "center"}}>
                <h2>Diagnostics</h2>
                <Button
                    icon={PlusIcon}
                    theme="dark"
                    onClick={openAddInsightModal}
                >
                    Add new
                </Button>
            </SpaceBetweenDiv>

            <Table
                headers={[
                    "Diagnostic date",
                    "Fault type",
                    "Severity"
                ]}
                rows={diagnosticRows}
            />
        </>
    );
}


export default Diagnostics;
