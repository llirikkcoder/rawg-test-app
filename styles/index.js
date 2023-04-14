import styled from 'styled-components'

export const StyledSearchResults = styled.div`
    padding: 0 1rem;

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
    }
`

export const ResultsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;

    @media (min-width: 230px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
}`

export const LoadMore = styled.div`
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

export const StyledSearchContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 1rem;

    div {
        padding-right: 1rem;
    }

    button {
        background-color: transparent;
        color: white;
        border: 1px solid white;
        border-radius: 0.25rem;
        margin: 0.2rem;
        padding: 0.2rem 0.5rem;
    }

    @media (max-width: 767px) {
        // flex-direction: column;
        // align-items: center;
        div {
            padding-right: 0;
            // padding-bottom: 1rem;
        }
    }
`

export const LoadingContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

// GameDetails styles

export const GameDetailsWrapper = styled.div`
    height: 100%;
    max-width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: 0 1.25rem;
    @media (min-width: 768px) {
        padding: 0 1.875rem;
    }
`

export const BackLink = styled.a`
    display: inline-block;
    margin-bottom: 2rem;
    color: white;
    font-size: 1.4rem;
`

export const CenteredWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 0.25rem;
    @media (min-width: 768px) {
        border-radius: 0.375rem;
        max-width: 90%;
    }
`

export const GameName = styled.h1`
    color: #d1d5db;
    font-weight: bold;
    font-size: 1.5rem;
    paddig: 2rem 0 0;

    @media (min-width: 768px) {
        font-size: 1.875rem;
    }
`

export const GameDetailsHeader = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: #d1d5db;
    font-weight: 300;
    padding-top: 1.25rem;

    @media (min-width: 768px) {
        font-size: 1.125rem;
        padding-top: 1.875rem;
        padding-bottom: 1.875rem;
    }
`

export const GameDescription = styled.div`
    color: #c5c5c5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: start;
    max-width: 80vw;
    font-size: 0.75rem;
    line-height: 1.25rem;
    padding-bottom: 1.25rem;

    @media (min-width: 768px) {
        font-size: 1rem;
        line-height: 1.5rem;
    }
    div {
        width: 100%;
    }
`

export const NoImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

export const NoImage = styled.h1`
    font-size: 1rem;
    color: #d1d5db;
`
