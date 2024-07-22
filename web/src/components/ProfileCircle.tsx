export default function ProfileCircle({ firstName, lastName }) {
    const text = firstName[0] + lastName[0];

    return (
        <div style={{ textTransform: "uppercase" }} className="profile-circle">{text}</div>
    );
}
