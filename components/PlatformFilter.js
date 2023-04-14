import styled from 'styled-components'
import { useRouter } from 'next/router'

const StyledPlatformFilter = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;

    label {
        margin-right: 10px;
        font-weight: bold;
    }

    select {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid grey;
        margin-right: 10px;
        font-size: 16px;
    }

    button {
        background-color: transparent;
        color: white;
        border: 1px solid white;
        border-radius: 0.25rem;
        margin: 0.2rem;
    }
`

const PlatformFilter = ({ onFilterChange }) => {
    const router = useRouter()
    const selectedPlatforms = router?.query.platforms?.split(',') || []
    const handlePlatformChange = (e, platformId) => {
        e.preventDefault()

        let newPlatforms = []

        if (selectedPlatforms.includes(platformId)) {
            newPlatforms = selectedPlatforms.filter((id) => id !== platformId)
        } else {
            newPlatforms = [...selectedPlatforms, platformId]
        }

        router.push({
            pathname: '/',
            query: {
                ...router.query,
                platforms: newPlatforms.join(','),
            },
        })

        onFilterChange(newPlatforms)
    }

    const platformOptions = [
        { id: 4, name: 'PC' },
        { id: 1, name: 'PlayStation' },
        { id: 2, name: 'Xbox' },
        { id: 7, name: 'Nintendo' },
        { id: 3, name: 'iOS' },
        { id: 21, name: 'Android' },
    ]

    return (
        <StyledPlatformFilter>
            <div>Filter by platform:</div>
            {platformOptions.map((platform) => (
                <button
                    key={platform.id}
                    onClick={(e) => handlePlatformChange(e, platform.id)}
                    className={
                        selectedPlatforms.includes(String(platform.id))
                            ? 'active'
                            : ''
                    }
                >
                    {platform.name}
                </button>
            ))}
        </StyledPlatformFilter>
    )
}

export default PlatformFilter
