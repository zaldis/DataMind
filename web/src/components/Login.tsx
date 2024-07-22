import { useRef } from "react";

import { login } from "../client";

/* TODO
*
*  It had better to think about custom component for the html forms.
* */

export default function Login({ onSuccessLogin }) {
    const user = useRef();
    const password = useRef();

    function handleFormSubmit(event) {
        const enteredUser = user.current.value;
        const enteredPassword = password.current.value;

        login(enteredUser, enteredPassword).then((token: string) => {
            onSuccessLogin(enteredUser, token);
        });
    }

    return (
        <form>
            <div className="form-inputs form-inputs__purple form-inputs__limited">
                <div className="form-control form-control__dark">
                    <label htmlFor="user">User</label>
                    <input id="user" type="text" name="username" ref={user} />
                </div>

                <div className="form-control form-control__dark">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" ref={password} />
                </div>

                <p className="form-actions">
                    <button type="button" className="button" onClick={handleFormSubmit}>
                        Login
                    </button>
                </p>
            </div>
        </form>
    )
}
