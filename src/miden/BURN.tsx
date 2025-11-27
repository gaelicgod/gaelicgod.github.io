import './BURN.css';

function BURN() {
  return (
    <div className="container">
      <h1>MASM BURN Script Execution</h1>
      <p className="subtitle">Miden Assembly • Token Burn Wrapper Script</p>
      
      {/* Overview Section */}
      <div className="overview">
        <h2>🔥 Script Overview</h2>
        
        <div className="simplicity-banner">
          <h3>The Simplest Script</h3>
          <p>BURN is a minimal wrapper that delegates all logic to the faucet's burn procedure</p>
          <div className="line-count">2 Instructions</div>
        </div>
        
        <div className="flow-diagram">
          <div className="flow-node" style={{ borderColor: '#58a6ff' }}>
            <div className="flow-node-title">INPUT</div>
            <div className="flow-node-content" style={{ color: '#58a6ff' }}>BURN Note</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node" style={{ borderColor: '#f0883e' }}>
            <div className="flow-node-title">CALL</div>
            <div className="flow-node-content" style={{ color: '#f0883e' }}>faucets::burn</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node" style={{ borderColor: '#da3633' }}>
            <div className="flow-node-title">RESULT</div>
            <div className="flow-node-content" style={{ color: '#da3633' }}>Tokens Destroyed</div>
          </div>
        </div>
        
        <div className="burn-diagram">
          <div className="burn-title">Burning Process</div>
          <div className="burn-flow">
            <div className="burn-box note">
              <div className="burn-box-icon">📜</div>
              <div className="burn-box-label">BURN Note</div>
              <div className="burn-box-detail">Contains asset to burn</div>
            </div>
            <div className="burn-arrow">→</div>
            <div className="burn-box faucet">
              <div className="burn-box-icon">🚰</div>
              <div className="burn-box-label">Faucet Account</div>
              <div className="burn-box-detail">Validates & processes</div>
            </div>
            <div className="burn-arrow">→</div>
            <div className="burn-box destroyed">
              <div className="burn-box-icon">🔥</div>
              <div className="burn-box-label">Tokens Burned</div>
              <div className="burn-box-detail">Removed from supply</div>
            </div>
          </div>
        </div>
        
        <div className="note-box" style={{ marginTop: '25px', borderLeftColor: '#da3633' }}>
          <p>🔥 <strong>Token Burning:</strong> This note destroys tokens by returning them to the faucet that issued them. The faucet's <code>burn</code> procedure handles all validation — the script just needs to call it.</p>
        </div>
      </div>
      
      {/* Phase 1: Initialization */}
      <div className="phase init">
        <div className="phase-header">
          <div className="phase-number">1</div>
          <div className="phase-title">Initialization</div>
        </div>
        
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">dropw</span>
<span className="comment"># drop initial ARGS word</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item pad">pad(12)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="note-box">
          <p>💡 The script receives <code>[ARGS, pad(12)]</code> as input. The ARGS word is immediately dropped — BURN doesn't need any arguments since the asset to burn is already in the note.</p>
        </div>
      </div>
      
      {/* Phase 2: Call Burn */}
      <div className="phase burn">
        <div className="phase-header">
          <div className="phase-number">2</div>
          <div className="phase-title">Call Faucet Burn</div>
        </div>
        
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">call.faucets::burn</span>
<span className="comment"># delegate to faucet's burn procedure</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item pad">pad(16)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="validations-box">
          <div className="validations-title">Validations Handled by faucets::burn</div>
          <div className="validation-list">
            <div className="validation-item">
              <div className="validation-icon">1</div>
              <div className="validation-text">
                Exactly one asset in the note
                <span>Panics if note contains zero or multiple assets</span>
              </div>
            </div>
            <div className="validation-item">
              <div className="validation-icon">2</div>
              <div className="validation-text">
                Asset is fungible
                <span>Non-fungible assets cannot be burned this way</span>
              </div>
            </div>
            <div className="validation-item">
              <div className="validation-icon">3</div>
              <div className="validation-text">
                Asset was issued by this faucet
                <span>Can only burn tokens you originally minted</span>
              </div>
            </div>
            <div className="validation-item">
              <div className="validation-icon">4</div>
              <div className="validation-text">
                Amount doesn't exceed outstanding supply
                <span>Cannot burn more than what's in circulation</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="note-box" style={{ borderLeftColor: '#da3633' }}>
          <p>🔥 <strong>Burn Complete:</strong> The faucet's <code>burn</code> procedure extracts the asset from the note, validates it, and removes the tokens from circulation. The script's job is done!</p>
        </div>
      </div>
      
      {/* Wrapper Explanation */}
      <div className="phase" style={{ borderTop: '4px solid #58a6ff' }}>
        <div className="phase-header">
          <div className="phase-number" style={{ background: '#58a6ff33', color: '#58a6ff' }}>?</div>
          <div className="phase-title">Why So Simple?</div>
        </div>
        
        <div className="wrapper-explanation">
          <div className="wrapper-title">
            <span>📦</span> Wrapper Pattern Explained
          </div>
          <div className="wrapper-content">
            <div className="wrapper-side script">
              <div className="wrapper-side-title">BURN Script (Note)</div>
              <div className="wrapper-side-content">
                <p>• Runs in the note's execution context</p>
                <p>• Has access to note assets</p>
                <p>• Cannot directly modify faucet state</p>
                <p>• Just sets up the call and delegates</p>
              </div>
            </div>
            <div className="wrapper-side procedure">
              <div className="wrapper-side-title">faucets::burn (Account)</div>
              <div className="wrapper-side-content">
                <p>• Runs in the faucet account's context</p>
                <p>• Has authority to modify supply</p>
                <p>• Performs all validation logic</p>
                <p>• Actually destroys the tokens</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="note-box" style={{ marginTop: '20px' }}>
          <p>💡 <strong>Design Pattern:</strong> The BURN note script is intentionally minimal. All the complex logic (validation, supply management, asset handling) lives in the faucet account's <code>burn</code> procedure. The note script just acts as a trigger — it says "burn whatever asset I'm carrying."</p>
        </div>
      </div>
      
      {/* Summary */}
      <div className="phase" style={{ borderTop: '4px solid #56d364' }}>
        <div className="phase-header">
          <div className="phase-number" style={{ background: '#56d36433', color: '#56d364' }}>✓</div>
          <div className="phase-title">Execution Summary</div>
        </div>
        
        <div className="burn-diagram" style={{ borderColor: '#56d36444' }}>
          <div className="burn-title" style={{ color: '#56d364' }}>MINT vs BURN Symmetry</div>
          <div className="burn-flow">
            <div className="burn-box" style={{ background: '#56d36422', borderColor: '#56d364' }}>
              <div className="burn-box-icon">🪙</div>
              <div className="burn-box-label" style={{ color: '#56d364' }}>MINT</div>
              <div className="burn-box-detail">Creates tokens</div>
              <div className="burn-box-detail" style={{ color: '#56d364' }}>supply++</div>
            </div>
            <div style={{ fontSize: '2rem', color: '#484f58' }}>⟷</div>
            <div className="burn-box" style={{ background: '#da363322', borderColor: '#da3633' }}>
              <div className="burn-box-icon">🔥</div>
              <div className="burn-box-label" style={{ color: '#da3633' }}>BURN</div>
              <div className="burn-box-detail">Destroys tokens</div>
              <div className="burn-box-detail" style={{ color: '#da3633' }}>supply--</div>
            </div>
          </div>
        </div>
        
        <table className="comparison-table" style={{ marginTop: '25px' }}>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>MINT</th>
              <th>BURN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Note Inputs</td>
              <td>9 (recipient + config + amount)</td>
              <td style={{ color: '#56d364' }}>0 (none needed)</td>
            </tr>
            <tr>
              <td>Instructions</td>
              <td>~15 (stack manipulation)</td>
              <td style={{ color: '#56d364' }}>2 (dropw + call)</td>
            </tr>
            <tr>
              <td>Note Asset</td>
              <td>Empty (tokens created)</td>
              <td>Contains tokens to burn</td>
            </tr>
            <tr>
              <td>Creates Output Note</td>
              <td style={{ color: '#56d364' }}>Yes (to recipient)</td>
              <td style={{ color: '#f85149' }}>No</td>
            </tr>
            <tr>
              <td>Supply Effect</td>
              <td style={{ color: '#56d364' }}>Increases</td>
              <td style={{ color: '#da3633' }}>Decreases</td>
            </tr>
            <tr>
              <td>Faucet Procedure</td>
              <td>distribute()</td>
              <td>burn()</td>
            </tr>
          </tbody>
        </table>
        
        <div className="note-box" style={{ borderLeftColor: '#56d364', marginTop: '25px' }}>
          <p><strong>All Note Scripts at a Glance:</strong></p>
          <table className="comparison-table" style={{ marginTop: '15px' }}>
            <thead>
              <tr>
                <th>Script</th>
                <th>Purpose</th>
                <th>Complexity</th>
                <th>Target Account</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#f778ba' }}>P2ID</td>
                <td>Transfer to specific account</td>
                <td>Simple</td>
                <td>Any wallet</td>
              </tr>
              <tr>
                <td style={{ color: '#f778ba' }}>P2IDE</td>
                <td>Transfer with timelock/reclaim</td>
                <td>Medium</td>
                <td>Any wallet</td>
              </tr>
              <tr>
                <td style={{ color: '#a371f7' }}>SWAP</td>
                <td>Atomic asset exchange</td>
                <td>Complex</td>
                <td>Any wallet</td>
              </tr>
              <tr>
                <td style={{ color: '#56d364' }}>MINT</td>
                <td>Create new tokens</td>
                <td>Medium</td>
                <td>Faucet only</td>
              </tr>
              <tr>
                <td style={{ color: '#da3633' }}>BURN</td>
                <td>Destroy tokens</td>
                <td style={{ color: '#56d364' }}>Minimal</td>
                <td>Faucet only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BURN;
