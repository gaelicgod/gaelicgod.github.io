import './P2ID.css';

function P2ID() {
  return (
    <div className="container">
      <h1>MASM P2ID Script Execution</h1>
      <p className="subtitle">Miden Assembly • Pay-to-ID Note Script</p>

      {/* Overview Section */}
      <div className="overview">
        <h2>📋 Script Overview</h2>
        <div className="flow-diagram">
          <div className="flow-node">
            <div className="flow-node-title">INPUT</div>
            <div className="flow-node-content">P2ID Note</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">READ</div>
            <div className="flow-node-content">Target Account ID</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">VALIDATE</div>
            <div className="flow-node-content">ID Comparison</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">TRANSFER</div>
            <div className="flow-node-content">Add All Assets</div>
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: '#a371f7' }}>Expected Note Inputs (2 elements)</h3>
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
              <td style={{ color: '#f778ba' }}>target_account_id_prefix</td>
              <td>First half of the target account ID</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>1</td>
              <td style={{ color: '#f778ba' }}>target_account_id_suffix</td>
              <td>Second half of the target account ID</td>
            </tr>
          </tbody>
        </table>

        <div className="note-box" style={{ marginTop: '20px', borderLeftColor: '#f778ba' }}>
          <p>🔐 <strong>Security Model:</strong> P2ID ensures only the intended recipient can claim the note's assets. The note will panic if consumed by any account other than the one specified in the note inputs.</p>
        </div>
      </div>

      {/* Phase 1: Load Note Inputs */}
      <div className="phase init">
        <div className="phase-header">
          <div className="phase-number">1</div>
          <div className="phase-title">Load Note Inputs into Memory</div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">padw</span> <span className="keyword">push</span>.<span className="number">0</span> <span className="procedure">exec.active_note::get_inputs</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item value">num_inputs (2)</span>
                <span className="stack-item ptr">inputs_ptr (0)</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">eq</span>.<span className="number">2</span> <span className="keyword">assert</span>.err=ERR_P2ID_WRONG_NUMBER_OF_INPUTS</code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item ptr">inputs_ptr (0)</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="memory-section">
          <div className="memory-title">Memory Layout (After get_inputs)</div>
          <div className="memory-grid">
            <div className="memory-cell">
              <div className="memory-addr">Address 0</div>
              <div className="memory-content">target_account_id_prefix</div>
            </div>
            <div className="memory-cell">
              <div className="memory-addr">Address 1</div>
              <div className="memory-content">target_account_id_suffix</div>
            </div>
            <div className="memory-cell" style={{ borderLeftColor: '#484f58' }}>
              <div className="memory-addr">Address 2-3</div>
              <div className="memory-content" style={{ color: '#484f58' }}>(unused)</div>
            </div>
          </div>
        </div>

        <div className="note-box">
          <p>💡 <code>padw</code> pushes 4 zeros (EMPTY_WORD), then <code>push.0</code> sets the memory destination. <code>get_inputs</code> stores inputs at address 0 and returns the count. The assertion ensures exactly 2 inputs exist.</p>
        </div>
      </div>

      {/* Phase 2: Read Target Account ID */}
      <div className="phase inputs">
        <div className="phase-header">
          <div className="phase-number">2</div>
          <div className="phase-title">Read Target Account ID from Memory</div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">mem_loadw_be</span>
<span className="comment"># loads word from address on stack (0)</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item target">target_id_prefix</span>
                <span className="stack-item target">target_id_suffix</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">drop</span> <span className="keyword">drop</span>
<span className="comment"># remove unused elements (addresses 2-3)</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item target">target_id_prefix</span>
                <span className="stack-item target">target_id_suffix</span>
              </div>
            </div>
          </div>
        </div>

        <div className="note-box">
          <p>💡 <code>mem_loadw_be</code> loads 4 elements from memory in big-endian order. Since we only need 2 elements (the account ID), we drop the extra 2 values that were loaded from addresses 2-3.</p>
        </div>
      </div>

      {/* Phase 3: Validate Account ID */}
      <div className="phase validate">
        <div className="phase-header">
          <div className="phase-number">3</div>
          <div className="phase-title">Validate Account ID Match</div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.active_account::get_id</span>
<span className="comment"># get executing account's ID</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item id">account_id_prefix</span>
                <span className="stack-item id">account_id_suffix</span>
                <span className="stack-item target">target_id_prefix</span>
                <span className="stack-item target">target_id_suffix</span>
                <span className="stack-item pad">...</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.account_id::is_equal</span>
