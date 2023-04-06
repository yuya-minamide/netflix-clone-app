import { NavContents } from "../index";
import Image from "next/image";
import Link from "next/link";
import { FiBell, FiSearch } from "react-icons/Fi";
import { useEffect, useState } from "react";

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header className={`${isScrolled && "bg-[#141414]"}`}>
			<div className="flex items-center space-x-2 md:space-x-10">
				<Image
					src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
					alt="netflix-logo"
					width={100}
					height={100}
					className="cursor-pointer object-contain"
				/>

				<NavContents />
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
