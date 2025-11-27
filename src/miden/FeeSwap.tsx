import './FeeSwap.css';

function FeeSwap() {
  return (
    <div className="container">
      <h1>Fee-Enabled SWAP Script Architecture</h1>
      <p className="subtitle">Miden Assembly • Maker/Taker Fee Extraction for Lumina</p>
      
      {/* Overview: Current vs Proposed */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: '#58a6ff33', color: '#58a6ff' }}>📊</div>
          <div className="section-title">Asset Flow Comparison</div>
        </div>
        
        <div className="comparison-grid">
          <div className="comparison-side before">
            <div className="comparison-title">Current SWAP (No Fees)</div>
            <div className="flow-container" style={{ background: 'transparent', padding: '15px', border: 'none' }}>
              <div className="flow-row">
                <div className="flow-box actor">
                  <div className="flow-box-label">Consumer</div>
                  <div className="flow-box-content">Taker</div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-box asset">
                  <div className="flow-box-label">Full Amount</div>
                  <div className="flow-box-content">REQUESTED</div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-box actor">
                  <div className="flow-box-label">Issuer</div>
                  <div className="flow-box-content">Maker</div>
                </div>
              </div>
              <div className="flow-row">
                <div className="flow-box actor">
                  <div className="flow-box-label">Issuer</div>
                  <div className="flow-box-content">Maker</div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-box asset">
                  <div className="flow-box-label">Full Amount</div>
                  <div className="flow-box-content">OFFERED</div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-box actor">
                  <div className="flow-box-label">Consumer</div>
                  <div className="flow-box-content">Taker</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="comparison-side after">
            <div className="comparison-title">Proposed SWAP (With Fees)</div>
            <div className="flow-container" style={{ background: 'transparent', padding: '15px', border: 'none' }}>
              <div className="flow-row">
                <div className="flow-box actor">
                  <div className="flow-box-label">Consumer</div>
                  <div className="flow-box-content">Taker</div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-split">
                  <div className="flow-box asset" style={{ minWidth: '100px' }}>
                    <div className="flow-box-content">REQ - fee</div>
                  </div>
                  <div className="split-label">SPLIT</div>
                  <div className="flow-box fee" style={{ minWidth: '100px' }}>
                    <div className="flow-box-content">taker_fee</div>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="flow-box actor" style={{ minWidth: '100px' }}>
                    <div className="flow-box-content">Maker</div>
                  </div>
                  <div className="flow-box collector" style={{ minWidth: '100px' }}>
                    <div className="flow-box-content">Fee Vault</div>
                  </div>
                </div>
              </div>
              <div className="flow-row">
                <div className="flow-box actor">
                  <div className="flow-box-label">Issuer</div>
                  <div className="flow-box-content">Maker</div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-split">
                  <div className="flow-box asset" style={{ minWidth: '100px' }}>
                    <div className="flow-box-content">OFF - fee</div>
                  </div>
                  <div className="split-label">SPLIT</div>
                  <div className="flow-box fee" style={{ minWidth: '100px' }}>
                    <div className="flow-box-content">maker_fee</div>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="flow-box actor" style={{ minWidth: '100px' }}>
                    <div className="flow-box-content">Taker</div>
                  </div>
                  <div className="flow-box collector" style={{ minWidth: '100px' }}>
                    <div className="flow-box-content">Fee Vault</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="note-box">
          <p>💡 <strong>Two Fee Extraction Points:</strong> Taker fee is deducted from REQUESTED_ASSET before it goes to the payback note (maker receives less). Maker fee is deducted from the SWAP note's OFFERED_ASSET before the consumer receives it (taker receives less).</p>
        </div>
      </div>
      
      {/* Extended Note Inputs */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: '#a371f733', color: '#a371f7' }}>📥</div>
          <div className="section-title">Extended Note Inputs (12 → 20)</div>
        </div>
        
        <table className="inputs-table">
          <thead>
            <tr>
              <th>Addr</th>
              <th>Content</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: '#79c0ff' }}>0-3</td>
              <td style={{ color: '#f778ba' }}>REQUESTED_ASSET</td>
              <td>Asset the maker wants to receive</td>
              <td><span className="badge existing">existing</span></td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>4-7</td>
              <td style={{ color: '#a371f7' }}>PAYBACK_RECIPIENT</td>
              <td>Recipient digest for payback note (to maker)</td>
              <td><span className="badge existing">existing</span></td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>8</td>
              <td style={{ color: '#8b949e' }}>execution_hint</td>
              <td>Payback note execution hint</td>
              <td><span className="badge existing">existing</span></td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>9</td>
              <td style={{ color: '#8b949e' }}>note_type</td>
              <td>Payback note type</td>
              <td><span className="badge existing">existing</span></td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>10</td>
              <td style={{ color: '#8b949e' }}>aux</td>
              <td>Payback note auxiliary data</td>
              <td><span className="badge existing">existing</span></td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>11</td>
              <td style={{ color: '#8b949e' }}>tag</td>
              <td>Payback note tag</td>
              <td><span className="badge existing">existing</span></td>
            </tr>
            <tr className="new-input">
              <td style={{ color: '#f0883e' }}>12-15</td>
              <td style={{ color: '#f0883e' }}>FEE_RECIPIENT</td>
              <td>Recipient digest for fee note (Lumina treasury)</td>
              <td><span className="badge new">new</span></td>
            </tr>
            <tr className="new-input">
              <td style={{ color: '#f0883e' }}>16</td>
              <td style={{ color: '#f0883e' }}>fee_execution_hint</td>
              <td>Fee note execution hint</td>
              <td><span className="badge new">new</span></td>
            </tr>
            <tr className="new-input">
              <td style={{ color: '#f0883e' }}>17</td>
              <td style={{ color: '#f0883e' }}>fee_note_type</td>
              <td>Fee note type (likely private)</td>
              <td><span className="badge new">new</span></td>
            </tr>
            <tr className="new-input">
              <td style={{ color: '#f0883e' }}>18</td>
              <td style={{ color: '#f0883e' }}>fee_aux</td>
              <td>Fee note auxiliary data</td>
              <td><span className="badge new">new</span></td>
            </tr>
            <tr className="new-input">
              <td style={{ color: '#f0883e' }}>19</td>
              <td style={{ color: '#f0883e' }}>fee_tag</td>
              <td>Fee note tag</td>
              <td><span className="badge new">new</span></td>
            </tr>
            <tr className="new-input">
              <td style={{ color: '#f0883e' }}>20</td>
              <td style={{ color: '#f0883e' }}>fee_bps</td>
              <td>Fee in basis points (e.g., 1 = 0.01%)</td>
              <td><span className="badge new">new</span></td>
            </tr>
          </tbody>
        </table>
        
        <div className="note-box warning">
          <p>⚠️ <strong>Alternative: Hardcoded Fees</strong> — If fee rate and recipient are constant, you could hardcode them in the script instead of note inputs. This saves 9 inputs but requires script updates to change fees.</p>
        </div>
      </div>
      
      {/* Fee Calculation Procedure */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: '#f0883e33', color: '#f0883e' }}>🔢</div>
          <div className="section-title">Fee Calculation Procedure</div>
        </div>
        
        <div className="proc-diagram">
          <div className="proc-title">proc.calculate_fee</div>
          <div className="proc-signature">
            <span className="name">proc.calculate_fee</span><br/>
            <span className="comment"># Inputs:  [amount, fee_bps]</span><br/>
            <span className="comment"># Outputs: [fee_amount, net_amount]</span>
          </div>
          <div className="proc-steps">
            <div className="proc-step">
              <div className="proc-step-num">1</div>
              <div className="proc-step-content">
                <code>dup.1 dup.1</code> — Duplicate both inputs for later use<br/>
                <span style={{ color: '#8b949e' }}>Stack: [amount, fee_bps, amount, fee_bps]</span>
              </div>
            </div>
            <div className="proc-step">
              <div className="proc-step-num">2</div>
              <div className="proc-step-content">
                <code>mul</code> — Multiply amount × fee_bps<br/>
                <span style={{ color: '#8b949e' }}>Stack: [amount * fee_bps, amount, fee_bps]</span>
              </div>
            </div>
            <div className="proc-step">
              <div className="proc-step-num">3</div>
              <div className="proc-step-content">
                <code>push.10000 div</code> — Divide by 10000 to get fee<br/>
                <span style={{ color: '#8b949e' }}>Stack: [fee_amount, amount, fee_bps]</span>
              </div>
            </div>
            <div className="proc-step">
              <div className="proc-step-num">4</div>
              <div className="proc-step-content">
                <code>swap drop</code> — Remove fee_bps, keep amount<br/>
                <span style={{ color: '#8b949e' }}>Stack: [fee_amount, amount]</span>
              </div>
            </div>
            <div className="proc-step">
              <div className="proc-step-num">5</div>
              <div className="proc-step-content">
                <code>dup movup.2 sub</code> — Calculate net = amount - fee<br/>
                <span style={{ color: '#8b949e' }}>Stack: [fee_amount, net_amount]</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="code-section">
          <div className="code-title">📝 MASM Implementation</div>
          <pre className="code-block">{`#! Calculates fee and net amount from a gross amount and fee rate.
#!
#! Inputs:  [amount, fee_bps]
#! Outputs: [fee_amount, net_amount]
#!
#! fee_bps is in basis points: 1 = 0.01%, 10 = 0.1%, 100 = 1%
`}<span className="keyword">proc</span>.<span className="label">calculate_fee</span>{`
    `}<span className="comment"># duplicate inputs: [amount, fee_bps] -&gt; [amount, fee_bps, amount, fee_bps]</span>{`
    `}<span className="keyword">dup</span>.<span className="number">1</span> <span className="keyword">dup</span>.<span className="number">1</span>{`
    
    `}<span className="comment"># calculate fee_amount = (amount * fee_bps) / 10000</span>{`
    `}<span className="keyword">mul</span>{`
    `}<span className="keyword">push</span>.<span className="number">10000</span>{`
    `}<span className="keyword">div</span>{`
    `}<span className="comment"># =&gt; [fee_amount, amount, fee_bps]</span>{`
    
    `}<span className="comment"># clean up and calculate net_amount</span>{`
    `}<span className="keyword">swap</span> <span className="keyword">drop</span>{`
    `}<span className="comment"># =&gt; [fee_amount, amount]</span>{`
    
    `}<span className="keyword">dup</span> <span className="keyword">movup</span>.<span className="number">2</span> <span className="keyword">sub</span>{`
    `}<span className="comment"># =&gt; [fee_amount, net_amount]</span>{`
