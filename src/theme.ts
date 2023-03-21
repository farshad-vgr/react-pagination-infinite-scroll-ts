import { PaletteMode } from "@mui/material";
import { red, grey, blueGrey, orange, blue, green } from "@mui/material/colors";

// A custom theme for this app with MUI
const theme = (mode: PaletteMode) => {
	if (mode === "light") {
		return {
			palette: {
				mode,
				primary: {
					main: blue[800],
				},
				secondary: {
					main: grey[700],
				},
				error: {
					main: red[700],
				},
				warning: {
					main: orange[700],
				},
				success: {
					main: green[700],
				},
				divider: blue[700],
				background: {
					default: blueGrey[100],
					paper: "rgba(250,250,250,0.5)",
				},
				text: {
					primary: grey[900],
					secondary: grey[700],
				},
			},
		};
	} else {
		return {
			palette: {
				mode,
				primary: {
					main: blue[200],
				},
				secondary: {
					main: grey[200],
				},
				error: {
					main: red[200],
				},
				warning: {
					main: orange[200],
				},
				success: {
					main: green[200],
				},
				divider: orange[200],
				background: {
					default: blueGrey[800],
					paper: "rgba(50,50,50,0.5)",
				},
				text: {
					primary: grey[300],
					secondary: grey[200],
				},
			},
		};
	}
};

export default theme;
