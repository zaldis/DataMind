export default function Form({ formStyle, actions, fields }) {
    const controls = fields.map(field => {
        const controlCSS = formStyle === 'dark' ? 'form-control__dark' : 'form-control__light';
        return (
            <div className={`form-control ${controlCSS}`} key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                { field.htmlElement }
            </div>
        );
    })

    let formCSS = null;
    if (formStyle === 'dark') formCSS = "form__dark";

    return (
        <form className={`form ${formCSS}`}>
            <div className='form-inputs'>
                {controls}
            </div>
            <div className="form-actions">
                { actions }
            </div>
        </form>
    );
}
