import { useCallback } from 'react';
import styled from 'styled-components';

const PageNumber = styled.span<{
  $isActive: boolean;
}>`
  padding: 10px 20px;
  border: 1px solid #000;
  cursor: pointer;
  color: ${({ $isActive }) => $isActive ? 'blue' : 'black'};
`;

type PageProps = {
  activePage: number;
  pageNumber: number;
  onPress: (pageNumber: number) => void;
};

const Page = ({ activePage, pageNumber, onPress }: PageProps) => {
  const isActive = activePage === pageNumber;
  const onClick = useCallback(() => {
    onPress(pageNumber);
  }, [onPress, pageNumber]);

  return (
    <PageNumber
      $isActive={isActive}
      onClick={onClick}
    >
      {pageNumber}
    </PageNumber>
  )
};

export default Page;
