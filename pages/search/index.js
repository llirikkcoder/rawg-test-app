import { useRef } from 'react'
import { useRouter } from 'next/router'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import SearchCard from '../../components/SearchCard'
import { Oval } from 'react-loader-spinner'
import styled from 'styled-components'

const StyledSearchResults = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;

    h1 {
        width: 100%;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        padding-bottom: 1rem;
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

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        font-weight: bold;
    }

    select,
    input[type='checkbox'] {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    select {
        width: 100%;
        max-width: 200px;
    }
`

const CheckboxGroup = ({ id, options, values = [], onChange }) => {
    const handleChange = (event) => {
        const targetValue = event.target.value
        const isChecked = event.target.checked

        let newValues = [...values]

        if (isChecked) {
            newValues.push(targetValue)
        } else {
            newValues = newValues.filter((value) => value !== targetValue)
        }

        onChange(newValues)
    }

    return (
        <div>
            {options.map(({ label, value }) => (
                <label key={value}>
                    <input
                        type='checkbox'
                        id={`${id}-${value}`}
                        value={value}
                        checked={values?.includes(value)}
                        onChange={handleChange}
                    />
                    {label}
                </label>
            ))}
        </div>
    )
}

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

    const handleSortChange = (event) => {
        const newSort = event.target.value
        fetchNextPage({
            pageParam: 1,
            sort: newSort,
            platforms: router.query.platforms,
        })
    }

    const handlePlatformChange = (event) => {
        const platform = event.target?.value
        const checked = event.target?.checked

        let platforms = []
        if (checked) {
            platforms = [...router.query.platforms, platform]
        } else {
            platforms = router.query.platforms?.filter((p) => p !== platform)
        }

        fetchNextPage({
            pageParam: 1,
            sort: router.query.sort,
            platforms: platforms,
        })
    }

    if (status === 'loading')
        return (
            <LoadingContainer>
                <Oval
                    heigth='100'
                    width='100'
                    color='white'
                    ariaLabel='loading'
                />
            </LoadingContainer>
        )

    return (
        <StyledSearchResults>
            <h1>Search Results:</h1>

            <FilterContainer>
                <div>
                    <label htmlFor='sort'>Sort by:</label>
                    <select id='sort' onChange={handleSortChange}>
                        <option value='rating'>Rating</option>
                        <option value='released'>Release Date</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='platforms'>Platforms:</label>
                    <CheckboxGroup
                        id='platforms'
                        options={[
                            { label: 'PC', value: '4' },
                            { label: 'PlayStation', value: '18' },
                            { label: 'Xbox', value: '1,186' },
                            { label: 'Nintendo', value: '7,8,9,13,21' },
                        ]}
                        values={router.query.platforms}
                        onChange={handlePlatformChange}
                    />
                </div>
            </FilterContainer>

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
                ) : nextAvailable ? (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        Load more
                    </button>
                ) : (
                    <p>No more results.</p>
                )}
            </LoadMore>
        </StyledSearchResults>
    )
}

export default SearchResults
