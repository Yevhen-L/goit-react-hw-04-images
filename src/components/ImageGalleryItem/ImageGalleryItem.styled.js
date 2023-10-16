import styled from 'styled-components';

export const StyledAppContainer = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    text-decoration: none;
  }
  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }

  &:focus {
    transform: scale(1.03);
    cursor: zoom-in;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
