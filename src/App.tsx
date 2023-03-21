import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline"; // CSS reset for MUI
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";

import useTheme from "./hooks/useTheme";
import { ThemeButton, JoyRideTour, DraggableList, InfiniteScroll } from "./components/index";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // Default is true
		},
	},
});

// Access to browser local storage
const localStorage = window.localStorage;

function App() {
	const { selectedTheme, toggleThemeHandler } = useTheme(); // Choose a value for theme(light/dark) and if not default value is light

	// This hook checks if this is the first time shown the tutorial tour to the user or not
	useEffect(() => {
		if (!localStorage.getItem("tourShowed")) {
			document.body.addEventListener(
				"click",
				() => {
					localStorage.setItem("tourShowed", "true");
				},
				{ once: true },
			);

			return () => document.body.removeEventListener("click", () => localStorage.setItem("tourShowed", "true"));
		}
	}, []);

	return (
		<>
			<Backdrop open={selectedTheme.palette.mode === "dark" ? true : false}></Backdrop>
			<div style={{ position: "absolute", top: "0", left: "50%", translate: "-50%", width: "100%" }}>
				<ThemeProvider theme={selectedTheme}>
					<QueryClientProvider client={queryClient}>
						{/* This optional component fixes some inconsistencies across browsers */}
						<CssBaseline enableColorScheme />

						<ToastContainer limit={3} />

						<Container sx={{ display: "felx", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
							<ThemeButton toggleThemeHandler={toggleThemeHandler} selectedTheme={selectedTheme} />

							<Box sx={{ my: 4 }}>
								<Typography
									variant="h4"
									gutterBottom
									sx={{
										textAlign: "center",
										padding: "1rem",
										border: "1px dashed gray",
										borderRadius: "0.5rem",
										backgroundColor: "lightgray",
										zIndex: "100",
									}}>
									Pagination List
								</Typography>
								<DraggableList />
							</Box>

							<hr></hr>

							<Box sx={{ my: 4 }}>
								<Typography
									variant="h4"
									gutterBottom
									sx={{
										position: "sticky",
										top: "0",
										textAlign: "center",
										padding: "1rem",
										border: "1px dashed gray",
										borderRadius: "0.5rem",
										backgroundColor: "lightgray",
										zIndex: "100",
									}}>
									Infinite Scroll List
								</Typography>
								<InfiniteScroll />
							</Box>

							{!localStorage.getItem("tourShowed") && <JoyRideTour />}
						</Container>
						<ReactQueryDevtools initialIsOpen={false} position="top-left" />
					</QueryClientProvider>
				</ThemeProvider>
			</div>
		</>
	);
}

export default App;
