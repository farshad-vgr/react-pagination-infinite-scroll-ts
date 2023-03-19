import Joyride from "react-joyride";

const TOUR_STEPS = [
	{
		target: ".tour-theme", // Target element class name
		title: "Theme Options:",
		content: "Change website theme to Dark or Light !",
		offset: 5, // The distance from the target to the tooltip
		event: "hover", // The event to trigger the beacon(click/hover)
		disableBeacon: true, // This makes the tour to start automatically without click
	},
	{
		target: ".tour-pagination",
		content: "We use paginatio to show more data in list !",
		offset: 5,
		event: "hover",
	},
];

interface TourStyles {
	tooltipContainer: {
		textAlign: "left" | "right" | "center";
		cursor: string;
	};
	buttonClose: {
		top: string;
		right: string;
		display: string;
		jusctifyContent: string;
		alignItems: string;
		padding: string;
		width: string;
		height: string;
		color: string;
		fontWeight: string;
		outline: string;
		border: string;
		borderRadius: string;
		backgroundColor: string;
	};
	buttonNext: {
		backgroundColor: string;
		border: string;
		outline: string;
		fontFamily: string;
	};
	buttonBack: {
		marginRight: number;
		color: string;
		fontFamily: string;
	};
	buttonSkip: {
		color: string;
		fontFamily: string;
	};
	options: {
		backgroundColor: string;
		arrowColor: string;
	};
}

const TOUR_STYLES: TourStyles = {
	tooltipContainer: {
		textAlign: "left",
		cursor: "default",
	},
	buttonClose: {
		top: "0.25rem",
		right: "0.25rem",
		display: "flex",
		jusctifyContent: "center",
		alignItems: "center",
		padding: "0.25rem",
		width: "0.5rem",
		height: "0.5rem",
		color: "red",
		fontWeight: "bold",
		outline: "none",
		border: "1px dashed red",
		borderRadius: "50%",
		backgroundColor: "pink",
	},
	buttonNext: {
		backgroundColor: "deepskyblue",
		border: "1px dashed black",
		outline: "none",
		fontFamily: "Roboto",
	},
	buttonBack: {
		marginRight: 10,
		color: "deepskyblue",
		fontFamily: "Roboto",
	},
	buttonSkip: {
		color: "gray",
		fontFamily: "Roboto",
	},
	options: {
		backgroundColor: "whitesmoke",
		arrowColor: "whitesmoke",
	},
};

const JoyRideTour = () => {
	return (
		<>
			<Joyride
				steps={TOUR_STEPS}
				styles={TOUR_STYLES}
				floaterProps={{ placement: "auto" }}
				locale={{ last: "End", skip: "Skip Tutorial" }}
				showSkipButton
				continuous
				showProgress
				disableOverlayClose
				scrollToFirstStep
				spotlightClicks
			/>
		</>
	);
};

export default JoyRideTour;
