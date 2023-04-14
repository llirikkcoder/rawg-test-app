import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { RiSearchLine } from 'react-icons/ri'

const SearchContainer = styled.form`
    background-color: #c4c4c4;
    display: flex;
    border-radius: 9999px;
    flex-grow: 0.55;
    margin-right: 0.5rem;
`

const SearchInput = styled.input`
    color: black;
    outline: none;
    background-color: white;
    border-radius: 9999px;
    padding: 0.5rem;
    font-size: 0.875rem;
    text-align: left;
    flex-grow: 1;
    opacity: 0;
    &:focus {
        opacity: 1;
    }
`

const ButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    background-color: transparent;
    border: 0px solid black;
`

const SearchForm = () => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const searchQuery = router.query.s

    const handleSearch = (e) => {
        e.preventDefault()
        router.push({ pathname: 'search', query: { s: search } })
        setSearch('')
    }

    return (
        <>
            <SearchContainer id='search-form' onSubmit={(e) => handleSearch(e)}>
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type='text'
                    placeholder={
                        searchQuery ? searchQuery : 'Search a sheesh game'
                    }
                />
            </SearchContainer>
            <ButtonWrapper type='submit' title='Search' form='search-form'>
                <RiSearchLine />
            </ButtonWrapper>
        </>
    )
}

export default SearchForm
