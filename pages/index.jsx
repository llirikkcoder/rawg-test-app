import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import styled from 'styled-components'
import SearchCard from '../components/SearchCard'
import PlatformFilter from '../components/PlatformFilter'
import { useInView } from 'react-intersection-observer'

const StyledSearchResults = styled.div`
    padding: 0 1rem;

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
    }
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

const StyledSearchContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 1rem;

    button {
        cursor: pointer;
        background-color: transparent;
        color: white;
        border: 1px solid white;
        border-radius: 0.25rem;
        margin: 0.2rem;
        padding: 0.2rem 0.5rem;

        &.selected {
            background-color: gray;
        }

        border-color: ${(props) => (props.active ? 'red' : 'white')};
    }

    div {
        padding-right: 0.5rem;
    }
`

const LoadingContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Home = () => {
    const router = useRouter()
    const searchQuery = router?.query.s

    const resultsRef = useRef()
    const { ref, inView } = useInView({ threshold: 1 })

    const [ratingSorting, setRatingSorting] = useState('none')
    const [dateSorting, setDateSorting] = useState('none')
    const [combinedData, setCombinedData] = useState([])
    const [platformFilters, setPlatformFilters] = useState([])

    const handlePlatformFilter = (selectedPlatforms) => {
        setPlatformFilters(selectedPlatforms)
    }

    const fetchSearchResult = async (page = 1, platforms = [], search = '') => {
        const platformParams = platforms
            .map((id) => `platforms=${id}`)
            .join('&')
        const searchParam = search ? `&search=${search}` : ''
        const { data } = await axios.get(
            `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=${page}&${platformParams}${searchParam}`
        )
        return { data, nextPage: page + 1 }
    }

    const {
        data: queryData,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(
        ['games', searchQuery],
        ({ pageParam = 1 }) => fetchSearchResult(pageParam),
        {
            getNextPageParam: (lastPage, pages) => lastPage.nextPage,
        }
    )
    const nextAvailable = queryData?.pages?.map((data) => data.data.next)[0]

    useEffect(() => {
        if (inView && !isFetchingNextPage && nextAvailable) {
            fetchNextPage()
        }
    }, [inView, isFetchingNextPage, nextAvailable, fetchNextPage])

    useEffect(() => {
        if (!queryData || !Array.isArray(queryData.pages)) return

        let combinedData = queryData.pages
            .map((data) => data.data.results)
            .flat()

        if (ratingSorting === 'asc') {
            combinedData = combinedData.sort((a, b) => a.rating - b.rating)
        } else if (ratingSorting === 'desc') {
            combinedData = combinedData.sort((a, b) => b.rating - a.rating)
        }

        if (dateSorting === 'asc') {
            combinedData = combinedData.sort(
                (a, b) => new Date(a.released) - new Date(b.released)
            )
        } else if (dateSorting === 'desc') {
            combinedData = combinedData.sort(
                (a, b) => new Date(b.released) - new Date(a.released)
            )
        }

        if (platformFilters.length > 0) {
            combinedData = combinedData.filter((game) =>
                game.platforms.some((platform) =>
                    platformFilters.includes(platform.platform.id)
                )
            )
        }

        setCombinedData(combinedData)
    }, [queryData, ratingSorting, dateSorting, platformFilters])

    // const displayedGames = queryData ? queryData.pages.flat() : []

    if (status === 'loading')
        return (
            <LoadingContainer>
                <Oval
                    height={80}
                    width={80}
                    color='white'
                    wrapperStyle={{}}
                    wrapperClass=''
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor='black'
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </LoadingContainer>
        )

    return (
        <StyledSearchResults>
            <StyledSearchContainer>
                <div>Sort by:</div>
                <button
                    onClick={() => {
                        setRatingSorting('none')
                        setDateSorting('none')
                    }}
                    disabled={
                        ratingSorting === 'none' && dateSorting === 'none'
                    }
                    style={{
                        backgroundColor:
                            ratingSorting === 'none' && dateSorting === 'none'
                                ? 'gray'
                                : 'transparent',
                    }}
                >
                    None
                </button>
                <button
                    onClick={() => {
                        setRatingSorting('asc')
                        setDateSorting('none')
                    }}
                    disabled={ratingSorting === 'asc' && dateSorting === 'none'}
                    style={{
                        backgroundColor:
                            ratingSorting === 'asc' && dateSorting === 'none'
                                ? 'gray'
                                : 'transparent',
                    }}
                >
                    Rating (Ascending)
                </button>
                <button
                    onClick={() => {
                        setRatingSorting('desc')
                        setDateSorting('none')
                    }}
                    disabled={
                        ratingSorting === 'desc' && dateSorting === 'none'
                    }
                    style={{
                        backgroundColor:
                            ratingSorting === 'desc' && dateSorting === 'none'
                                ? 'gray'
                                : 'transparent',
                    }}
                >
                    Rating (Descending)
                </button>
                <button
                    onClick={() => {
                        setDateSorting('asc')
                        setRatingSorting('none')
                    }}
                    disabled={dateSorting === 'asc' && ratingSorting === 'none'}
                    style={{
                        backgroundColor:
                            dateSorting === 'asc' && ratingSorting === 'none'
                                ? 'gray'
                                : 'transparent',
                    }}
                >
                    Release Date (Ascending)
                </button>
                <button
                    onClick={() => {
                        setDateSorting('desc')
                        setRatingSorting('none')
                    }}
                    disabled={
                        dateSorting === 'desc' && ratingSorting === 'none'
                    }
                    style={{
                        backgroundColor:
                            dateSorting === 'desc' && ratingSorting === 'none'
                                ? 'gray'
                                : 'transparent',
                    }}
                >
                    Release Date (Descending)
                </button>
            </StyledSearchContainer>

            <PlatformFilter onFilterChange={handlePlatformFilter} />

            <ResultsGrid ref={resultsRef}>
                {combinedData?.map((game) => (
                    <SearchCard key={game?.id} game={game} />
                ))}
            </ResultsGrid>

            <LoadMore ref={ref}>
                {isFetchingNextPage ? (
                    <Oval
                        height='100'
                        width='100'
                        color='grey'
                        ariaLabel='loading'
                    />
                ) : (
                    nextAvailable && (
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={!nextAvailable}
                        >
                            Load More
                        </button>
                    )
                )}
            </LoadMore>
        </StyledSearchResults>
    )
}

export default Home
