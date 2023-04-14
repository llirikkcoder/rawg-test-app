import styled from 'styled-components'
import { useRouter } from 'next/router'
// import { useState } from 'react'

const StyledPlatformFilter = styled.div`
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

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
            <h2>Filter by platform:</h2>
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

// import { useState } from 'react'
// import styled from 'styled-components'

// const platforms = [
//   { id: 1, name: 'PC' },
//   { id: 2, name: 'PlayStation 4' },
//   { id: 3, name: 'Xbox One' },
//   { id: 4, name: 'Nintendo Switch' },
//   // add more platforms as needed
// ]

// const PlatformFilterContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   margin-bottom: 1rem;
// `

// const PlatformFilterButton = styled.button`
//   background-color: ${(props) => (props.selected ? '#00bfff' : 'white')};
//   color: ${(props) => (props.selected ? 'white' : 'black')};
//   border: 1px solid #00bfff;
//   border-radius: 0.25rem;
//   font-size: 0.875rem;
//   padding: 0.5rem 1rem;
//   cursor: pointer;
// `

// const PlatformFilter = ({ onFilterChange }) => {
//   const [selectedPlatforms, setSelectedPlatforms] = useState([])

//   const handlePlatformSelect = (platform) => {
//     const platformIndex = selectedPlatforms.findIndex((p) => p.id === platform.id)
//     if (platformIndex === -1) {
//       setSelectedPlatforms([...selectedPlatforms, platform])
//     } else {
//       setSelectedPlatforms(selectedPlatforms.filter((p) => p.id !== platform.id))
//     }
//   }

//   const handleClearFilters = () => {
//     setSelectedPlatforms([])
//   }

//   const handleApplyFilters = () => {
//     onFilterChange(selectedPlatforms.map((p) => p.id))
//   }

//   return (
//     <PlatformFilterContainer>
//       {platforms.map((platform) => (
//         <PlatformFilterButton
//           key={platform.id}
//           selected={selectedPlatforms.some((p) => p.id === platform.id)}
//           onClick={() => handlePlatformSelect(platform)}
//         >
//           {platform.name}
//         </PlatformFilterButton>
//       ))}
//       {selectedPlatforms.length > 0 && (
//         <>
//           <PlatformFilterButton onClick={handleClearFilters}>Clear</PlatformFilterButton>
//           <PlatformFilterButton onClick={handleApplyFilters}>Apply</PlatformFilterButton>
//         </>
//       )}
//     </PlatformFilterContainer>
//   )
// }