`}<span className="keyword">end</span></pre>
        </div>
        
        <div className="stack-section">
          <div className="stack-title">Example: 1,000,000 tokens @ 1 bps (0.01%)</div>
          <div className="stack-items">
            <span className="stack-item amount">amount: 1000000</span>
            <span className="stack-item fee">fee_bps: 1</span>
            <span style={{ padding: '8px', color: '#484f58' }}>→</span>
            <span className="stack-item fee">fee: 100</span>
            <span className="stack-item result">net: 999900</span>
          </div>
        </div>
      </div>
      
      {/* Asset Splitting Procedure */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: '#56d36433', color: '#56d364' }}>✂️</div>
          <div className="section-title">Asset Splitting Procedure</div>
        </div>
        
        <div className="note-box">
          <p>💡 <strong>Fungible Asset Structure:</strong> A Miden fungible asset is a Word [faucet_prefix, faucet_suffix, 0, amount]. To split an asset, we create two new Words with the same faucet ID but different amounts.</p>
        </div>
        
        <div className="code-section">
          <div className="code-title">📝 MASM Implementation</div>
          <pre className="code-block">{`#! Splits a fungible asset into net asset and fee asset.
#!
#! Inputs:  [ASSET, fee_bps] where ASSET = [faucet_prefix, faucet_suffix, 0, amount]
#! Outputs: [NET_ASSET, FEE_ASSET]
#!
#! Both output assets have the same faucet ID, just different amounts.
`}<span className="keyword">proc</span>.<span className="label">split_asset_for_fee</span>{`
    `}<span className="comment"># Stack: [faucet_prefix, faucet_suffix, 0, amount, fee_bps]</span>{`
    
    `}<span className="comment"># extract amount and calculate fee</span>{`
    `}<span className="keyword">movup</span>.<span className="number">4</span>{`
    `}<span className="comment"># =&gt; [fee_bps, faucet_prefix, faucet_suffix, 0, amount]</span>{`
    
    `}<span className="keyword">dup</span>.<span className="number">4</span>{`
    `}<span className="comment"># =&gt; [amount, fee_bps, faucet_prefix, faucet_suffix, 0, amount]</span>{`
    
    `}<span className="keyword">swap</span>{`
    `}<span className="comment"># =&gt; [fee_bps, amount, faucet_prefix, faucet_suffix, 0, amount]</span>{`
    
    `}<span className="procedure">exec</span>.<span className="label">calculate_fee</span>{`
    `}<span className="comment"># =&gt; [fee_amount, net_amount, faucet_prefix, faucet_suffix, 0, amount]</span>{`
    
    `}<span className="comment"># drop original amount, keep net_amount</span>{`
    `}<span className="keyword">movdn</span>.<span className="number">5</span> <span className="keyword">drop</span>{`
    `}<span className="comment"># =&gt; [net_amount, faucet_prefix, faucet_suffix, 0, fee_amount]</span>{`
    
    `}<span className="comment"># reorder to form NET_ASSET</span>{`
    `}<span className="keyword">movdn</span>.<span className="number">3</span>{`
    `}<span className="comment"># =&gt; [faucet_prefix, faucet_suffix, 0, net_amount, fee_amount]</span>{`
    
    `}<span className="comment"># duplicate faucet ID for FEE_ASSET</span>{`
    `}<span className="keyword">dup</span>.<span className="number">1</span> <span className="keyword">dup</span>.<span className="number">1</span>{`
    `}<span className="comment"># =&gt; [faucet_prefix, faucet_suffix, faucet_prefix, faucet_suffix, 0, net_amount, fee_amount]</span>{`
    
    `}<span className="comment"># construct FEE_ASSET: [faucet_prefix, faucet_suffix, 0, fee_amount]</span>{`
    `}<span className="keyword">push</span>.<span className="number">0</span> <span className="keyword">movup</span>.<span className="number">7</span>{`
    `}<span className="comment"># =&gt; [faucet_prefix, faucet_suffix, 0, fee_amount, faucet_prefix, faucet_suffix, 0, net_amount]</span>{`
    
    `}<span className="comment"># Final: [FEE_ASSET, NET_ASSET]</span>{`
    `}<span className="comment"># (order may need adjustment based on usage)</span>{`
