import { memo } from "react";

import "./LoadingSpinner.css";

interface Props {
  text: string;
  color: string;
}

function LoadingSpinner({ text, color }: Props) {
  return (
		<section style={{ textAlign: "center" }}>
			<h2 style={{ color: color }}>{text}</h2>
			<div className="lds-ellipsis">
				<div style={{ backgroundColor: color }}></div>
				<div style={{ backgroundColor: color }}></div>
				<div style={{ backgroundColor: color }}></div>
				<div style={{ backgroundColor: color }}></div>
			</div>
		</section>
	);
}

export default memo(LoadingSpinner);