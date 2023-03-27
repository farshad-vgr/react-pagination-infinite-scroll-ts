import { CSSProperties, Fragment, memo, useEffect, useState } from "react";
import { default as PaginationMUI } from "@mui/material/Pagination";
import { Palette } from "@mui/material";
import { DragDropContext, Droppable, Draggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { toast } from "react-toastify";

import useFetch from "../../hooks/useFetch";
import { Pagination, LoadingSpinner } from "../index";

type reorderFn = (
	list: { id: string; title: string }[] | null | undefined,
	startIndex: number,
	endIndex: number,
) => { id: string; title: string }[] | null | undefined;

// This function helps reorder the items to new positions
const reorder: reorderFn = (list, startIndex, endIndex) => {
	if (list) {
		const result = Array.from(list);

		const [removed] = result.splice(startIndex, 1);

		result.splice(endIndex, 0, removed);

		return result;
	}
};

interface Styles {
	iFrame: CSSProperties;
}

interface Props {
	myColors: Palette;
}

function DraggableList({ myColors }: Props) {
	const [page, setPage] = useState(1);

	// This custom hook fetches data and makes a prefetch function for data
	const { data, isLoading, isSuccess, isError, error } = useFetch(page);

	const [items, setItems] = useState<{ id: string; title: string }[] | null | undefined>(null);

	// Set data at the first render and when data changed
	useEffect(() => {
		if (data) {
			setItems(data.products);
		}
	}, [data]);

	// This function changes the page number by clicking on a button
	const pageChangeHandler = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	// When the user drags items this function will be called
	const onDragEnd = (result: any) => {
		// At first check if item dropped outside the list or not
		if (!result.destination) {
			return;
		}

		// Building a new order of items for the list
		const newOrder = reorder(items, result.source.index, result.destination.index);

		// Setting new order of items to render a new list
		setItems(newOrder);
	};

	type getItemStyleFn = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => CSSProperties | undefined;
	const getItemStyle: getItemStyleFn = (isDragging, draggableStyle) => ({
		margin: "0 0 0.5rem 0",
		padding: "0.25rem 0.5rem",
		border: "1px dashed black",
		borderRadius: "0.5rem",
		userSelect: "none",

		// Change the item background color while dragging
		background: isDragging ? "#1565C088" : "#b3b3b388",

		...draggableStyle,

		opacity: isDragging ? "0.75" : "1",
	});

	type getListStyleFn = (isDraggingOver: boolean) => CSSProperties | undefined;
	const getListStyle: getListStyleFn = (isDraggingOver) => ({
		margin: "0.5rem 0",
		padding: "0.5rem 1rem",
		width: "max-content",
		borderRadius: "0.5rem",
		background: isDraggingOver ? "#7cade255" : myColors.background.paper,
	});

	if (isError) {
		toast.error(`Error: Please refresh the page! ( ${error} )`, {
			position: toast.POSITION.TOP_CENTER,
		});
	}

	// Styles to apply in JSX
	const styles: Styles = {
		iFrame: { width: "100%", height: "20rem", border: "none", outline: "none", boxShadow: "none" },
	};

	return (
		<>
			{isLoading ? (
				<LoadingSpinner text="Receiving Data, Please Wait..." color="orange" />
			) : isError ? (
				<iframe title="404 Error Robot" src="https://embed.lottiefiles.com/animation/139742" style={styles.iFrame}></iframe>
			) : (
				isSuccess && (
					<>
						<Pagination page={page} pageChangeHandler={pageChangeHandler} />

						<div className="tour-pagination-list">
							<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId="droppable">
									{(provided, snapshot) => (
										<div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
											{items?.map((item: any, index: number) => (
												<Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
															<span>
																<b>{index + 1}) </b>
															</span>
															{`${item.title} ( item ${item.id} / 100 )`}
														</div>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						</div>

						<PaginationMUI className="tour-pagination-mui" count={10} page={page} onChange={pageChangeHandler} variant="outlined" color="primary" />
					</>
				)
			)}
		</>
	);
}

export default memo(DraggableList);