`}<span className="keyword">end</span></pre>
        </div>
        
        <div className="stack-section">
          <div className="stack-title">Asset Split Visualization</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>
            <div style={{ background: '#0d1117', padding: '15px', borderRadius: '8px', border: '2px solid #238636' }}>
              <div style={{ fontSize: '0.7rem', color: '#8b949e', marginBottom: '10px' }}>INPUT ASSET</div>
              <div className="stack-items">
                <span className="stack-item faucet">faucet_prefix</span>
                <span className="stack-item faucet">faucet_suffix</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item amount">1,000,000</span>
              </div>
            </div>
            <div style={{ fontSize: '2rem', color: '#f0883e' }}>→</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#0d1117', padding: '15px', borderRadius: '8px', border: '2px solid #56d364' }}>
                <div style={{ fontSize: '0.7rem', color: '#56d364', marginBottom: '10px' }}>NET ASSET</div>
                <div className="stack-items">
                  <span className="stack-item faucet">faucet_prefix</span>
                  <span className="stack-item faucet">faucet_suffix</span>
                  <span className="stack-item pad">0</span>
                  <span className="stack-item result">999,900</span>
                </div>
              </div>
              <div style={{ background: '#0d1117', padding: '15px', borderRadius: '8px', border: '2px solid #f0883e' }}>
                <div style={{ fontSize: '0.7rem', color: '#f0883e', marginBottom: '10px' }}>FEE ASSET</div>
                <div className="stack-items">
                  <span className="stack-item faucet">faucet_prefix</span>
                  <span className="stack-item faucet">faucet_suffix</span>
                  <span className="stack-item pad">0</span>
                  <span className="stack-item fee">100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modified Execution Flow */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: '#da363333', color: '#f85149' }}>🔄</div>
          <div className="section-title">Modified Execution Flow</div>
        </div>
        
        <div className="phase-grid">
          <div className="phase-box original">
            <div className="phase-header">
              <div className="phase-number">1</div>
              <div className="phase-title">Load Inputs & Create Payback Note</div>
            </div>
            <div className="phase-content">
              Same as original: load 12→21 inputs, create payback note for maker.
              <br/><br/>
              <strong>Change:</strong> Also load FEE_RECIPIENT and fee config from addresses 12-20.
            </div>
          </div>
          
          <div className="phase-box modified">
            <div className="phase-header">
              <div className="phase-number">2</div>
              <div className="phase-title">Create Fee Note</div>
            </div>
            <div className="phase-content">
              <strong>NEW:</strong> Create a second output note for fees.<br/><br/>
              <code>exec.output_note::create</code> with FEE_RECIPIENT.<br/><br/>
              Store fee_note_idx for later use.
            </div>
          </div>
          
          <div className="phase-box modified">
            <div className="phase-header">
              <div className="phase-number">3</div>
              <div className="phase-title">Split REQUESTED_ASSET (Taker Fee)</div>
            </div>
            <div className="phase-content">
              <strong>NEW:</strong> Before moving to payback note:<br/><br/>
              <code>exec.split_asset_for_fee</code><br/><br/>
              • NET → payback note (maker receives)<br/>
              • FEE → fee note (Lumina receives)
            </div>
          </div>
          
          <div className="phase-box original">
            <div className="phase-header">
              <div className="phase-number">4</div>
              <div className="phase-title">Move NET to Payback Note</div>
            </div>
            <div className="phase-content">
              <code>call.wallet::move_asset_to_note</code><br/><br/>
              <strong>Change:</strong> Now moves NET_ASSET instead of full REQUESTED_ASSET.
            </div>
          </div>
          
          <div className="phase-box modified">
            <div className="phase-header">
              <div className="phase-number">5</div>
              <div className="phase-title">Add Taker Fee to Fee Note</div>
            </div>
            <div className="phase-content">
              <strong>NEW:</strong> Add the taker fee to fee note:<br/><br/>
              <code>exec.output_note::add_asset</code> with FEE_ASSET and fee_note_idx.
            </div>
          </div>
          
          <div className="phase-box original">
            <div className="phase-header">
              <div className="phase-number">6</div>
              <div className="phase-title">Load SWAP Note's OFFERED_ASSET</div>
            </div>
            <div className="phase-content">
              Same as original: <code>exec.active_note::get_assets</code>, load the offered asset.
            </div>
          </div>
          
          <div className="phase-box modified">
            <div className="phase-header">
              <div className="phase-number">7</div>
              <div className="phase-title">Split OFFERED_ASSET (Maker Fee)</div>
            </div>
            <div className="phase-content">
              <strong>NEW:</strong> Before receiving:<br/><br/>
              <code>exec.split_asset_for_fee</code><br/><br/>
              • NET → consumer's vault (taker receives)<br/>
              • FEE → fee note (Lumina receives)
            </div>
          </div>
          
          <div className="phase-box modified">
            <div className="phase-header">
              <div className="phase-number">8</div>
              <div className="phase-title">Add Maker Fee to Fee Note</div>
            </div>
            <div className="phase-content">
              <strong>NEW:</strong> Add maker fee to same fee note:<br/><br/>
              <code>exec.output_note::add_asset</code> with FEE_ASSET.<br/><br/>
              Fee note now has both fees (possibly different tokens).
            </div>
          </div>
          
          <div className="phase-box original">
            <div className="phase-header">
              <div className="phase-number">9</div>
              <div className="phase-title">Receive NET to Consumer Vault</div>
            </div>
            <div className="phase-content">
              <code>call.wallet::receive_asset</code><br/><br/>
              <strong>Change:</strong> Now receives NET_ASSET instead of full OFFERED_ASSET.
            </div>
          </div>
        </div>
      </div>
      
      {/* Complete Flow Diagram */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: '#56d36433', color: '#56d364' }}>🎯</div>
          <div className="section-title">Complete Fee-Enabled Flow</div>
        </div>
        
        <div className="flow-container">
          <div className="flow-title">Regular SWAP with Maker & Taker Fees</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
            {/* Taker Fee Flow */}
            <div style={{ background: '#161b22', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f0883e' }}>
              <div style={{ fontSize: '0.8rem', color: '#f0883e', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Taker Fee (REQUESTED_ASSET flow)</div>
              <div className="flow-row" style={{ justifyContent: 'flex-start' }}>
                <div className="flow-box actor">
                  <div className="flow-box-label">Consumer</div>
                  <div className="flow-box-content">Taker Vault</div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-box asset">
                  <div className="flow-box-label">REQUESTED</div>
                  <div className="flow-box-content">1,000,000</div>
                </div>
                <div className="flow-arrow">→</div>
                <div style={{ background: '#f0883e22', padding: '15px', borderRadius: '10px', border: '2px dashed #f0883e' }}>
                  <div style={{ fontSize: '0.7rem', color: '#f0883e', marginBottom: '8px' }}>SPLIT @ 1bps</div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="flow-box asset" style={{ minWidth: 'auto', padding: '10px' }}>
                      <div className="flow-box-content">999,900</div>
                    </div>
                    <div className="flow-box fee" style={{ minWidth: 'auto', padding: '10px' }}>
                      <div className="flow-box-content">100</div>
                    </div>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="flow-box note">
                    <div className="flow-box-label">Payback Note</div>
                    <div className="flow-box-content">→ Maker</div>
                  </div>
                  <div className="flow-box collector">
                    <div className="flow-box-label">Fee Note</div>
                    <div className="flow-box-content">→ Lumina</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Maker Fee Flow */}
            <div style={{ background: '#161b22', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #56d364' }}>
              <div style={{ fontSize: '0.8rem', color: '#56d364', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Maker Fee (OFFERED_ASSET flow)</div>
              <div className="flow-row" style={{ justifyContent: 'flex-start' }}>
                <div className="flow-box note">
                  <div className="flow-box-label">SWAP Note</div>
                  <div className="flow-box-content">From Maker</div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-box asset">
                  <div className="flow-box-label">OFFERED</div>
                  <div className="flow-box-content">500 ETH</div>
                </div>
                <div className="flow-arrow">→</div>
                <div style={{ background: '#56d36422', padding: '15px', borderRadius: '10px', border: '2px dashed #56d364' }}>
                  <div style={{ fontSize: '0.7rem', color: '#56d364', marginBottom: '8px' }}>SPLIT @ 1bps</div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="flow-box asset" style={{ minWidth: 'auto', padding: '10px' }}>
                      <div className="flow-box-content">499.95</div>
                    </div>
                    <div className="flow-box fee" style={{ minWidth: 'auto', padding: '10px' }}>
                      <div className="flow-box-content">0.05</div>
                    </div>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="flow-box actor">
                    <div className="flow-box-label">Consumer</div>
                    <div className="flow-box-content">Taker Vault</div>
                  </div>
                  <div className="flow-box collector">
                    <div className="flow-box-label">Fee Note</div>
                    <div className="flow-box-content">→ Lumina</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="note-box success">
          <p>✅ <strong>Result:</strong> Single fee note contains both taker fee (in REQUESTED token) and maker fee (in OFFERED token). Lumina treasury receives one note with potentially multiple assets.</p>
        </div>
      </div>
      
      {/* Edge Cases */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: '#da363333', color: '#f85149' }}>⚠️</div>
          <div className="section-title">Edge Cases & Considerations</div>
        </div>
        
        <div className="phase-grid">
          <div className="phase-box modified">
            <div className="phase-header">
              <div className="phase-number">!</div>
              <div className="phase-title">Zero Fee</div>
            </div>
            <div className="phase-content">
              If amount &lt; 10000 and fee_bps = 1, fee rounds to 0.<br/><br/>
              <strong>Options:</strong><br/>
              • Skip fee note creation if fee == 0<br/>
              • Enforce minimum trade size<br/>
              • Round up instead of down
            </div>
          </div>
          
          <div className="phase-box modified">
            <div className="phase-header">
              <div className="phase-number">!</div>
              <div className="phase-title">In-Flight SWAP</div>
            </div>
            <div className="phase-content">
              Your BSWAP has two paths. Fee logic needs to work for both:<br/><br/>
              • Regular: split before <code>move_asset_to_note</code><br/>
              • In-flight: split before <code>add_asset</code><br/><br/>
              Same split logic, different destination.
            </div>
          </div>
          
          <div className="phase-box modified">
            <div className="phase-header">
              <div className="phase-number">!</div>
              <div className="phase-title">Multi-Asset Fee Note</div>
            </div>
            <div className="phase-content">
              Fee note receives two different tokens (REQUESTED and OFFERED).<br/><br/>
              Miden notes support multiple assets, but verify <code>add_asset</code> can be called twice on same note.
            </div>
          </div>
          
          <div className="phase-box modified">
            <div className="phase-header">
              <div className="phase-number">!</div>
              <div className="phase-title">Fee Note Script</div>
            </div>
            <div className="phase-content">
              The fee note needs a script. Options:<br/><br/>
              • P2ID to Lumina treasury account<br/>
              • Custom script with multi-sig<br/>
              • P2IDE with timelock for disputes
            </div>
          </div>
        </div>
      </div>
      
      {/* Skeleton Script */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: '#58a6ff33', color: '#58a6ff' }}>📜</div>
          <div className="section-title">Script Skeleton</div>
        </div>
        
        <div className="code-section">
          <div className="code-title">📝 Fee-Enabled SWAP Script (Pseudocode)</div>
          <pre className="code-block"><span className="keyword">use</span>{`.miden::active_note
