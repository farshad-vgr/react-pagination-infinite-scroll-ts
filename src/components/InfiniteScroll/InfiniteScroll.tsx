import { useEffect, useRef, useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import useInfiniteFetch from "../../hooks/useInfiniteFetch";

function InfiniteScroll() {
	const observedElement = useRef(null); // Selecting an element from the bottom of the list(usually a Loading component)

	// This custom hook handles infinite scroll fetch data
	const { data, isLoading, isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteFetch();

	// This function handles action when the last element enter the page
	const obseverHandler = useCallback(
		([targetElement]: any) => {
			if (targetElement.isIntersecting) {
				fetchNextPage(); // Calling this method when the last element enter the page
			}
		},
		[fetchNextPage],
	);

	// Set an observer to an element at the first render
	useEffect(() => {
		const element = observedElement.current; // Last element of the list

		if (element) {
			const observer = new IntersectionObserver(obseverHandler); // Making a new observer

			observer.observe(element); // Giving an element to the observer

			return () => observer.unobserve(element); // Removing the observer at the end of each render to avoid a memory leak
		}
	}, [fetchNextPage, hasNextPage, obseverHandler]);

	return (
		<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
			{isLoading ? (
				<>
					<h2 style={{ color: "orange" }}>Loading...</h2>
					<ul style={{ width: "100%", listStyle: "none" }}>
						{[1, 2, 3].map((item) => {
							return (
								<div
									key={item}
									style={{ width: "100%", marginBottom: "0.5rem", padding: "0.25rem", border: "1px dashed gray", borderRadius: "0.5rem" }}>
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Skeleton variant="circular" width={50} height={50} />
										</ListItemAvatar>

										<section style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
											<Skeleton variant="text" sx={{ fontSize: "1rem", width: "10rem" }} />
											<Skeleton variant="text" sx={{ fontSize: "1rem", width: "6rem" }} />
											<Skeleton variant="rounded" width={210} height={50} />
										</section>
									</ListItem>
								</div>
							);
						})}
					</ul>
				</>
			) : isError ? (
				<>
					<h2 style={{ color: "red" }}>{`Error: Please refresh the page! ( ${error} )`}</h2>
					<iframe
						title="404 Error Robot"
						src="https://embed.lottiefiles.com/animation/139742"
						style={{ width: "100%", height: "20rem", border: "none", outline: "none", boxShadow: "none" }}></iframe>
				</>
			) : (
				isSuccess && (
					<>
						<List sx={{ width: "100%" }}>
							{data?.pages.map((page) =>
								page.products.map((product: any) => {
									return (
										<div key={product.id} style={{ marginBottom: "0.5rem", padding: "0.25rem", border: "1px dashed gray", borderRadius: "0.5rem" }}>
											<ListItem alignItems="flex-start">
												<ListItemAvatar>
													<Avatar alt={product.title} src={product.thumbnail} />
												</ListItemAvatar>

												<ListItemText
													primary={
														<>
															{`${product.title} `}
															<span style={{ fontStyle: "italic", fontSize: "1.25rem", color: "gray" }}>
																(
																<del style={{ color: "red", margin: "0 0.25rem" }}>
																	{` ${product.price}`}.
																	<small style={{ display: "inline-block", rotate: "180deg", textDecoration: "line-through" }}>00</small>${" "}
																</del>
																{` OFF ${product.discountPercentage} % = `}
																<span style={{ color: "green", margin: "0 0.25rem" }}>
																	{Math.round(product.price - (product.price / 100) * product.discountPercentage)}.<small>00</small> $
																</span>
																)
															</span>
														</>
													}
													secondary={
														<>
															<Typography sx={{ display: "block" }} component="span" variant="body2" color="text.primary">
																<b>Brand:</b> {product.brand}
															</Typography>

															<Typography sx={{ display: "block" }} component="span" variant="body2" color="text.primary">
																<b>Category:</b> {product.category.toString().toUpperCase()}
															</Typography>

															<Typography sx={{ display: "block" }} component="span" variant="body2" color="text.primary">
																<b>Description:</b> {product.description}
															</Typography>
														</>
													}
												/>
											</ListItem>
										</div>
									);
								}),
							)}
						</List>
						<div ref={observedElement}>
							{isFetchingNextPage && hasNextPage ? (
								<h2 style={{ color: "orange" }}>"Please Wait..."</h2>
							) : (
								<h2 style={{ color: "orange" }}>"No More Items !"</h2>
							)}
						</div>
					</>
				)
			)}
		</div>
	);
}

export default InfiniteScroll;
