# NEAR Token Factory Frontend

A Next.js-based frontend application for interacting with the NEAR Token Factory smart contracts. This interface allows users to create and manage fungible tokens with auction functionality on the NEAR blockchain.

## Overview

This frontend provides an intuitive interface for users to:
- Create new fungible tokens
- Configure token parameters

## Features

* **Token Creation Interface**:
  * Form-based token creation
  * Metadata configuration
  * Supply management
  * Auction parameter settings
  * Storage deposit handling

* **Token Management Dashboard**:
  * Token overview
  * Auction status tracking
  * Order management
  * Distribution monitoring
  * Balance checking

* **User Account Management**:
  * NEAR wallet integration
  * Storage deposit tracking
  * Token balance display
  * Transaction history

## Prerequisites

* Node.js (v16 or later)
* npm or yarn
* NEAR Wallet Account
* Web browser with NEAR Wallet extension

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/near-token-factory-frontend.git
cd near-token-factory-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:

```env
NEXT_PUBLIC_NETWORK_ID=testnet
NEXT_PUBLIC_NODE_URL=https://rpc.testnet.near.org
NEXT_PUBLIC_WALLET_URL=https://wallet.testnet.near.org
NEXT_PUBLIC_HELPER_URL=https://helper.testnet.near.org
NEXT_PUBLIC_CONTRACT_NAME=your-contract-name.testnet
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

## Usage

### Connecting to NEAR Wallet

1. Click "Connect Wallet" button
2. Approve the connection request in your NEAR wallet
3. Once connected, your account information will be displayed

### Creating a New Token

1. Navigate to "Create Token" section
2. Fill in the token details:
   - Token name
   - Symbol
   - Total supply
   - Decimals
   - Auction parameters
3. Submit the form and approve the transaction in your NEAR wallet

### Managing Auctions

1. Go to "My Tokens" section
2. Select a token to view its auction details
3. Monitor bids and auction progress
4. Manage token distribution after auction completion

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Next.js pages
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── services/          # API and blockchain services
├── styles/            # CSS and styling files
└── utils/             # Helper functions
```

## Key Components

* **Token Creator**: Form interface for token creation
* **Wallet Connector**: NEAR wallet integration
* **Transaction Monitor**: Transaction status tracking
* **Balance Display**: Account and token balance display

## Development

### Running Tests

```bash
npm test
# or
yarn test
```

### Building for Production

```bash
npm run build
# or
yarn build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Security Considerations

* Always verify transaction details
* Never share private keys
* Check contract addresses
* Verify token parameters before creation

## Resources

* [NEAR Protocol Documentation](https://docs.near.org)
* [Next.js Documentation](https://nextjs.org/docs)
* [NEAR Wallet Integration Guide](https://docs.near.org/docs/develop/basics/web3-login)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

* NEAR Protocol team
* Next.js community
* NEAR Wallet developers