`}<span className="keyword">use</span>{`.miden::output_note
`}<span className="keyword">use</span>{`.miden::contracts::wallets::basic->wallet

`}<span className="keyword">const</span>{`.SWAP_NOTE_INPUTS_NUMBER=`}<span className="number">21</span>  <span className="comment"># Extended from 12</span>{`
`}<span className="keyword">const</span>{`.FEE_BPS_ADDR=`}<span className="number">20</span>{`

`}<span className="comment"># ... error constants ...</span>{`

`}<span className="comment">#! Calculate fee and net amount</span>{`
`}<span className="keyword">proc</span>.<span className="label">calculate_fee</span>{`
    `}<span className="comment"># [amount, fee_bps] -> [fee_amount, net_amount]</span>{`
    `}<span className="comment"># ... implementation above ...</span>{`
`}<span className="keyword">end</span>{`

`}<span className="comment">#! Split fungible asset into net and fee portions</span>{`
`}<span className="keyword">proc</span>.<span className="label">split_asset_for_fee</span>{`
    `}<span className="comment"># [ASSET, fee_bps] -> [NET_ASSET, FEE_ASSET]</span>{`
    `}<span className="comment"># ... implementation above ...</span>{`
`}<span className="keyword">end</span>{`

`}<span className="keyword">begin</span>{`
    `}<span className="keyword">dropw</span>{`
    
    `}<span className="comment"># ===== LOAD INPUTS =====</span>{`
    `}<span className="keyword">push</span>.<span className="number">0</span> <span className="procedure">exec</span>{`.active_note::get_inputs
    `}<span className="keyword">eq</span>.<span className="number">SWAP_NOTE_INPUTS_NUMBER</span> <span className="keyword">assert</span>{`.err=ERR_WRONG_INPUTS
    
    `}<span className="comment"># Load REQUESTED_ASSET [0-3]</span>{`
    `}<span className="keyword">mem_loadw_be</span>{`
    
    `}<span className="comment"># Load PAYBACK_RECIPIENT [4-7]</span>{`
    `}<span className="keyword">padw</span> <span className="keyword">mem_loadw_be</span>.<span className="number">4</span>{`
    
    `}<span className="comment"># Load payback config [8-11]</span>{`
    `}<span className="keyword">padw</span> <span className="keyword">mem_loadw_be</span>.<span className="number">8</span>{`
    
