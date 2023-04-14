import React from 'react'
import styled from 'styled-components'
import SearchForm from './SearchForm'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
    margin: 10px 0;

    h1 {
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
        padding-right: 10px;
        &:active {
            transform: scale(0.9);
        }
        @media (min-width: 768px) {
            font-size: 18px;
        }
    }
`

const Navbar = () => {
    const router = useRouter()

    return (
        <NavContainer>
            <Link href='/' passHref>
                <h1>GAMES</h1>
            </Link>
            {router.pathname !== '/game/[slug]' && <SearchForm />}
        </NavContainer>
    )
}

export default Navbar
