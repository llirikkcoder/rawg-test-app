import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import GameScreenShots from './GameScreenShots'

const GameDetailsWrapper = styled.div`
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

const BackLink = styled.a`
    display: inline-block;
    margin-bottom: 2rem;
    color: white;
    font-size: 1.4rem;
`

const CenteredWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 0.25rem;
    @media (min-width: 768px) {
        border-radius: 0.375rem;
        max-width: 90%;
    }
`

const GameName = styled.h1`
    color: #d1d5db;
    font-weight: bold;
    font-size: 1.5rem;
    paddig: 2rem 0 0;

    @media (min-width: 768px) {
        font-size: 1.875rem;
    }
`

const GameDetailsHeader = styled.div`
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

const GameDescription = styled.div`
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

const GameDetails = ({ game, screenShot }) => {
    return (
        <GameDetailsWrapper>
            <Link href='/' passHref>
                <BackLink>&larr; Back</BackLink>
            </Link>
            <CenteredWrapper>
                <ImageWrapper>
                    {game?.background_image ? (
                        <Image
                            src={game?.background_image}
                            alt='sad'
                            width={1920}
                            height={1080}
                            layout='responsive'
                            objectFit='cover'
                            quality={100}
                            priority
                            placeholder='blur'
                            blurDataURL
                        />
                    ) : (
                        <NoImageWrapper>
                            <NoImage>No image</NoImage>
                        </NoImageWrapper>
                    )}
                </ImageWrapper>
            </CenteredWrapper>
            <GameDetailsHeader>
                <GameName>
                    <a
                        href={game.website}
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        {game.name}
                    </a>
                </GameName>
            </GameDetailsHeader>
            <GameDescription>
                <div>{game.description_raw}</div>
            </GameDescription>

            <GameScreenShots screenShot={screenShot} />
        </GameDetailsWrapper>
    )
}

export default GameDetails
