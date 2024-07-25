import { styled } from "styled-components";

const StyledForm = styled.form`
    border-radius: 10px;
    background: ${
        ({$style}) => $style === 'dark' ? "linear-gradient(180deg, #5d5db0 0%, #2f2f66 100%)" : "none"
    };
    box-shadow: ${
        ({$style}) => $style === 'dark' ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" : "none"
    };
    color: ${
        ({$style}) => $style === 'dark' ? "white" : "black"
    };
`;

const FormInputs = styled.div`
    width: 100%;
    margin: 0 auto;
    border-radius: 0.5rem;
`;

const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    
    & label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: ${({$style}) => $style === "dark" ? "#c2d6ff" : "#879abf"};
    }
    
    & input, & select {
        width: 100%;
        padding: 0.75rem 1rem;
        line-height: 1.5;
        color: #374151;
        border-radius: 0.25rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        background-color: ${({$style}) => {
            return ($style === "dark") ? "#d1d5db" : "#ffffff";
        }};
        border: ${({$style}) => {
            return ($style === "dark") ? "1px solid transparent" : "1px solid grey";
        }};
    }
`;


export default function Form({ formStyle, actions, fields, style }) {
    const controls = fields.map(field => {
        return (
            <FormControl $style={formStyle} key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                { field.htmlElement }
            </FormControl>
        );
    })

    return (
        <StyledForm $style={formStyle} style={style}>
            <FormInputs>
                {controls}
            </FormInputs>
            <FormActions>
                { actions }
            </FormActions>
        </StyledForm>
    );
}