`}<span className="new-code">    <span className="comment"># Load FEE_RECIPIENT [12-15]</span>{`
    `}<span className="keyword">padw</span> <span className="keyword">mem_loadw_be</span>.<span className="number">12</span>{`
    
    `}<span className="comment"># Load fee config [16-19]</span>{`
    `}<span className="keyword">padw</span> <span className="keyword">mem_loadw_be</span>.<span className="number">16</span>{`
    
    `}<span className="comment"># Load fee_bps [20]</span>{`
    `}<span className="keyword">mem_load</span>.<span className="number">20</span></span>{`
    
    `}<span className="comment"># ===== CREATE PAYBACK NOTE =====</span>{`
    `}<span className="comment"># (same as original)</span>{`
    `}<span className="procedure">exec</span>{`.output_note::create
    `}<span className="comment"># =&gt; [payback_note_idx, ...]</span>{`
    
`}<span className="new-code">    <span className="comment"># ===== CREATE FEE NOTE =====</span>{`
    `}<span className="comment"># Stack: [..., FEE_RECIPIENT, fee_config...]</span>{`
    `}<span className="procedure">exec</span>{`.output_note::create
    `}<span className="comment"># =&gt; [fee_note_idx, payback_note_idx, ...]</span></span>{`
    
    `}<span className="comment"># ===== SPLIT REQUESTED_ASSET (TAKER FEE) =====</span>{`
