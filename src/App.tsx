import React, { useEffect } from 'react';
import TokenInfoTable from './components/TokenInfoTable';
import tableStore, { TableRow } from './components/TableStore';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  useAccounts,
  useDisconnect,
  useConnectUI,
  useIsConnected,
  useBalance
} from '@fuel-wallet/react';
import { Fuel, FuelWalletLocked } from '@fuel-wallet/sdk';
import { Provider, Account, AbstractAddress, Interface, Contract, ContractFactory, BytesLike, DeployContractOptions, StorageSlot, Wallet } from "fuels";


const AppWrapper = styled.div`
  background: #050505;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #050505;
  padding-right: 20px;
  padding-left: 20px;
`;

const H1 = styled.h1`
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 16px;
  color: #FFFFFF;
`;

const MainContent = styled.div`
  flex: 1; /* This will make the main content area take up remaining space */
`;


const _abi = {
  "types": [
    {
      "typeId": 0,
      "type": "()",
      "components": [],
      "typeParameters": null
    },
    {
      "typeId": 1,
      "type": "b256",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 2,
      "type": "enum BurnError",
      "components": [
        {
          "name": "NotEnoughCoins",
          "type": 0,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 3,
      "type": "enum Identity",
      "components": [
        {
          "name": "Address",
          "type": 7,
          "typeArguments": null
        },
        {
          "name": "ContractId",
          "type": 10,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 4,
      "type": "enum Option",
      "components": [
        {
          "name": "None",
          "type": 0,
          "typeArguments": null
        },
        {
          "name": "Some",
          "type": 5,
          "typeArguments": null
        }
      ],
      "typeParameters": [
        5
      ]
    },
    {
      "typeId": 5,
      "type": "generic T",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 6,
      "type": "raw untyped ptr",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 7,
      "type": "struct Address",
      "components": [
        {
          "name": "value",
          "type": 1,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 8,
      "type": "struct AssetId",
      "components": [
        {
          "name": "value",
          "type": 1,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 9,
      "type": "struct Bytes",
      "components": [
        {
          "name": "buf",
          "type": 11,
          "typeArguments": null
        },
        {
          "name": "len",
          "type": 13,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 10,
      "type": "struct ContractId",
      "components": [
        {
          "name": "value",
          "type": 1,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 11,
      "type": "struct RawBytes",
      "components": [
        {
          "name": "ptr",
          "type": 6,
          "typeArguments": null
        },
        {
          "name": "cap",
          "type": 13,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 12,
      "type": "struct String",
      "components": [
        {
          "name": "bytes",
          "type": 9,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 13,
      "type": "u64",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 14,
      "type": "u8",
      "components": null,
      "typeParameters": null
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "asset",
          "type": 8,
          "typeArguments": null
        }
      ],
      "name": "decimals",
      "output": {
        "name": "",
        "type": 4,
        "typeArguments": [
          {
            "name": "",
            "type": 14,
            "typeArguments": null
          }
        ]
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "type": 8,
          "typeArguments": null
        }
      ],
      "name": "name",
      "output": {
        "name": "",
        "type": 4,
        "typeArguments": [
          {
            "name": "",
            "type": 12,
            "typeArguments": null
          }
        ]
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "type": 8,
          "typeArguments": null
        }
      ],
      "name": "symbol",
      "output": {
        "name": "",
        "type": 4,
        "typeArguments": [
          {
            "name": "",
            "type": 12,
            "typeArguments": null
          }
        ]
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "total_assets",
      "output": {
        "name": "",
        "type": 13,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset",
          "type": 8,
          "typeArguments": null
        }
      ],
      "name": "total_supply",
      "output": {
        "name": "",
        "type": 4,
        "typeArguments": [
          {
            "name": "",
            "type": 13,
            "typeArguments": null
          }
        ]
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "sub_id",
          "type": 1,
          "typeArguments": null
        },
        {
          "name": "amount",
          "type": 13,
          "typeArguments": null
        }
      ],
      "name": "burn",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "recipient",
          "type": 3,
          "typeArguments": null
        },
        {
          "name": "sub_id",
          "type": 1,
          "typeArguments": null
        },
        {
          "name": "amount",
          "type": 13,
          "typeArguments": null
        }
      ],
      "name": "mint",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [
    {
      "logId": 0,
      "loggedType": {
        "name": "",
        "type": 2,
        "typeArguments": []
      }
    }
  ],
  "messagesTypes": [],
  "configurables": []
};




function App() {

  const { connect, error, isError, theme, setTheme, isConnecting } =
  useConnectUI();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  const { accounts } = useAccounts();

  

  useEffect(() => {
    //


    const fetchData = async () => {

      const assetIds = [
        "0x0000000000000000000000000000000000000000000000000000000000000000",  // ETH
        "0x593b117a05f5ea64b39ba1f9bc3fb7e7a791c9be130e28376ad552eacdb3b746", // BTC
        "0x0450e4d385cbd2914f74505f18f01587cc4f4ad1fdef4b80cbde2a8155a86d72", // USDC
        "0xae37bc0feb66e60a89e301d450bb4640aa9bd7cedd856e253e23989eae536e92" // UNI
      ]

      const provider = await Provider.create("https://beta-5.fuel.network/graphql");

      // const myWallet = Wallet.fromAddress(accounts[0], provider);
      // myWallet.getBalances().then((data) => {
      //   // setBalance(new BN(data[0].amount).toNumber());
      //   console.log("apna balance : ", data[0].amount.toString() )
      // });



      // const fuel = new Fuel();
      // const wallet: FuelWalletLocked = await fuel.getWallet(accounts[0]); 

      // console.log("wallet  : ", wallet)

      const contract = new Contract(assetIds[0], _abi, provider);

      //  total_assets
       //await contract.functions.decimals("0x593b117a05f5ea64b39ba1f9bc3fb7e7a791c9be130e28376ad552eacdb3b746").get(); // iss code ko jala dalo
      // const { value } = await contract.functions.get_count().get();


      // console.log("total aseest : ", decimals)
      // console.log("contract  : ", JSON.stringify(contract,null, 2))
  
      const data: TableRow[] = [
        { id: 1, symbol: 'Etherium', MintAsset:'ETH', faucetAmount: 100, balance: 0 },
        { id: 2, symbol: 'Bitcoin', MintAsset:'BTC',  faucetAmount: 50, balance: 0 },
      ];
      tableStore.setData(data);
    };

    fetchData();
  }, []);

  

  const handleMintClick = (symbol: string) => {
    // Handle minting logic here
    console.log(`Minting ${symbol}...`);
  };
  


  return (
    <AppWrapper>
      <Navbar/>
      <MainContent>
        <H1>Faucet for Fuel Network</H1>
        <TokenInfoTable onMintClick={handleMintClick} />
      </MainContent>
      <Footer/>
    </AppWrapper>
  );
};

export default App;
