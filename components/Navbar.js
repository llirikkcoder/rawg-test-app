import React from 'react'
import styled from 'styled-components'
import SearchForm from './SearchForm'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 24px;
    margin-bottom: 20px;
    & h1 {
        color: #fff;
        font-weight: bold;
        font-size: 14px;
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

    console.log('router.pathname', router.pathname)

    return (
        <Nav>
            <Link href='/' passHref>
                <h1>LOGO</h1>
            </Link>
            {router.pathname !== '/game/[slug]' && <SearchForm />}
        </Nav>
    )
}

export default Navbar
