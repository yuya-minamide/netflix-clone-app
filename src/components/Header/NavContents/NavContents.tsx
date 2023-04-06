import { NAV_MENU_CONTENTS } from "@/constants";
import Link from "next/link";

export function NavContents() {
	return (
		<ul className="hidden space-x-4 md:flex">
			{NAV_MENU_CONTENTS.map((content, index) => (
				<li key={index}>
					<Link className="headerLink" href="/">
						{content}
					</Link>
				</li>
			))}
		</ul>
	);
}
