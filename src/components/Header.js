import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const Header = ({ title }) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
        </Wrapper>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
