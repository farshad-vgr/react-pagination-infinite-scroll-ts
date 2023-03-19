import { PaletteMode } from "@mui/material";
import { red, grey, blueGrey, orange, blue, green, purple } from "@mui/material/colors";

// A custom theme for this app with MUI
const theme = (mode: PaletteMode) => {
	if (mode === "light") {
		return {
			palette: {
				mode,
				primary: {
					main: blue[700],
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
					default: grey[50],
					paper: purple.A200,
				},
				text: {
					primary: grey[900],
					secondary: grey[800],
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
					paper: purple.A200,
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
