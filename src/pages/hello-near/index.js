import { useState, useEffect, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import styles from '@/styles/app.module.css';
import { HelloNearContract } from '../../config';
import { Cards } from '@/components/cards';
import { utils } from 'near-api-js';
import { TokenList } from '@/components/TokenList';

const { format: { parseNearAmount } } = utils;
const CONTRACT = HelloNearContract;
const GAS = "300000000000000";

export default function HelloNear() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [tokenData, setTokenData] = useState(null);
  const [tokenForm, setTokenForm] = useState({
    spec: "ft-1.0.0",
    name: "",
    symbol: "",
    icon: "",
    reference: "",
    reference_hash: null,
    decimals: "18",
    image: "",
    description: "",
    auction_duration: "",
    min_buy_amount: "50"
  });
  const [txHash, setTxHash] = useState("");
  // hftk3 is the token id of the token created by the contract
  const [searchTokenId, setSearchTokenId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTokenForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!wallet) return;
    //fetchTokenData(searchTokenId);
  }, [wallet]);

  const fetchTokenData = async (tokenId) => {
    try {
      const result = await wallet.viewMethod({
        contractId: CONTRACT,
        method: 'get_token',
        args: { token_id: tokenId }
      });

      if (result) {
        const [owner_id, total_supply, metadata, image] = result;
        setTokenData({ owner_id, total_supply, metadata, image });
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      setTokenData(null);
      alert(`Token not found or error occurred: ${error.message}`);
    }
  };

  useEffect(() => {
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId]);

  const createToken = async () => {
    try {
      setShowSpinner(true);

      const args = {
        spec: "ft-1.0.0",
        name: tokenForm.name,
        symbol: tokenForm.symbol,
        icon: tokenForm.icon || null,
        reference: tokenForm.reference || null,
        reference_hash: null,
        decimals: parseInt(tokenForm.decimals),
        image: tokenForm.image,
        description: tokenForm.description,
        auction_duration: tokenForm.auction_duration.toString(),
        min_buy_amount: parseNearAmount(tokenForm.min_buy_amount)
      };

      const result = await wallet.callMethod({
        contractId: CONTRACT,
        method: 'create_token',
        args: args,
        deposit: parseNearAmount("100"),
        gas: GAS
      });

      // El servidor WebSocket se encargará de transmitir el nuevo token
      // No necesitamos enviar nada aquí porque tu backend está escuchando
      // los eventos de la blockchain

      alert(`Token "${tokenForm.name}" created successfully!`);
    } catch (error) {
      console.error('Error creating token:', error);
      alert(`Error creating token: ${error.message}`);
    } finally {
      setShowSpinner(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Interacting with the contract: &nbsp;
          <code className={styles.code}>{CONTRACT}</code>
        </p>
      </div>

      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter token ID"
            value={searchTokenId}
            onChange={(e) => setSearchTokenId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => fetchTokenData(searchTokenId)}>
            Search Token
          </button>
        </div>
      </div>
      <div className={styles.center}>
        <h1 className="w-100">
          {tokenData ? (
            <>
              The contract says:
              <div>
                <p>Owner: {tokenData.owner_id}</p>
                <p>Total Supply: {tokenData.total_supply}</p>
                <p>Name: {tokenData.metadata.name}</p>
                <p>Image: {tokenData.image}</p>
              </div>
            </>
          ) : (
            <p>Search a token using an ID to see its details</p>
          )}
        </h1>

        <div className="input-group flex-column" hidden={!loggedIn}>

          <div>
            <h2>Create a new token</h2>
            {txHash && (
              <div className="alert alert-success">
                <p>Transaction sent successfully!</p>
                <p>
                  <a
                    href={`https://testnet.nearblocks.io/txns/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View transaction on NEAR Explorer
                  </a>
                </p>
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Token Name"
              name="name"
              value={tokenForm.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Token Symbol"
              name="symbol"
              value={tokenForm.symbol}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Icon URL (optional)"
              name="icon"
              value={tokenForm.icon}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Reference (optional)"
              name="reference"
              value={tokenForm.reference}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Decimals"
              name="decimals"
              value={tokenForm.decimals}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              name="image"
              value={tokenForm.image}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              name="description"
              value={tokenForm.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Auction Duration"
              name="auction_duration"
              value={tokenForm.auction_duration}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Minimum Buy Amount (in NEAR)"
              name="min_buy_amount"
              value={tokenForm.min_buy_amount}
              onChange={handleInputChange}
            />
          </div>

          <div>
            {/* <button className="btn btn-secondary" onClick={saveGreeting}> */}
            <button className="btn btn-primary" onClick={createToken}>
              <span hidden={showSpinner}> Create token </span>
              <i
                className="spinner-border spinner-border-sm"
                hidden={!showSpinner}
              ></i>
            </button>
          </div>
        </div>
        <div className="w-100 text-end align-text-center" hidden={loggedIn}>
          <p className="m-0"> Please login to create a token </p>
        </div>
      </div>
      <TokenList />
      <Cards />
    </main>
  );
}