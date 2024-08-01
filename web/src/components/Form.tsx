import { styled } from "styled-components";
import { ReactElement } from "react";


const StyledForm = styled.form`
    border-radius: 10px;
    background: ${
        ({$theme}) => $theme === 'dark' ? "linear-gradient(180deg, #5d5db0 0%, #2f2f66 100%)" : "none"
    };
    box-shadow: ${
        ({$theme}) => $theme === 'dark' ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" : "none"
    };
    color: ${
        ({$theme}) => $theme === 'dark' ? "white" : "black"
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
    flex-direction: ${({$orientation}) => $orientation === 'horizontal' ? 'row': 'column'};
    align-items:  ${({$orientation}) => $orientation === 'horizontal' ? 'center': 'start'};
    gap: 0.5rem;
    margin: ${({$orientation}) => $orientation === 'horizontal' ? '0': '0 0 1.5rem 0'};
    
    & label {
        display: block;
        margin-bottom: ${({$orientation}) => $orientation === 'horizontal' ? '0' : '0.5rem'};
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: ${({$theme}) => $theme === "dark" ? "#c2d6ff" : "#879abf"};
    }
    
    & input, & select {
        width: 100%;
        padding: 0.75rem 1rem;
        line-height: 1.5;
        color: #374151;
        border-radius: 0.25rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        background-color: ${({$theme}) => {
            return ($theme === "dark") ? "#d1d5db" : "#ffffff";
        }};
        border: ${({$theme}) => {
            return ($theme === "dark") ? "1px solid transparent" : "1px solid grey";
        }};
    }
`;


interface FormProps {
    theme?: "dark" | "light";
    actions: ReactElement;
    fields: {
        id: string;
        label: string;
        orientation?: "horizontal" | "vertical";
        htmlElement: React.ReactElement;
    }[];
    style: React.CSSProperties;
}


const Form: React.FC<FormProps> = ({ theme, actions, fields, style }) => {
    if (!theme) theme = "light";
    const controls = fields.map(field => {
        return (
            <FormControl $theme={theme} $orientation={field.orientation} key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                { field.htmlElement }
            </FormControl>
        );
    })

    return (
        <StyledForm $theme={theme} style={style}>
            <FormInputs>
                {controls}
            </FormInputs>
            <FormActions>
                { actions }
            </FormActions>
        </StyledForm>
    );
}

export default Form;
