import { memo, CSSProperties } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Styles {
	buttonMUI: CSSProperties;
	tooltipMUI: CSSProperties;
	prevButton: CSSProperties;
	nextButton: CSSProperties;
}

interface Props {
	btnText: string;
	btnHoverText: string;
	isDisable: boolean;
	onClick: (event: React.ChangeEvent<unknown>) => void;
}

function PaginationButton({ btnText, btnHoverText, isDisable, onClick }: Props) {
	// Styles to apply in JSX
	const styles: Styles = {
		buttonMUI: {
			padding: 0,
			border: "1px solid rgba(25, 118, 210, 0.5)",
			backgroundColor: "rgba(25, 118, 210, 0.12)",
		},
		tooltipMUI: {
			display: "flex",
			justifyContent: "space-evenly",
			alignItems: "center",
			padding: "0 1rem",
			height: "2.125rem",
			cursor: isDisable ? "not-allowed" : "pointer",
		},
		prevButton: { marginRight: "0.5rem", width: "1rem", height: "1rem", rotate: "180deg" },
		nextButton: { marginRight: "0.5rem", width: "1rem", height: "1rem" },
	};

	return (
		<>
			<Button
				onClick={onClick}
				disabled={isDisable}
				variant="outlined"
				className="tour-button"
				sx={{
					...styles.buttonMUI,
					"&.Mui-disabled": { pointerEvents: "all" },
				}}>
				<Tooltip title={isDisable ? btnHoverText : ""}>
					<div style={styles.tooltipMUI}>
						{btnText === "Prev Page" && <ArrowForwardIosIcon sx={styles.prevButton} />}
						{btnText}
						{btnText === "Next Page" && <ArrowForwardIosIcon sx={styles.nextButton} />}
					</div>
				</Tooltip>
			</Button>
		</>
	);
}

export default memo(PaginationButton);
