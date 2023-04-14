import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import GameScreenShots from './GameScreenShots'
import {
    GameDetailsWrapper,
    BackLink,
    CenteredWrapper,
    ImageWrapper,
    NoImageWrapper,
    NoImage,
    GameDetailsHeader,
    GameName,
    GameDescription,
} from '../styles'

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