`}<span className="new-code">    <span className="comment"># Stack has REQUESTED_ASSET and fee_bps somewhere</span>{`
    `}<span className="procedure">exec</span>{`.split_asset_for_fee
    `}<span className="comment"># =&gt; [NET_REQUESTED, FEE_REQUESTED, ...]</span>{`
    
    `}<span className="comment"># Add FEE_REQUESTED to fee note</span>{`
    `}<span className="comment"># (need fee_note_idx)</span>{`
    `}<span className="procedure">exec</span>{`.output_note::add_asset</span>{`
    
    `}<span className="comment"># ===== MOVE NET TO PAYBACK NOTE =====</span>{`
    `}<span className="comment"># (same pattern as original, but with NET_REQUESTED)</span>{`
    `}<span className="keyword">call</span>{`.wallet::move_asset_to_note
    
    `}<span className="comment"># ===== LOAD OFFERED ASSET =====</span>{`
    `}<span className="keyword">push</span>.<span className="number">0</span> <span className="procedure">exec</span>{`.active_note::get_assets
    `}<span className="keyword">assert</span>{`.err=ERR_WRONG_ASSETS
    `}<span className="keyword">mem_loadw_be</span>{`
    `}<span className="comment"># =&gt; [OFFERED_ASSET, ...]</span>{`
    
    `}<span className="comment"># ===== SPLIT OFFERED_ASSET (MAKER FEE) =====</span>{`
