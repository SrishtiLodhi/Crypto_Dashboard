// TableStore.ts
import { makeAutoObservable } from 'mobx';

export interface TokenInfo {
  symbol: string;
  faucetAmount: number;
  balance: number; // Add balance property
  MintAsset: string;
}

export interface TableRow extends TokenInfo {
  id: number;
}

class TableStore {
  data: TableRow[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setData(data: TableRow[]) {
    this.data = data;
  }

  updateBalance(symbol: string, newBalance: number) {
    const tokenIndex = this.data.findIndex(token => token.symbol === symbol);
    if (tokenIndex !== -1) {
      this.data[tokenIndex].balance = newBalance;
    }
  }
}

const tableStore = new TableStore();
export default tableStore;