<span className="keyword">assert</span>.err=ERR_P2ID_TARGET_ACCT_MISMATCH</code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item empty">[ empty ]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="comparison-box">
          <div className="id-box account">
            <div className="id-box-label">Executing Account ID</div>
            <div className="id-box-content">
              <div>prefix: account_id_prefix</div>
              <div>suffix: account_id_suffix</div>
            </div>
          </div>
          <div className="equals-sign">==</div>
          <div className="id-box target">
            <div className="id-box-label">Target Account ID</div>
            <div className="id-box-content">
              <div>prefix: target_id_prefix</div>
              <div>suffix: target_id_suffix</div>
            </div>
          </div>
        </div>

        <div className="note-box" style={{ borderLeftColor: '#f778ba' }}>
          <p>🔐 <strong>Critical Security Check:</strong> <code>is_equal</code> compares both account IDs. If they don't match, the assertion fails with <code>ERR_P2ID_TARGET_ACCT_MISMATCH</code> and the transaction is rejected. Only the intended recipient can proceed.</p>
        </div>
      </div>

      {/* Phase 4: Transfer Assets */}
      <div className="phase transfer">
        <div className="phase-header">
          <div className="phase-number">4</div>
          <div className="phase-title">Transfer All Assets to Account</div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.active_note::add_assets_to_account</span>
<span className="comment"># transfers all note assets to the account</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item empty">[ empty ]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="note-box" style={{ borderLeftColor: '#56d364' }}>
          <p>✅ <strong>Asset Transfer:</strong> <code>add_assets_to_account</code> is a convenience procedure that iterates through all assets in the note and adds each one to the executing account's vault. This handles both fungible and non-fungible assets.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="phase" style={{ borderTop: '4px solid #56d364' }}>
        <div className="phase-header">
          <div className="phase-number" style={{ background: '#56d36433', color: '#56d364' }}>✓</div>
          <div className="phase-title">Execution Summary</div>
        </div>

        <div className="flow-diagram" style={{ marginTop: '20px' }}>
          <div className="flow-node" style={{ borderColor: '#a371f7' }}>
            <div className="flow-node-title">NOTE SENDER</div>
            <div className="flow-node-content" style={{ color: '#a371f7' }}>Creates P2ID Note</div>
            <div style={{ fontSize: '0.7rem', color: '#8b949e', marginTop: '5px' }}>specifies target account</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node" style={{ borderColor: '#f778ba' }}>
            <div className="flow-node-title">ID VALIDATION</div>
            <div className="flow-node-content" style={{ color: '#f778ba' }}>account == target?</div>
            <div style={{ fontSize: '0.7rem', color: '#8b949e', marginTop: '5px' }}>cryptographic check</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node" style={{ borderColor: '#56d364' }}>
            <div className="flow-node-title">TARGET ACCOUNT</div>
            <div className="flow-node-content" style={{ color: '#56d364' }}>Receives All Assets</div>
            <div style={{ fontSize: '0.7rem', color: '#8b949e', marginTop: '5px' }}>added to vault</div>
          </div>
        </div>

        <div className="note-box" style={{ borderLeftColor: '#56d364' }}>
          <p><strong>Key Operations:</strong></p>
          <p style={{ marginTop: '10px' }}>1. <strong>Input Validation:</strong> Ensures exactly 2 note inputs (account ID prefix + suffix)</p>
          <p>2. <strong>ID Extraction:</strong> Loads target account ID from memory</p>
          <p>3. <strong>Authorization:</strong> Compares executing account ID with target ID</p>
          <p>4. <strong>Asset Transfer:</strong> Adds all note assets to the validated account</p>
        </div>

        <div className="comparison-box" style={{ marginTop: '20px', border: '2px solid #58a6ff' }}>
          <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#58a6ff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Comparison: SWAP vs P2ID</div>
            <table className="inputs-table" style={{ marginTop: 0 }}>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>SWAP Script</th>
                  <th>P2ID Script</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Note Inputs</td>
                  <td>12 (asset + recipient + details)</td>
                  <td>2 (account ID only)</td>
                </tr>
                <tr>
                  <td>Creates Output Note</td>
                  <td style={{ color: '#56d364' }}>Yes (payback note)</td>
                  <td style={{ color: '#f85149' }}>No</td>
                </tr>
                <tr>
                  <td>Asset Direction</td>
                  <td>Bidirectional exchange</td>
                  <td>Unidirectional transfer</td>
                </tr>
                <tr>
                  <td>Authorization</td>
                  <td>Anyone with matching asset</td>
                  <td>Specific account ID only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default P2ID;
