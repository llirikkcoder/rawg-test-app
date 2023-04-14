import { useState } from 'react'
import styled from 'styled-components'

const platforms = [
  { id: 1, name: 'PC' },
  { id: 2, name: 'PlayStation 4' },
  { id: 3, name: 'Xbox One' },
  { id: 4, name: 'Nintendo Switch' },
  // add more platforms as needed
]

const PlatformFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const PlatformFilterButton = styled.button`
  background-color: ${(props) => (props.selected ? '#00bfff' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border: 1px solid #00bfff;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`

const PlatformFilter = ({ onFilterChange }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([])

  const handlePlatformSelect = (platform) => {
    const platformIndex = selectedPlatforms.findIndex((p) => p.id === platform.id)
    if (platformIndex === -1) {
      setSelectedPlatforms([...selectedPlatforms, platform])
    } else {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p.id !== platform.id))
    }
  }

  const handleClearFilters = () => {
    setSelectedPlatforms([])
  }

  const handleApplyFilters = () => {
    onFilterChange(selectedPlatforms.map((p) => p.id))
  }

  return (
    <PlatformFilterContainer>
      {platforms.map((platform) => (
        <PlatformFilterButton
          key={platform.id}
          selected={selectedPlatforms.some((p) => p.id === platform.id)}
          onClick={() => handlePlatformSelect(platform)}
        >
          {platform.name}
        </PlatformFilterButton>
      ))}
      {selectedPlatforms.length > 0 && (
        <>
          <PlatformFilterButton onClick={handleClearFilters}>Clear</PlatformFilterButton>
          <PlatformFilterButton onClick={handleApplyFilters}>Apply</PlatformFilterButton>
        </>
      )}
    </PlatformFilterContainer>
  )
}

export default PlatformFilter
