import { useRef } from 'react'
import { useRouter } from 'next/router'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import SearchCard from '../../components/SearchCard'
import { Oval } from 'react-loader-spinner'
import styled from 'styled-components'

const StyledSearchResults = styled.div`
    padding: 0 5rem;

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
        padding-bottom: 1rem;
    }

    .results-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 2rem;

        @media (min-width: 768px) {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
    }
`
const LoadMore = styled.div`
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3rem 0;

    button {
        border: none;
        outline: none;
        cursor: pointer;
        background-color: #383838;
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        transition: all 0.2s ease-in-out;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        &:not(:disabled):active {
            transform: scale(0.9);
        }
    }
`

const LoadingContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ResultsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;

    @media (min-width: 230px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
}
`

const SearchResults = () => {
    const router = useRouter()
    const searchQuery = router?.query.s

    const resultsRef = useRef()

    const fetchSearchResult = async (page = 1) => {
        const { data } = await axios.get(
            `https://api.rawg.io/api/games?key=45e1c238c7b94f64838405bc02573d2a&page=${page}&search=${searchQuery}&search_precise=true`
        )
        return { data, nextPage: page + 1 }
    }

    const { data, fetchNextPage, isFetchingNextPage, status } =
        useInfiniteQuery(
            ['games', searchQuery],
            ({ pageParam = 1 }) => fetchSearchResult(pageParam),
            {
                getNextPageParam: (lastPage, pages) => lastPage.nextPage,
            }
        )
    const nextAvailable = data?.pages?.map((data) => data.data.next)[0]

    if (status === 'loading')
        return (
            <LoadingContainer>
                <Oval
                    heigth='100'
                    width='100'
                    color='grey'
                    ariaLabel='loading'
                />
            </LoadingContainer>
        )

    return (
        <StyledSearchResults>
            <h1>Search Results:</h1>

            <ResultsGrid ref={resultsRef}>
                {data?.pages?.map((data) =>
                    data?.data?.results?.map((game) => (
                        <SearchCard key={game?.id} game={game} />
                    ))
                )}
            </ResultsGrid>

            <LoadMore>
                {isFetchingNextPage ? (
                    <Oval
                        height='100'
                        width='100'
                        color='grey'
                        ariaLabel='loading'
                    />
                ) : (
                    <button onClick={fetchNextPage} disabled={!nextAvailable}>
                        {nextAvailable === null ? 'Nothing' : 'Load More'}
                    </button>
                )}
            </LoadMore>
        </StyledSearchResults>
    )
}

export default SearchResults
