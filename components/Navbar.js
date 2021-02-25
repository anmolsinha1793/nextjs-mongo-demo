import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar__brand">Green-note</a>
        </Link>
        <Link href="/newnote">
            <a className="navbar__create">Create note</a>
        </Link>
    </nav>
)

export default Navbar;