// TokenInfoTable.tsx
import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import tableStore, { TokenInfo } from './TableStore';

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const TableHeaderCell = styled.th`
  width: 25%;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: 0.02em;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #969696;
  text-align: left;
`;

const LastTableHeaderCell = styled.th`
  width: 25%;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: 0.02em;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #969696;
  text-align: right; /* Align content to the right */
`;

const SecondTableHeaderCell = styled.th`
  width: 25%;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: 0.02em;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #969696;
  text-align: center; /* Align content to the right */
`;


const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const LastTableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: right; /* Align content to the right */
`;

const TokenSymbolCell = styled(TableCell)`
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  text-align: left;
`;

const MiddleTokenSymbolCell = styled(TableCell)`
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  text-align: center;
`;

const Button = styled.button`
  box-sizing: border-box;
  padding: 8px 35px;
  border: 1px solid #4B4B4B;
  border-radius: 32px;
  background-color: transparent;
  color: #4B4B4B;
  font-family: 'Space Grotesk';
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
line-height: 16px;
text-transform: uppercase;
font-feature-settings: 'pnum' on, 'lnum' on;

color: #969696;
  
  &:hover {
    background-color: #4B4B4B;
    color: #FFFFFF;
  }
`;

const Chip = styled.span`
  padding: 4px 8px;
  background: #141414;
  border-radius: 4px;
  color: #FFFFFF;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4B4B4B;
  }
`;


interface TokenInfoTableProps {
  onMintClick: (symbol: string) => void;
}

const TokenInfoTable: React.FC<TokenInfoTableProps> = ({ onMintClick }) => {
  return (
    <TableContainer>
      
      <thead>
        <tr>
          <TableHeaderCell>Asset</TableHeaderCell>
          <SecondTableHeaderCell>Mint amount</SecondTableHeaderCell>
          <SecondTableHeaderCell>My Balance</SecondTableHeaderCell> {/* Updated header */}
          <LastTableHeaderCell > <Button>Mint All</Button></LastTableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {tableStore.data.map((row) => (
          <tr key={row.id}>
            <TokenSymbolCell>{row.symbol}</TokenSymbolCell>
            
            <MiddleTokenSymbolCell>
              {row.faucetAmount}
              <Chip>{row.MintAsset}</Chip>
            </MiddleTokenSymbolCell>
            <MiddleTokenSymbolCell>
              {row.balance}
              <Chip>{row.MintAsset}</Chip>
            </MiddleTokenSymbolCell>
            <LastTableCell>
              <Button onClick={() => onMintClick(row.symbol)}>Mint</Button>
            </LastTableCell>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default observer(TokenInfoTable);
