import axios from 'axios'
import GameDetails from '../../../components/GameDetails'
import styled from 'styled-components'

const StyledContainer = styled.div`
    overflow-x: hidden;
`

const Details = ({ gameDetail, screenShot }) => {
    return (
        <StyledContainer>
            <GameDetails game={gameDetail} screenShot={screenShot} />
        </StyledContainer>
    )
}

export default Details

export const getServerSideProps = async ({ params }) => {
    const clickedId = params.slug
    const { data: gameDetail } = await axios.get(
        `https://api.rawg.io/api/games/${clickedId}?key=45e1c238c7b94f64838405bc02573d2a`
    )
    const { data: screenShot } = await axios.get(
        `https://api.rawg.io/api/games/${clickedId}/screenshots?key=45e1c238c7b94f64838405bc02573d2a`
    )

    return {
        props: {
            gameDetail,
            screenShot,
        },
    }
}
