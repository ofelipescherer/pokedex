import styled from 'styled-components'
import { media } from 'util/breakpoints'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${media.lessThan('tablet')`
    width: calc(100% - 2rem);
    margin: 1rem;
    border-radius: 5px
  `};
`

export const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.default.white};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  transition: 0.05s;
  border-radius: 10px;
  max-width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  padding-right: 2rem;
  color: ${({ theme }) => theme.colors.default.black};

  &:focus-within {
    outline: 1px solid ${({ theme }) => theme.colors.default.black};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.typografy.placeholder};
    opacity: 0.5;
    font-size: 0.75rem;
    font-weight: 400;
  }

  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.typografy.placeholder};
  }
  &::-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.typografy.placeholder};
  }

  ${media.lessThan('tablet')`

    width: 100%;
  `};
`

export const SearchIconContainer = styled.button`
  position: absolute;
  right: 0.5rem;
`