`}<span className="new-code">    <span className="comment"># Reload fee_bps from memory</span>{`
    `}<span className="keyword">mem_load</span>.<span className="number">20</span>{`
    `}<span className="procedure">exec</span>{`.split_asset_for_fee
    `}<span className="comment"># =&gt; [NET_OFFERED, FEE_OFFERED, ...]</span>{`
    
    `}<span className="comment"># Add FEE_OFFERED to fee note</span>{`
    `}<span className="procedure">exec</span>{`.output_note::add_asset</span>{`
    
    `}<span className="comment"># ===== RECEIVE NET TO CONSUMER =====</span>{`
    `}<span className="comment"># (same pattern as original, but with NET_OFFERED)</span>{`
    `}<span className="keyword">call</span>{`.wallet::receive_asset
    
    `}<span className="comment"># ===== CLEANUP =====</span>{`
    `}<span className="keyword">repeat</span>.<span className="number">4</span>{`
        `}<span className="keyword">dropw</span>{`
    `}<span className="keyword">end</span>{`
`}<span className="keyword">end</span></pre>
        </div>
        
        <div className="note-box warning">
          <p>⚠️ <strong>Stack Management Warning:</strong> This is a skeleton — the actual implementation requires careful stack manipulation. You'll need to track indices for both notes and ensure the right values are in position for each operation. Consider storing intermediate values in memory.</p>
        </div>
      </div>
      
      {/* Summary */}
      <div className="section" style={{ borderTop: '4px solid #56d364' }}>
        <div className="section-header">
          <div className="section-icon" style={{ background: '#56d36433', color: '#56d364' }}>✓</div>
          <div className="section-title">Implementation Roadmap</div>
        </div>
        
        <div className="phase-grid">
          <div className="phase-box" style={{ borderColor: '#58a6ff' }}>
            <div className="phase-header">
              <div className="phase-number" style={{ background: '#58a6ff33', color: '#58a6ff' }}>1</div>
              <div className="phase-title" style={{ color: '#58a6ff' }}>Write & Test calculate_fee</div>
            </div>
            <div className="phase-content">
              Standalone procedure. Test with various amounts and fee rates. Verify rounding behavior.
            </div>
          </div>
          
          <div className="phase-box" style={{ borderColor: '#a371f7' }}>
            <div className="phase-header">
              <div className="phase-number" style={{ background: '#a371f733', color: '#a371f7' }}>2</div>
              <div className="phase-title" style={{ color: '#a371f7' }}>Write & Test split_asset_for_fee</div>
            </div>
            <div className="phase-content">
              Uses calculate_fee. Test that output assets are valid and amounts sum correctly.
            </div>
          </div>
          
          <div className="phase-box" style={{ borderColor: '#f0883e' }}>
            <div className="phase-header">
              <div className="phase-number" style={{ background: '#f0883e33', color: '#f0883e' }}>3</div>
              <div className="phase-title" style={{ color: '#f0883e' }}>Modify SWAP for Single Fee</div>
            </div>
            <div className="phase-content">
              Start with just taker fee (on REQUESTED). Get one fee extraction working before adding second.
            </div>
          </div>
          
          <div className="phase-box" style={{ borderColor: '#56d364' }}>
            <div className="phase-header">
              <div className="phase-number" style={{ background: '#56d36433', color: '#56d364' }}>4</div>
              <div className="phase-title" style={{ color: '#56d364' }}>Add Maker Fee</div>
            </div>
            <div className="phase-content">
              Add second fee extraction on OFFERED. Both fees go to same fee note.
            </div>
          </div>
          
          <div className="phase-box" style={{ borderColor: '#f778ba' }}>
            <div className="phase-header">
              <div className="phase-number" style={{ background: '#f778ba33', color: '#f778ba' }}>5</div>
              <div className="phase-title" style={{ color: '#f778ba' }}>Adapt for BSWAP In-Flight</div>
            </div>
            <div className="phase-content">
              Ensure fee logic works in both regular and in-flight paths of your bilateral swap.
            </div>
          </div>
          
          <div className="phase-box" style={{ borderColor: '#da3633' }}>
            <div className="phase-header">
              <div className="phase-number" style={{ background: '#da363333', color: '#f85149' }}>6</div>
              <div className="phase-title" style={{ color: '#f85149' }}>Edge Case Handling</div>
            </div>
            <div className="phase-content">
              Zero fee, minimum amounts, fee note script, treasury account setup.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeSwap;
