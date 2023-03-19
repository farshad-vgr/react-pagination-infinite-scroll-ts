import { useInfiniteQuery } from "@tanstack/react-query";

// This function fetches data asynchronously
	const dataFetcher = async (num: number) => {
		const response = await fetch(`https://dummyjson.com/products?skip=${(num - 1) * 10}&limit=10`);
		return response.json();
	};

function useInfiniteFetch() {
	// Using the ReactQuery library to manage data fetching event
	const { data, isLoading, isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
		["infinite_data"],
		({ pageParam = 1 }) => dataFetcher(pageParam),
		{
			getNextPageParam: (_lastPage: any, allPages: any) => {
				return allPages.length + 1;
			},
		},
	);

	return { data, isLoading, isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage };
}

export default useInfiniteFetch;
