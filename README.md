# ERC20 token with a simple Web3 UI

This project contains an ERC20 token implementation deployable to the Ethereum network.
It has also a simple UI to allow the user to either send ETH or the custom token.

## Dependencies

### Node

> 12.22.6

### Truffle

```
npm install -g truffle
```

## Build & Run

```sh
npm install

# Verify that your contracts are OK
truffle build

# Connect to an Ethereum test network
# before running the following command.
truffle migrate

npm run start
```

> * Connect a provider such as Metamask
> * Select an Ethereum test network like Ganache, Rinkeby or Ropsten Test Network