import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-wide hover:text-gray-200 transition">
              QuizApp
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/" passHref>
              <span className="text-lg font-medium hover:underline hover:text-gray-200 transition">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/quiz" passHref>
              <span className="text-lg font-medium hover:underline hover:text-gray-200 transition">
                Quizzes
              </span>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            id="menu-toggle"
            className="focus:outline-none text-lg font-bold"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div id="mobile-menu" className="hidden md:hidden bg-blue-700">
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <Link href="/" passHref>
              <span className="text-lg font-medium hover:underline hover:text-gray-200 transition">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/quiz" passHref>
              <span className="text-lg font-medium hover:underline hover:text-gray-200 transition">
                Quizzes
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
