import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar__brand">Green-note</a>
        </Link>
        <Link href="/newnote">
            <a className="navbar__create">Create note</a>
        </Link>
        <Link href="/generateBarGraph">
            <a className="navbar__d3Demo">Generate Bar Graph</a>
        </Link>
        {/* <Link href="/staticBarGraph">
            <a className="navbar__d3Demo">Static Data</a>
        </Link> */}
    </nav>
)

export default Navbar;