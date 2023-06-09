import styled from 'styled-components'

const CardWrapper = styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    flex-shrink: 0;
    cursor: pointer;
`

const ImageWrapper = styled.div`
    position: relative;
    width: 20rem;
    height: 170px;

    @media (max-width: 768px) {
        width: 90vw;
    }
`

const Title = styled.h1`
    width: 100%;
    color: white;
    text-align: start;
    font-size: 1rem;
`

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
    background-color: black;
    padding: 0.5rem;
    padding-bottom: 0.75rem;
`

const Release = styled.div`
    font-size: 0.8rem;
    font-weight: 300;
    color: white;
`

const Rating = styled.div`
    font-size: 0.8rem;
    font-weight: 300;
    color: white;
`

const NoImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const NoImage = styled.h1`
    font-size: 1rem;
    color: #d1d5db;
`
export {
    CardWrapper,
    ImageWrapper,
    Title,
    DetailsWrapper,
    Release,
    Rating,
    NoImageWrapper,
    NoImage,
}