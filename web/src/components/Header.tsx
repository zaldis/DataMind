import headerLogo from '/header-logo.svg'

export default function Header() {
    return (
        <header className="header">
            <img src={headerLogo} alt="header" />
        </header>
    )
}
