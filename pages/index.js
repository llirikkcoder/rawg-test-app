import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import SearchCard from './../components/SearchCard'
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

    .load-more {
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
    }
`

const LoadingContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SortGamesWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`

const Button = styled.button`
    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid white;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: white;

    &:hover {
        background-color: black;
    }
`

const Home = () => {
    const router = useRouter()
    const searchQuery = router?.query.s

    const resultsRef = useRef()

    const [sortByRating, setSortByRating] = useState('none')
    const [sortByReleased, setSortByReleased] = useState('none')
    // const [data, setData] = useState(null)

    // const handleSetData = (newData) => {
    //     setData(newData);
    // };

    // const handleSortByRating = () => {
    //     setSortByReleased('none')
    //     if (sortByRating === 'none') {
    //         setSortByRating('ascending')
    //     } else if (sortByRating === 'ascending') {
    //         setSortByRating('descending')
    //     } else {
    //         setSortByRating('ascending')
    //     }
    // }

    const handleSortByRating = () => {
        setSortByReleased('none')
        if (sortByRating === 'none') {
            // Сортировка результатов по возрастанию рейтинга
            setData((prevData) => {
                const newData = prevData.map((page) => {
                    const sortedResults = page.data.results.sort(
                        (a, b) => a.rating - b.rating
                    )
                    return {
                        ...page,
                        data: { ...page.data, results: sortedResults },
                    }
                })
                return [...newData]
            })
            setSortByRating('ascending')
        } else if (sortByRating === 'ascending') {
            // Сортировка результатов по убыванию рейтинга
            setData((prevData) => {
                const newData = prevData.map((page) => {
                    const sortedResults = page.data.results.sort(
                        (a, b) => b.rating - a.rating
                    )
                    return {
                        ...page,
                        data: { ...page.data, results: sortedResults },
                    }
                })
                return [...newData]
            })
            setSortByRating('descending')
        } else {
            // Сброс сортировки
            setData((prevData) => [...prevDataCopy])
            setSortByRating('none')
        }
    }

    const handleSortByReleased = () => {
        setSortByRating('none')
        if (sortByReleased === 'none') {
            setSortByReleased('asc')
        } else if (sortByReleased === 'asc') {
            setSortByReleased('desc')
        } else {
            setSortByReleased('asc')
        }
    }

    const fetchSearchResult = async (page = 1) => {
        const { data } = await axios.get(
            `https://api.rawg.io/api/games?key=23096131fca44f378b2ba7d779ad1705&page=${page}&search_precise=true`
        )
        return { data, nextPage: page + 1 }
    }

    // data,
    const { data, fetchNextPage, isFetchingNextPage, status } =
        useInfiniteQuery(
            ['games', searchQuery],
            ({ pageParam = 1 }) => fetchSearchResult(pageParam),
            {
                getNextPageParam: (lastPage, pages) => lastPage.nextPage,
                // onSuccess: (data) => setData(data.pages),
            }
        )
    const nextAvailable = data?.pages?.map((data) => data.data.next)[0]
    console.log('🚀 ~ file: index.js:180 ~ Home ~ data:', data)

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
            <div>
                <SortGamesWrapper>
                    <Button onClick={handleSortByRating}>
                        {sortByRating === 'none'
                            ? 'Sort by rating'
                            : sortByRating === 'ascending'
                            ? 'Sorted by ascent rating'
                            : 'Sorted by descent rating'}
                    </Button>
                    <Button onClick={handleSortByReleased}>
                        {sortByReleased === 'none'
                            ? 'Sort by released'
                            : sortByReleased === 'asc'
                            ? 'Sort by oldest release'
                            : 'Sort by latest release'}
                    </Button>
                </SortGamesWrapper>
            </div>
            <div ref={resultsRef} className='results-grid'>
                {data?.pages?.map((data) =>
                    data?.data?.results?.map((game) => (
                        <SearchCard key={game?.id} game={game} />
                    ))
                )}
            </div>

            <div className='load-more'>
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
            </div>
        </StyledSearchResults>
    )
}

export default Home
