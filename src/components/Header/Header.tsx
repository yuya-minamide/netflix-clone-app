import Image from "next/image";
import { FiBell, FiSearch } from "react-icons/Fi";
import Link from "next/link";

export function Header() {
	return (
		<header>
			<div className="flex items-center space-x-2 md:space-x-10">
				<Image
					src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
					alt="netflix-logo"
					width={100}
					height={100}
					className="cursor-pointer object-contain"
				/>

				<ul className="hidden space-x-4 md:flex">
					<li className="headerLink">Home</li>
					<li className="headerLink">TV Shows</li>
					<li className="headerLink">Movies</li>
					<li className="headerLink">New & Popular</li>
					<li className="headerLink">My List</li>
				</ul>
			</div>

			<div className="flex items-center space-x-4 text-sm font-light">
				<FiSearch className="hidden h-6 w-6 color-white sm:inline" />
				<p className="hidden lg:inline">Kids</p>
				<FiBell className="h-6 w-6 color-white" />
				<Link href="/account">
					<Image src="/assets/netflix-avatar.png" alt="user-avatar" width={40} height={40} className="cursor-pointer rounded" />
				</Link>
			</div>
		</header>
	);
}
