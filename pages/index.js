import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import styled from 'styled-components'
import SearchCard from './../components/SearchCard'
import PlatformFilter from '../components/PlatformFilter'

const StyledSearchResults = styled.div`
    padding: 0 5rem;

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
    justify-content: center;
    padding-bottom: 2rem;

    div {
        padding-right: 1rem;
    }

    button {
        background-color: transparent;
        color: white;
        border: 1px solid white;
        border-radius: 0.25rem;
        margin: 0.2rem;
    }

    @media (max-width: 767px) {
        flex-direction: column;
        align-items: center;
        div {
            padding-right: 0;
            padding-bottom: 1rem;
        }
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

    const [sorting, setSorting] = useState('none')
    const [dateSorting, setDateSorting] = useState('none')
    const [combinedData, setCombinedData] = useState([])
    const [platformFilters, setPlatformFilters] = useState([])

    let currentPage = 1

    const handlePlatformFilter = (selectedPlatforms) => {
        setPlatformFilters(selectedPlatforms)
        fetchSearchResult(currentPage, selectedPlatforms)
            .then((results) => {
                // Обновление состояния с новыми результатами поиска
                setCombinedData(results)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const fetchSearchResult = async (page = 1, platforms = [], search = '') => {
        const platformParams = platforms
            .map((id) => `platforms=${id}`)
            .join('&')
        const searchParam = search ? `&search=${search}` : ''
        const { data } = await axios.get(
            `https://api.rawg.io/api/games?key=45e1c238c7b94f64838405bc02573d2a&page=${page}&${platformParams}${searchParam}`
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
        if (!queryData || !Array.isArray(queryData.pages)) return

        let combinedData = queryData.pages
            .map((data) => data.data.results)
            .flat()

        if (sorting === 'asc') {
            combinedData = combinedData.sort((a, b) => a.rating - b.rating)
        } else if (sorting === 'desc') {
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

        setCombinedData(combinedData)
    }, [queryData, sorting, dateSorting])

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
            <StyledSearchContainer>
                <div>Sort by:</div>
                <button
                    onClick={() => {
                        setSorting('none')
                        setDateSorting('none')
                    }}
                    disabled={sorting === 'none' && dateSorting === 'none'}
                >
                    None
                </button>
                <button
                    onClick={() => {
                        setSorting('asc')
                        setDateSorting('none')
                    }}
                    disabled={sorting === 'asc' && dateSorting === 'none'}
                >
                    Rating (Ascending)
                </button>
                <button
                    onClick={() => {
                        setSorting('desc')
                        setDateSorting('none')
                    }}
                    disabled={sorting === 'desc' && dateSorting === 'none'}
                >
                    Rating (Descending)
                </button>
                <button
                    onClick={() => {
                        setDateSorting('asc')
                        setSorting('none')
                    }}
                    disabled={dateSorting === 'asc' && sorting === 'none'}
                >
                    Release Date (Ascending)
                </button>
                <button
                    onClick={() => {
                        setDateSorting('desc')
                        setSorting('none')
                    }}
                    disabled={dateSorting === 'desc' && sorting === 'none'}
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

            <LoadMore>
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
