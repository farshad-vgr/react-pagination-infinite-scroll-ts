import { memo, CSSProperties } from "react";

import { PaginationButton } from "../index";

interface Styles {
	sectionElement: CSSProperties;
}

interface Props {
	page: number;
	pageChangeHandler: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function Pagination({ page = 1, pageChangeHandler }: Props) {
	// Styles to apply in JSX
	const styles: Styles = {
		sectionElement: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			padding: "0.25rem 0.25rem",
			width: "35%",
			borderRadius: "0.25rem",
		},
	};

	return (
		<>
			<section
				className="tour-pagination"
				style={styles.sectionElement}>
				<PaginationButton
					btnText="Prev Page"
					btnHoverText="First Page !"
					isDisable={page === 1 ? true : false}
					onClick={(event: React.ChangeEvent<unknown>) => pageChangeHandler(event, page - 1)}
				/>

				<span>
					<b>( {page} / 10 )</b>
				</span>

				<PaginationButton
					btnText="Next Page"
					btnHoverText="Last Page !"
					isDisable={page === 10 ? true : false}
					onClick={(event: React.ChangeEvent<unknown>) => pageChangeHandler(event, page + 1)}
				/>
			</section>
		</>
	);
}

export default memo(Pagination);
