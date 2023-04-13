import Navbar from './Navbar'
import styled from 'styled-components'

const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
`

const Layout = ({ children }) => {
    return (
        <Container>
            <Navbar />
            {children}
        </Container>
    )
}

export default Layout
