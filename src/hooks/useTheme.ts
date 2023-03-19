import { useState } from "react";
import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import theme from "../theme";

const localStorage = window.localStorage;

function useTheme(defaultValue: "light" | "dark" = "light") {
  const [mode, setMode] = useState<"light" | "dark">(defaultValue);
  
  const storedTheme = localStorage.getItem("ThemeMode");
  
	let selectedTheme = createTheme(theme(mode)); // Default selected theme

  const toggleThemeHandler = () => {

    if (storedTheme !== null) {
			localStorage.setItem("ThemeMode", storedTheme === "light" ? "dark" : "light");
		} else {
			localStorage.setItem("ThemeMode", defaultValue === "light" ? "dark" : "light");
    }
    
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
	};

	if (storedTheme !== null) {
		selectedTheme = createTheme(theme(storedTheme as PaletteMode));

		return { selectedTheme, toggleThemeHandler };
	}

	return { selectedTheme, toggleThemeHandler };
}

export default useTheme;
