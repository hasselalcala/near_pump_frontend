import { useWebSocket } from '@/contexts/WebSocketContext';
import styles from '@/styles/app.module.css';

export function TokenList() {
    const { tokens } = useWebSocket();

    return (
        <div className={styles.tokenList}>
            <h2>Recent Tokens</h2>
            <div className={styles.tokenGrid}>
                {tokens.map((token, index) => (
                    <div key={index} className={styles.tokenCard}>
                        <h3>{token.name}</h3>
                        <p>Symbol: {token.symbol}</p>
                        <p>Creator: {token.owner_id}</p>
                        {token.auction_duration && (
                            <p>Auction Duration: {token.auction_duration}</p>
                        )}
                        <button
                            className="btn btn-primary"
                            onClick={() => window.location.href = `/token/${token.id}`}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
} 