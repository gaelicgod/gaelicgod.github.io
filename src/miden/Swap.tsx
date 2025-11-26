import './Swap.css';

function Swap() {
  return (
    <div className="container">
      <h1>MASM Swap Script Execution</h1>
      <p className="subtitle">Miden Assembly • Atomic Swap Note Script</p>

      {/* Overview Section */}
      <div className="overview">
        <h2>📋 Script Overview</h2>
        <div className="flow-diagram">
          <div className="flow-node">
            <div className="flow-node-title">INPUT</div>
            <div className="flow-node-content">SWAP Note</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">PROCESS</div>
            <div className="flow-node-content">Read Note Inputs</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">CREATE</div>
            <div className="flow-node-content">Payback Note</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">TRANSFER</div>
            <div className="flow-node-content">Move Assets</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">OUTPUT</div>
            <div className="flow-node-content">Swap Complete</div>
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: '#a371f7' }}>Expected Note Inputs (12 elements)</h3>
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
              <td style={{ color: '#79c0ff' }}>0-3</td>
              <td style={{ color: '#56d364' }}>REQUESTED_ASSET</td>
              <td>The asset the note creator wants to receive</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>4-7</td>
              <td style={{ color: '#f778ba' }}>PAYBACK_NOTE_RECIPIENT</td>
              <td>Who receives the payback note (original issuer)</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>8</td>
              <td style={{ color: '#ffa657' }}>execution_hint</td>
              <td>Hint for note execution</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>9</td>
              <td style={{ color: '#ffa657' }}>note_type</td>
              <td>Type of the payback note</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>10</td>
              <td style={{ color: '#ffa657' }}>aux</td>
              <td>Auxiliary data for the note</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>11</td>
              <td style={{ color: '#ffa657' }}>tag</td>
              <td>Note tag identifier</td>
            </tr>
          </tbody>
        </table>
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
              <code><span className="keyword">begin</span>
    <span className="comment"># dropping note args</span>
    <span className="keyword">dropw</span></code>
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

        <div className="note-box">
          <p>💡 The script starts by discarding any arguments passed to it (<code>ARGS</code>). This clears the stack for the main operations.</p>
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
                <span className="stack-item value">num_inputs (12)</span>
                <span className="stack-item ptr">inputs_ptr (0)</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">eq</span>.<span className="number">SWAP_NOTE_INPUTS_NUMBER</span>
<span className="keyword">assert</span>.err=ERR_SWAP_WRONG_NUMBER_OF_INPUTS</code>
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
              </div>
            </div>
          </div>
        </div>

        <div className="memory-section">
          <div className="memory-title">Memory Layout (After get_inputs)</div>
          <div className="memory-grid">
            <div className="memory-cell">
              <div className="memory-addr">Address 0-3</div>
              <div className="memory-content">REQUESTED_ASSET[0..3]</div>
            </div>
            <div className="memory-cell">
              <div className="memory-addr">Address 4-7</div>
              <div className="memory-content">PAYBACK_NOTE_RECIPIENT[0..3]</div>
            </div>
            <div className="memory-cell">
              <div className="memory-addr">Address 8-11</div>
              <div className="memory-content">exec_hint, note_type, aux, tag</div>
            </div>
          </div>
        </div>

        <div className="note-box">
          <p>💡 Pushes 0 as the destination address, then calls <code>get_inputs</code> which stores all 12 note inputs into memory starting at address 0. The assertion ensures exactly 12 inputs exist.</p>
        </div>
      </div>

      {/* Phase 3: Load Assets from Memory */}
      <div className="phase create">
        <div className="phase-header">
          <div className="phase-number">3</div>
          <div className="phase-title">Load Data from Memory to Stack</div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">mem_loadw_be</span>
<span className="comment"># load from address on stack (0)</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item word">REQUESTED_ASSET[0]</span>
                <span className="stack-item word">REQUESTED_ASSET[1]</span>
                <span className="stack-item word">REQUESTED_ASSET[2]</span>
                <span className="stack-item word">REQUESTED_ASSET[3]</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">padw</span> <span className="keyword">mem_loadw_be</span>.<span className="number">4</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item word" style={{ background: 'linear-gradient(135deg, #8957e5, #a371f7)' }}>RECIPIENT[0]</span>
                <span className="stack-item word" style={{ background: 'linear-gradient(135deg, #8957e5, #a371f7)' }}>RECIPIENT[1]</span>
                <span className="stack-item word" style={{ background: 'linear-gradient(135deg, #8957e5, #a371f7)' }}>RECIPIENT[2]</span>
                <span className="stack-item word" style={{ background: 'linear-gradient(135deg, #8957e5, #a371f7)' }}>RECIPIENT[3]</span>
                <span className="stack-item word">REQ_ASSET[0]</span>
                <span className="stack-item word">REQ_ASSET[1]</span>
                <span className="stack-item word">REQ_ASSET[2]</span>
                <span className="stack-item word">REQ_ASSET[3]</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">padw</span> <span className="keyword">mem_loadw_be</span>.<span className="number">8</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item idx">tag</span>
                <span className="stack-item idx">aux</span>
                <span className="stack-item idx">note_type</span>
                <span className="stack-item idx">exec_hint</span>
                <span className="stack-item word" style={{ background: 'linear-gradient(135deg, #8957e5, #a371f7)' }}>RECIPIENT[0..3]</span>
                <span className="stack-item word">REQ_ASSET[0..3]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="note-box">
          <p>💡 <code>mem_loadw_be</code> loads a word (4 elements) from memory in big-endian order. <code>padw</code> pushes 4 zeros which get overwritten by the load. The stack now has all data needed to create the payback note.</p>
        </div>
      </div>

      {/* Phase 4: Create Payback Note */}
      <div className="phase transfer">
        <div className="phase-header">
          <div className="phase-number">4</div>
          <div className="phase-title">Create Payback Note</div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.output_note::create</span>
