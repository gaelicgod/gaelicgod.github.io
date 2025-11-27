import './MINT.css';

function MINT() {
  return (
    <div className="container">
      <h1>MASM MINT Script Execution</h1>
      <p className="subtitle">Miden Assembly • Network Faucet Minting Note Script</p>
      
      {/* Overview Section */}
      <div className="overview">
        <h2>🪙 Script Overview</h2>
        <div className="flow-diagram">
          <div className="flow-node">
            <div className="flow-node-title">INPUT</div>
            <div className="flow-node-content">MINT Note</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">READ</div>
            <div className="flow-node-content">9 Inputs</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">PREPARE</div>
            <div className="flow-node-content">Stack Layout</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node" style={{ borderColor: '#f0883e' }}>
            <div className="flow-node-title">CALL</div>
            <div className="flow-node-content" style={{ color: '#f0883e' }}>distribute()</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node" style={{ borderColor: '#56d364' }}>
            <div className="flow-node-title">OUTPUT</div>
            <div className="flow-node-content" style={{ color: '#56d364' }}>Minted Assets</div>
          </div>
        </div>
        
        <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: '#a371f7' }}>Expected Note Inputs (9 elements)</h3>
        <table className="inputs-table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Content</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: '#79c0ff' }}>0</td>
              <td style={{ color: '#f778ba' }}>RECIPIENT[0]</td>
              <td rowSpan={4} style={{ verticalAlign: 'middle' }}>Recipient account ID (4 elements)</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>1</td>
              <td style={{ color: '#f778ba' }}>RECIPIENT[1]</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>2</td>
              <td style={{ color: '#f778ba' }}>RECIPIENT[2]</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>3</td>
              <td style={{ color: '#f778ba' }}>RECIPIENT[3]</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>4</td>
              <td style={{ color: '#a371f7' }}>execution_hint</td>
              <td>Hint for output note execution</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>5</td>
              <td style={{ color: '#a371f7' }}>note_type</td>
              <td>Type of the output note</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>6</td>
              <td style={{ color: '#a371f7' }}>aux</td>
              <td>Auxiliary data for the output note</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>7</td>
              <td style={{ color: '#a371f7' }}>tag</td>
              <td>Note tag identifier</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>8</td>
              <td style={{ color: '#56d364' }}>amount</td>
              <td>Amount of tokens to mint</td>
            </tr>
          </tbody>
        </table>
        
        <div className="faucet-diagram">
          <div className="faucet-title">Minting Process</div>
          <div className="faucet-flow">
            <div className="faucet-box note">
              <div className="faucet-box-icon">📜</div>
              <div className="faucet-box-label">MINT Note</div>
              <div className="faucet-box-detail">Contains mint instructions</div>
            </div>
            <div className="faucet-arrow">→</div>
            <div className="faucet-box faucet">
              <div className="faucet-box-icon">🚰</div>
              <div className="faucet-box-label">Network Faucet</div>
              <div className="faucet-box-detail">Executes against this account</div>
            </div>
            <div className="faucet-arrow">→</div>
            <div className="faucet-box output">
              <div className="faucet-box-icon">💰</div>
              <div className="faucet-box-label">Output Note</div>
              <div className="faucet-box-detail">Minted tokens → Recipient</div>
            </div>
          </div>
        </div>
        
        <div className="note-box" style={{ marginTop: '20px', borderLeftColor: '#f0883e' }}>
          <p>🚰 <strong>Network Faucet:</strong> This note is designed to be executed against a <em>network fungible faucet account</em>. The faucet's <code>distribute</code> procedure creates new tokens and sends them to the specified recipient via an output note.</p>
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
          <p>💡 The script receives <code>[ARGS, pad(12)]</code> as input. The ARGS word is dropped immediately as it's not needed for minting operations.</p>
        </div>
      </div>
      
      {/* Phase 2: Load Note Inputs */}
      <div className="phase inputs">
        <div className="phase-header">
          <div className="phase-number">2</div>
          <div className="phase-title">Load Note Inputs into Memory</div>
        </div>
        
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">push</span>.<span className="number">0</span> <span className="procedure">exec.active_note::get_inputs</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item value">num_inputs (9)</span>
                <span className="stack-item ptr">inputs_ptr (0)</span>
                <span className="stack-item pad">pad(12)</span>
              </div>
            </div>
          </div>
          
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">eq</span>.<span className="number">MINT_NOTE_INPUTS_NUMBER</span>
<span className="keyword">assert</span>.err=ERR_MINT_WRONG_NUMBER_OF_INPUTS
<span className="keyword">drop</span></code>
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
        
        <div className="memory-section">
          <div className="memory-title">Memory Layout (After get_inputs)</div>
          <div className="memory-grid">
            <div className="memory-cell" style={{ borderLeftColor: '#f778ba' }}>
              <div className="memory-addr">Address 0-3</div>
              <div className="memory-content">RECIPIENT[0..3]</div>
            </div>
            <div className="memory-cell" style={{ borderLeftColor: '#a371f7' }}>
              <div className="memory-addr">Address 4</div>
              <div className="memory-content">execution_hint</div>
            </div>
            <div className="memory-cell" style={{ borderLeftColor: '#a371f7' }}>
              <div className="memory-addr">Address 5</div>
              <div className="memory-content">note_type</div>
            </div>
            <div className="memory-cell" style={{ borderLeftColor: '#a371f7' }}>
              <div className="memory-addr">Address 6</div>
              <div className="memory-content">aux</div>
            </div>
            <div className="memory-cell" style={{ borderLeftColor: '#a371f7' }}>
              <div className="memory-addr">Address 7</div>
              <div className="memory-content">tag</div>
            </div>
            <div className="memory-cell" style={{ borderLeftColor: '#56d364' }}>
              <div className="memory-addr">Address 8</div>
              <div className="memory-content">amount</div>
            </div>
          </div>
        </div>
        
        <div className="note-box">
          <p>💡 All 9 note inputs are stored in memory starting at address 0. The assertion ensures exactly 9 inputs exist, then drops the pointer since we'll use explicit addresses.</p>
        </div>
      </div>
      
      {/* Phase 3: Load Data from Memory */}
      <div className="phase load">
        <div className="phase-header">
          <div className="phase-number">3</div>
          <div className="phase-title">Load RECIPIENT from Memory</div>
        </div>
        
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">mem_loadw_be</span>.<span className="number">0</span>
<span className="comment"># load RECIPIENT word from address 0</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item recipient">RECIPIENT[0]</span>
                <span className="stack-item recipient">RECIPIENT[1]</span>
                <span className="stack-item recipient">RECIPIENT[2]</span>
                <span className="stack-item recipient">RECIPIENT[3]</span>
                <span className="stack-item pad">pad(12)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="note-box">
          <p>💡 <code>mem_loadw_be.0</code> loads 4 elements from memory address 0 in big-endian order. This is the RECIPIENT word (4 elements representing the recipient account ID).</p>
        </div>
      </div>
      
      {/* Phase 4: Load Note Config */}
      <div className="phase prepare">
        <div className="phase-header">
          <div className="phase-number">4</div>
          <div className="phase-title">Load Note Config & Amount</div>
        </div>
        
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">swapw</span> <span className="keyword">mem_loadw_be</span>.<span className="number">4</span>
<span className="comment"># swap, then load config from address 4</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item config">tag</span>
                <span className="stack-item config">aux</span>
                <span className="stack-item config">note_type</span>
                <span className="stack-item config">exec_hint</span>
                <span className="stack-item recipient">RECIPIENT[0]</span>
                <span className="stack-item recipient">RECIPIENT[1]</span>
                <span className="stack-item recipient">RECIPIENT[2]</span>
                <span className="stack-item recipient">RECIPIENT[3]</span>
                <span className="stack-item pad">pad(8)</span>
              </div>
            </div>
          </div>
          
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">mem_load</span>.<span className="number">8</span>
<span className="comment"># load single element (amount) from address 8</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item amount">amount</span>
                <span className="stack-item config">tag</span>
                <span className="stack-item config">aux</span>
                <span className="stack-item config">note_type</span>
                <span className="stack-item config">exec_hint</span>
                <span className="stack-item recipient">RECIPIENT[0..3]</span>
                <span className="stack-item pad">pad(8)</span>
              </div>
            </div>
          </div>
          
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">movup</span>.<span className="number">9</span> <span className="keyword">drop</span>
<span className="comment"># remove one padding element</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item amount">amount</span>
                <span className="stack-item config">tag</span>
                <span className="stack-item config">aux</span>
                <span className="stack-item config">note_type</span>
                <span className="stack-item config">exec_hint</span>
                <span className="stack-item recipient">RECIPIENT[0..3]</span>
                <span className="stack-item pad">pad(7)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="note-box">
          <p>💡 <code>swapw</code> swaps the top two words, positioning RECIPIENT below the config. <code>mem_load.8</code> loads a single element (the amount). The final <code>movup.9 drop</code> adjusts padding to match the expected calling convention.</p>
        </div>
      </div>
      
      {/* Phase 5: Call Distribute */}
      <div className="phase mint">
        <div className="phase-header">
          <div className="phase-number">5</div>
          <div className="phase-title">Call Faucet Distribute</div>
        </div>
        
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">call.network_faucet::distribute</span>
<span className="comment"># mint tokens and create output note</span></code>
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
        
        <div className="distribute-params">
          <div className="param-title">distribute() Expected Stack Layout</div>
          <div className="param-grid">
            <div className="param-item">
              <span className="param-badge amount">amount</span>
              <span className="param-desc">Tokens to mint</span>
            </div>
            <div className="param-item">
              <span className="param-badge config">tag</span>
              <span className="param-desc">Note tag</span>
            </div>
            <div className="param-item">
              <span className="param-badge config">aux</span>
              <span className="param-desc">Auxiliary data</span>
            </div>
            <div className="param-item">
              <span className="param-badge config">note_type</span>
              <span className="param-desc">Output note type</span>
            </div>
            <div className="param-item">
              <span className="param-badge config">exec_hint</span>
              <span className="param-desc">Execution hint</span>
            </div>
            <div className="param-item">
              <span className="param-badge recipient">RECIPIENT</span>
              <span className="param-desc">Target account (4 elements)</span>
            </div>
          </div>
        </div>
        
        <div className="note-box" style={{ borderLeftColor: '#56d364' }}>
          <p>✅ <strong>Minting Complete:</strong> The <code>distribute</code> procedure mints the specified amount of tokens and creates an output note that will deliver them to the RECIPIENT. The stack is left with padding as expected.</p>
        </div>
      </div>
      
      {/* Summary */}
      <div className="phase" style={{ borderTop: '4px solid #56d364' }}>
        <div className="phase-header">
          <div className="phase-number" style={{ background: '#56d36433', color: '#56d364' }}>✓</div>
          <div className="phase-title">Execution Summary</div>
        </div>
        
        <div className="faucet-diagram" style={{ borderColor: '#56d36444' }}>
          <div className="faucet-title" style={{ color: '#56d364' }}>Complete Minting Flow</div>
          <div className="faucet-flow">
            <div className="faucet-box" style={{ background: '#8957e522', borderColor: '#a371f7' }}>
              <div className="faucet-box-icon">👤</div>
              <div className="faucet-box-label" style={{ color: '#a371f7' }}>Requester</div>
              <div className="faucet-box-detail">Creates MINT note</div>
            </div>
            <div className="faucet-arrow">→</div>
            <div className="faucet-box note">
              <div className="faucet-box-icon">📜</div>
              <div className="faucet-box-label">MINT Note</div>
              <div className="faucet-box-detail">recipient + config + amount</div>
            </div>
            <div className="faucet-arrow">→</div>
            <div className="faucet-box faucet">
              <div className="faucet-box-icon">🚰</div>
              <div className="faucet-box-label">Network Faucet</div>
              <div className="faucet-box-detail">distribute()</div>
            </div>
            <div className="faucet-arrow">→</div>
            <div className="faucet-box output">
              <div className="faucet-box-icon">💰</div>
              <div className="faucet-box-label">P2ID Note</div>
              <div className="faucet-box-detail">Minted tokens</div>
            </div>
            <div className="faucet-arrow">→</div>
            <div className="faucet-box" style={{ background: '#f778ba22', borderColor: '#f778ba' }}>
              <div className="faucet-box-icon">🎯</div>
              <div className="faucet-box-label" style={{ color: '#f778ba' }}>Recipient</div>
              <div className="faucet-box-detail">Claims output note</div>
            </div>
          </div>
        </div>
        
        <div className="note-box" style={{ borderLeftColor: '#56d364', marginTop: '25px' }}>
          <p><strong>Key Operations:</strong></p>
          <p style={{ marginTop: '10px' }}>1. <strong>Input Validation:</strong> Ensures exactly 9 note inputs</p>
          <p>2. <strong>Data Loading:</strong> Loads RECIPIENT (4 elements), config (4 elements), and amount (1 element) from memory</p>
          <p>3. <strong>Stack Preparation:</strong> Arranges stack to match <code>distribute</code> calling convention</p>
          <p>4. <strong>Minting:</strong> Calls faucet's <code>distribute</code> which creates new tokens and an output note</p>
        </div>
        
        <div className="memory-section" style={{ marginTop: '20px', border: '2px solid #58a6ff' }}>
          <div style={{ fontSize: '0.8rem', color: '#58a6ff', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Comparison: Note Types</div>
          <table className="inputs-table" style={{ marginTop: 0 }}>
            <thead>
              <tr>
                <th>Aspect</th>
                <th>P2ID / P2IDE</th>
                <th>SWAP</th>
                <th>MINT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Purpose</td>
                <td>Transfer existing assets</td>
                <td>Exchange assets</td>
                <td>Create new tokens</td>
              </tr>
              <tr>
                <td>Target Account</td>
                <td>Any wallet</td>
                <td>Any wallet with matching asset</td>
                <td style={{ color: '#f0883e' }}>Network Faucet only</td>
              </tr>
              <tr>
                <td>Creates Output Note</td>
                <td style={{ color: '#f85149' }}>No</td>
                <td style={{ color: '#56d364' }}>Yes (payback)</td>
                <td style={{ color: '#56d364' }}>Yes (to recipient)</td>
              </tr>
              <tr>
                <td>Asset Flow</td>
                <td>Note → Account</td>
                <td>Bidirectional</td>
                <td>Faucet → New Note → Recipient</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MINT;
