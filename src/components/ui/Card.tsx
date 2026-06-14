import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 3.2rem;

  @media (max-width: 540px) {
    padding: 1.6rem;
  }
`;

export const CardTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const CardSubtitle = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1.6rem;
`;