<span className="comment"># creates note, returns index</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item idx">note_idx</span>
                <span className="stack-item word">REQ_ASSET[0]</span>
                <span className="stack-item word">REQ_ASSET[1]</span>
                <span className="stack-item word">REQ_ASSET[2]</span>
                <span className="stack-item word">REQ_ASSET[3]</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">movdn</span>.<span className="number">4</span>
<span className="comment"># move note_idx down past ASSET</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item word">REQ_ASSET[0]</span>
                <span className="stack-item word">REQ_ASSET[1]</span>
                <span className="stack-item word">REQ_ASSET[2]</span>
                <span className="stack-item word">REQ_ASSET[3]</span>
                <span className="stack-item idx">note_idx</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">repeat</span>.<span className="number">11</span>
    <span className="keyword">push</span>.<span className="number">0</span>
    <span className="keyword">movdn</span>.<span className="number">5</span>
<span className="keyword">end</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item word">REQ_ASSET[0..3]</span>
                <span className="stack-item idx">note_idx</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">0</span>
                <span className="stack-item pad">...</span>
                <span className="stack-item pad">pad(11)</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="procedure">call.wallet::move_asset_to_note</span>
<span className="comment"># transfers REQUESTED_ASSET to the note</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item word">REQ_ASSET[0..3]</span>
                <span className="stack-item idx">note_idx</span>
                <span className="stack-item pad">pad(11)</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">dropw</span> <span className="keyword">drop</span> <span className="keyword">push</span>.<span className="number">0</span>
<span className="comment"># clean up, prepare pad(12)</span></code>
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
          <p>💡 A new payback note is created with the recipient info. The <code>REQUESTED_ASSET</code> from the consumer's vault is moved into this note. The padding is required by the wallet procedure's calling convention.</p>
        </div>
      </div>

      {/* Phase 5: Receive SWAP Note Assets */}
      <div className="phase receive">
        <div className="phase-header">
          <div className="phase-number">5</div>
          <div className="phase-title">Receive Assets from SWAP Note</div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">push</span>.<span className="number">0</span> <span className="procedure">exec.active_note::get_assets</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item value">num_assets (1)</span>
                <span className="stack-item ptr">ptr (0)</span>
                <span className="stack-item pad">pad(12)</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">eq</span>.<span className="number">1</span>
<span className="keyword">assert</span>.err=ERR_SWAP_WRONG_NUMBER_OF_ASSETS</code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item ptr">ptr (0)</span>
                <span className="stack-item pad">pad(12)</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">mem_loadw_be</span> <span className="keyword">drop</span> <span className="keyword">drop</span>
<span className="comment"># load OFFERED_ASSET, drop padding</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item word">OFFERED_ASSET[0]</span>
                <span className="stack-item word">OFFERED_ASSET[1]</span>
                <span className="stack-item pad">pad(12)</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="procedure">call.wallet::receive_asset</span>
<span className="comment"># moves asset into consumer's vault</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item word">OFFERED_ASSET[0]</span>
                <span className="stack-item word">OFFERED_ASSET[1]</span>
                <span className="stack-item pad">pad(12)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="note-box">
          <p>💡 The script loads the assets from the active SWAP note (expected to be exactly 1 asset) and calls <code>receive_asset</code> to transfer them from the note into the consumer's vault.</p>
        </div>
      </div>

      {/* Phase 6: Cleanup */}
      <div className="phase cleanup">
        <div className="phase-header">
          <div className="phase-number">6</div>
          <div className="phase-title">Cleanup & Finalization</div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">dropw</span> <span className="keyword">dropw</span> <span className="keyword">dropw</span>
<span className="comment"># clear remaining stack items</span></code>
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

        <div className="note-box">
          <p>💡 Final cleanup drops all remaining items from the stack, leaving it empty. The script execution is complete: the payback note has been created with the <code>REQUESTED_ASSET</code>, and the <code>OFFERED_ASSET</code> has been received into the consumer's vault.</p>
        </div>
      </div>
    </div>
  );
}

export default Swap;
