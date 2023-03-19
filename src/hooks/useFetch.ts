import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";

async function fetchHandler(num: number) {
	const response = await fetch(`https://dummyjson.com/products?skip=${(num - 1) * 10}&limit=10`);
	return response.json();
}

// This function takes the current page number and then fetches the next page's data
	const prefetchData = (currentPage: number) => {
		queryClient.prefetchQuery({
			queryKey: ["page", currentPage + 1],
			queryFn: () => fetchHandler(currentPage + 1),
		});
	};

function useFetch(page: number) {
	const { data, isLoading, isSuccess, isError, error } = useQuery({
		queryKey: ["page", page],
		queryFn: () => fetchHandler(page),
		onSuccess: () => prefetchData(page), // This function will be call when fetching was successfully
	});

	return { data, isLoading, isSuccess, isError, error };
}

export default useFetch;
