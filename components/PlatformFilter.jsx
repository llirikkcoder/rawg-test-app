import styled from 'styled-components'
import { useRouter } from 'next/router'

const StyledPlatformFilter = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem 0;

    label {
        margin-right: 10px;
        font-weight: bold;
    }

    button {
        cursor: pointer;
        background-color: transparent;
        color: white;
        border: 1px solid white;
        border-radius: 0.25rem;
        margin: 0.2rem;
    }

    div {
        padding-right: 0.5rem;
    }

    .active {
        background-color: gray;
    }
`

const PlatformFilter = ({ onFilterChange }) => {
    const router = useRouter()
    const selectedPlatforms = router?.query.platforms?.split(',') || []

    const xboxVariantIds = [1, 186]

    const handlePlatformChange = (e, platformId) => {
        e.preventDefault()

        let newPlatforms = []

        if (selectedPlatforms.includes(platformId)) {
            newPlatforms = [platformId]
        } else {
            newPlatforms = [platformId]
        }

        // Add all Xbox variant IDs to the query string
        if (xboxVariantIds.includes(platformId)) {
            newPlatforms = [
                ...newPlatforms,
                ...xboxVariantIds.filter((id) => !newPlatforms.includes(id)),
            ]
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
        { id: 187, name: 'PlayStation' },
        { id: 186, name: 'Xbox' },
        { id: 7, name: 'Nintendo' },
        { id: 3, name: 'iOS' },
        { id: 21, name: 'Android' },
    ]

    const lastSelectedPlatformId =
        selectedPlatforms[selectedPlatforms.length - 1]

    return (
        <StyledPlatformFilter>
            <div>Filter by platform:</div>
            {platformOptions.map((platform) => (
                <button
                    key={platform.id}
                    onClick={(e) => handlePlatformChange(e, platform.id)}
                    className={
                        lastSelectedPlatformId == platform.id ? 'active' : ''
                    }
                >
                    {platform.name}
                </button>
            ))}
        </StyledPlatformFilter>
    )
}

export default PlatformFilter
