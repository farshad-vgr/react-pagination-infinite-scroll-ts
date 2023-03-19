import { memo } from "react";
import { Theme } from "@mui/material";
import Button from "@mui/material/Button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface Props {
	toggleThemeHandler: () => void;
	selectedTheme: Theme;
}

function ThemeButton({ toggleThemeHandler, selectedTheme }: Props) {
	return (
		<>
			<Button
				className="tour-theme"
				onClick={toggleThemeHandler}
				sx={{ position: "fixed", top: "0.5rem", right: "0.5rem", minWidth: "2.5rem", minHeight: "2.5rem", borderRadius: "50%" }}>
				{selectedTheme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
			</Button>
		</>
	);
}

export default memo(ThemeButton);
