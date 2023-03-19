import { memo } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
	btnText: string;
	btnHoverText: string;
	isDisable: boolean;
	onClick: (event: React.ChangeEvent<unknown>) => void;
}

function PaginationButton({ btnText, btnHoverText, isDisable, onClick }: Props) {
	return (
		<>
			<Button
				onClick={onClick}
				disabled={isDisable}
				variant="outlined"
				className="tour-button"
				sx={{
					padding: 0,
					border: "1px solid rgba(25, 118, 210, 0.5)",
					backgroundColor: "rgba(25, 118, 210, 0.12)",
					"&.Mui-disabled": { pointerEvents: "all" },
				}}>
				<Tooltip title={isDisable ? btnHoverText : ""}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
							padding: "0 1rem",
							height: "2.125rem",
							cursor: isDisable ? "not-allowed" : "pointer",
						}}>
						{btnText === "Prev Page" && <ArrowForwardIosIcon sx={{ mr: "0.5rem", width: "1rem", height: "1rem", rotate: "180deg" }} />}
						{btnText}
						{btnText === "Next Page" && <ArrowForwardIosIcon sx={{ ml: "0.5rem", width: "1rem", height: "1rem" }} />}
					</div>
				</Tooltip>
			</Button>
		</>
	);
}

export default memo(PaginationButton);
