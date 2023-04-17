import Image from 'next/image'
import { useRouter } from 'next/router'
import {
    CardWrapper,
    ImageWrapper,
    Title,
    DetailsWrapper,
    Release,
    Rating,
    NoImageWrapper,
    NoImage,
} from './GameCard.styles'

const TitleLimited = ({ children, limit }) => {
    const text = children.trim()
    const limitedText =
        text.length > limit ? text.slice(0, limit) + '...' : text
    return <Title>{limitedText}</Title>
}

const GameCard = ({ game }) => {
    const router = useRouter()

    const gameDetail = (id) => {
        router.push({ pathname: `game/${id}` })
    }

    return (
        <CardWrapper onClick={() => gameDetail(game?.id)}>
            <ImageWrapper>
                {game.background_image ? (
                    <Image
                        src={game?.background_image}
                        alt={game.name}
                        layout='fill'
                        objectFit='cover'
                        placeholder='blur'
                        blurDataURL={game?.background_image}
                    />
                ) : (
                    <NoImageWrapper>
                        <NoImage>No image</NoImage>
                    </NoImageWrapper>
                )}
            </ImageWrapper>
            <DetailsWrapper>
                <TitleLimited limit={20}>{game?.name}</TitleLimited>
                <div>
                    <Release>Release: {game?.released}</Release>
                    <Rating>Rating: {game?.rating}</Rating>
                </div>
            </DetailsWrapper>
        </CardWrapper>
    )
}

export default GameCard
