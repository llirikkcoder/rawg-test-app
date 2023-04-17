import { useRef, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import styled from 'styled-components'
import GameCard from '../components/GameCard'
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

const Sorting = ({ ratingSorting, dateSorting, onRatingSort, onDateSort }) => {
    return (
        <div>
            <label>
                Сортировка по рейтингу:
                <select value={ratingSorting} onChange={onRatingSort}>
                    <option value='none'>Нет</option>
                    <option value='asc'>По возрастанию</option>
                    <option value='desc'>По убыванию</option>
                </select>
            </label>

            <label>
                Сортировка по дате:
                <select value={dateSorting} onChange={onDateSort}>
                    <option value='none'>Нет</option>
                    <option value='asc'>По возрастанию</option>
                    <option value='desc'>По убыванию</option>
                </select>
            </label>
        </div>
    )
}

const Home = () => {
    const router = useRouter()
    const searchQuery = router?.query.s

    const resultsRef = useRef()
    const { ref, inView } = useInView({ threshold: 1 })

    const [ratingSorting, setRatingSorting] = useState('none')
    const [dateSorting, setDateSorting] = useState('none')
    const [platformFilters, setPlatformFilters] = useState([])
    const [platformFilter, setPlatformFilter] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const [page, setPage] = useState(1)

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
        data: searchData,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ['games', searchQuery, ratingSorting, dateSorting, platformFilters],
        ({ pageParam = 1 }) =>
            fetchSearchResult(pageParam, platformFilters, searchQuery),
        {
            getNextPageParam: (lastPage, pages) =>
                lastPage.nextPage <= 15 ? lastPage.nextPage : false,
        }
    )

    const handleLoadMore = () => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
        }
    }

    const gamesData = searchData?.pages?.map((data) => data.data.results).flat()

    const filteredData = useMemo(() => {
        if (!gamesData || gamesData.length === 0) return []

        let filtered = [...gamesData]

        if (platformFilter) {
            filtered = filtered.filter((game) =>
                game.platforms.includes(platformFilter)
            )
        }

        if (searchTerm) {
            filtered = filtered.filter((game) =>
                game.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        return filtered
    }, [gamesData, platformFilter, searchTerm])

    useEffect(() => {
        if (inView && !isFetching && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, isFetching, fetchNextPage, hasNextPage])

    const handleRatingSort = (event) => {
        setRatingSorting(event.target.value)
    }

    const handleDateSort = (event) => {
        setDateSorting(event.target.value)
    }

    return (
        <StyledSearchResults>
            <StyledSearchContainer>
                <Sorting
                    ratingSorting={ratingSorting}
                    dateSorting={dateSorting}
                    onRatingSort={handleRatingSort}
                    onDateSort={handleDateSort}
                />

                <PlatformFilter onFilterChange={handlePlatformFilter} />
                <ResultsGrid ref={resultsRef}>
                    {filteredData?.map((game) => (
                        <GameCard key={game?.id} game={game} />
                    ))}
                </ResultsGrid>

                {hasNextPage && (
                    <div ref={ref}>
                        <button
                            onClick={handleLoadMore}
                            disabled={isFetchingNextPage}
                        >
                            {isFetchingNextPage
                                ? 'Loading more...'
                                : 'Load More'}
                        </button>
                    </div>
                )}
            </StyledSearchContainer>
        </StyledSearchResults>
    )
}

export default Home
