import { useRef } from "react";

import Button from "./Button";
import Form from "./Form";

import { login } from "../client";


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
        <Form
            formStyle="dark"
            style={{ padding: "2rem" }}
            fields={[
                {
                    label: 'User',
                    id: 'user',
                    htmlElement: <input id="user" type="text" name="username" ref={user}/>
                }, {
                    label: 'password',
                    id: 'password',
                    htmlElement: <input id="password" type="password" name="password" ref={password}/>
                }
            ]}
            actions={[
                <Button onClick={handleFormSubmit} key="login-btn">Login</Button>,
            ]}
        />
    );
}
