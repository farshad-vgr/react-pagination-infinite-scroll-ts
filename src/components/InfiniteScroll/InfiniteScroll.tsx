import { memo, useEffect, useRef, useCallback, CSSProperties } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";
import { Palette } from "@mui/material";

import useInfiniteFetch from "../../hooks/useInfiniteFetch";
import { LoadingSpinner } from "../index";

interface Styles {
	mainDiv: CSSProperties;
	ulElement: CSSProperties;
	ulInnerDivElement: CSSProperties;
	ulInnerSectionElement: CSSProperties;
	sectionFristSkeleton: CSSProperties;
	sectionSecondSkeleton: CSSProperties;
	iFrame: CSSProperties;
	mainListDiv: CSSProperties;
	primaryMainSpan: CSSProperties;
	primaryDelElement: CSSProperties;
	primarySmallElement: CSSProperties;
	primaryResultElement: CSSProperties;
}

interface Props {
	myColors: Palette;
}

function InfiniteScroll({ myColors }: Props) {
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

	if (isError) {
		toast.error(`Error: Please refresh the page! ( ${error} )`, {
			position: toast.POSITION.TOP_CENTER,
		});
	}

	// Styles to apply in JSX
	const styles: Styles = {
		mainDiv: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
		ulElement: { width: "100%", listStyle: "none" },
		ulInnerDivElement: {
			width: "100%",
			marginBottom: "0.5rem",
			padding: "0.25rem",
			border: "1px dashed gray",
			borderRadius: "0.5rem",
			backgroundColor: myColors.background.paper,
		},
		ulInnerSectionElement: { display: "flex", flexDirection: "column", gap: "0.125rem" },
		sectionFristSkeleton: { fontSize: "1rem", width: "10rem" },
		sectionSecondSkeleton: { fontSize: "1rem", width: "6rem" },
		iFrame: { width: "100%", height: "20rem", border: "none", outline: "none", boxShadow: "none" },
		mainListDiv: {
			marginBottom: "0.5rem",
			padding: "0.25rem",
			border: "1px dashed gray",
			borderRadius: "0.5rem",
			backgroundColor: myColors.background.paper,
		},
		primaryMainSpan: { fontStyle: "italic", fontSize: "1.25rem", color: "gray" },
		primaryDelElement: { color: "red", margin: "0 0.25rem" },
		primarySmallElement: { display: "inline-block", rotate: "180deg", textDecoration: "line-through" },
		primaryResultElement: { color: "green", margin: "0 0.25rem" },
	};

	return (
		<div style={styles.mainDiv}>
			{isLoading ? (
				<>
					<LoadingSpinner text="Loading..." color="orange" />

					<ul style={styles.ulElement}>
						{[1, 2, 3].map((item) => {
							return (
								<div key={item} style={styles.ulInnerDivElement}>
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Skeleton variant="circular" width={50} height={50} />
										</ListItemAvatar>

										<section style={styles.ulInnerSectionElement}>
											<Skeleton variant="text" sx={styles.sectionFristSkeleton} />
											<Skeleton variant="text" sx={styles.sectionSecondSkeleton} />
											<Skeleton variant="rounded" width={210} height={50} />
										</section>
									</ListItem>
								</div>
							);
						})}
					</ul>
				</>
			) : isError ? (
				<iframe title="404 Error Robot" src="https://embed.lottiefiles.com/animation/139742" style={styles.iFrame}></iframe>
			) : (
				isSuccess && (
					<>
						<List sx={{ width: "100%" }}>
							{data?.pages.map((page) =>
								page.products.map((product: any) => {
									return (
										<div key={product.id} style={styles.mainListDiv}>
											<ListItem alignItems="flex-start">
												<ListItemAvatar>
													<Avatar alt={product.title} src={product.thumbnail} />
												</ListItemAvatar>

												<ListItemText
													primary={
														<>
															{`${product.title} `}
															<span style={styles.primaryMainSpan}>
																(
																<del style={styles.primaryDelElement}>
																	{` ${product.price}`}.<small style={styles.primarySmallElement}>00</small>${" "}
																</del>
																{` OFF ${product.discountPercentage} % = `}
																<span style={styles.primaryResultElement}>
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
								<LoadingSpinner text="Please Wait.." color="orange" />
							) : (
								<h2 style={{ color: "orange" }}>No More Items!</h2>
							)}
						</div>
					</>
				)
			)}
		</div>
	);
}

export default memo(InfiniteScroll);
