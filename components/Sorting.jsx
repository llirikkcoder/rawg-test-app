import styled from 'styled-components'

const StyledSorting = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem;

    label {
        margin-right: 10px;
    }

    select {
        margin-left: 0.4rem;
    }
`

const Sorting = ({ ratingSorting, dateSorting, onRatingSort, onDateSort }) => {
    return (
        <StyledSorting>
            <label>
                Sort by rating:
                <select value={ratingSorting} onChange={onRatingSort}>
                    <option value='none'>None</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </label>

            <label>
                Sort by date of release:
                <select value={dateSorting} onChange={onDateSort}>
                    <option value='none'>None</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </label>
        </StyledSorting>
    )
}

export default Sorting
