import Image from 'next/image'
import styled from 'styled-components'

const ScreenShotsWrapper = styled.div`
    margin-top: 2.5rem;
`

const ScreensContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    overflow-x: scroll;
`

const ScreenShot = styled.div`
    width: 12rem;
    height: 9rem;
    border-radius: 0.25rem;
    overflow: hidden;
    flex-shrink: 0;
`

const GameScreenShots = ({ screenShot }) => {
    return (
        <ScreenShotsWrapper>
            <ScreensContainer>
                {screenShot?.results.map((screen) => (
                    <ScreenShot key={screen.id}>
                        <Image
                            quality={100}
                            src={screen.image}
                            alt='image'
                            width={200}
                            height={200}
                            layout='responsive'
                            objectFit='cover'
                            placeholder='blur'
                            blurDataURL
                        />
                    </ScreenShot>
                ))}
            </ScreensContainer>
        </ScreenShotsWrapper>
    )
}

export default GameScreenShots
