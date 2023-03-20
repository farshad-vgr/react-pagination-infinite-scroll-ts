import { useState } from "react";
import { default as PaginationMUI } from "@mui/material/Pagination";
import { toast } from "react-toastify";

import useFetch from "../../hooks/useFetch";
import { Pagination, LoadingSpinner } from "../index";

function Products() {
	const [page, setPage] = useState(1);

	// This custom hook fetches data and makes a prefetch function for data
	const { data, isLoading, isSuccess, isError, error } = useFetch(page);

	// This function changes the page number by clicking on a button
	const pageChangeHandler = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	if (isError) {
		toast.error(`Error: Please refresh the page! ( ${error} )`, {
			position: toast.POSITION.TOP_CENTER,
		});
	}

	return (
		<>
			{isLoading ? (
				<LoadingSpinner text="Receiving Data, Please Wait..." color="orange" />
			) : isError ? (
				<>
					<iframe
						title="404 Error Robot"
						src="https://embed.lottiefiles.com/animation/139742"
						style={{ width: "100%", height: "20rem", border: "none", outline: "none", boxShadow: "none" }}></iframe>
				</>
			) : (
				isSuccess && (
					<>
						<Pagination page={page} pageChangeHandler={pageChangeHandler} />

						<ul style={{ listStyleType: "none" }}>
							{data &&
								(data as any).products.map((product: any) => {
									return (
										<div key={product.id}>
											<span>
												<b>{product.id}) </b>
											</span>
											<li style={{ display: "inline-block" }}>{product.title}</li>
										</div>
									);
								})}
						</ul>

						<PaginationMUI className="tour-pagination-mui" count={10} page={page} onChange={pageChangeHandler} variant="outlined" color="primary" />
					</>
				)
			)}
		</>
	);
}

export default Products;
