import { NAV_MENU_CONTENTS, MENU_BUTTON } from "@/constants";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export function BasicMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="md:!hidden">
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				className="!capitalize !text-white"
			>
				{MENU_BUTTON}
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				className="menu"
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{NAV_MENU_CONTENTS.map((content, idx) => (
					<MenuItem key={idx} onClick={handleClose}>
						{content}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
