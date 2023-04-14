import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from 'styled-components'
import Image from 'next/image'

const ScreenShotsWrapper = styled.div`
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2.5rem;

    .slick-dots li button:before {
        color: white;
    }
`

const ScreenShot = styled.div`
    height: 9rem;
    flex-shrink: 0;
    img {
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
    }
`

const GameScreenShots = ({ screenShot }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        style: { width: '500px' },
        dotsClass: 'slick-dots',
    }

    return (
        <ScreenShotsWrapper>
            <Slider {...settings}>
                {screenShot?.results.map((screen) => (
                    <ScreenShot key={screen.id}>
                        <Image
                            quality={100}
                            src={screen.image}
                            alt='image'
                            width={200}
                            height={125}
                            layout='responsive'
                            objectFit='contain'
                            placeholder='blur'
                            blurDataURL
                        />
                    </ScreenShot>
                ))}
            </Slider>
        </ScreenShotsWrapper>
    )
}

export default GameScreenShots
