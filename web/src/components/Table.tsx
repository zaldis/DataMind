import { styled } from "styled-components";
import Panel from "./Panel";


const StyledTable = styled.div``;

const TableHeaders = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-left: 20px
`;

const TableHeadersItem = styled.div`
    flex: 1;
    color: #55687d;
`;

const TableColumns = styled.div`
    display: flex;
    background-color: white;
    height: 56px;
    padding: 20px 0 0 20px;
    margin-bottom: 10px;
    border-radius: 10px;
`;

const TableColumnsItem = styled.div`
    flex: 1;
`;


export default function Table({headers, rows}) {
    const rowElements = rows.map((row, index) => <Row row={row} key={index} />)
    const headerElements = headers.map((header, index) => <TableHeadersItem key={index}>{header}</TableHeadersItem>);
    return (
        <Panel>
            <StyledTable>
                <TableHeaders>
                    {headerElements}
                </TableHeaders>
                {rowElements}
            </StyledTable>
        </Panel>
    );
}


function Row({row}) {
    const columns = row.map((column, index) => <TableColumnsItem key={index}>{column}</TableColumnsItem>)
    return (
        <TableColumns>
            {columns}
        </TableColumns>
    );
}
