import './P2IDE.css';

function P2IDE() {
  return (
    <div className="container">
      <h1>MASM P2IDE Script Execution</h1>
      <p className="subtitle">Miden Assembly • Extended Pay-to-ID Note Script (Reclaimable & Timelockable)</p>

      {/* Overview Section */}
      <div className="overview">
        <h2>📋 Script Overview</h2>
        <div className="flow-diagram">
          <div className="flow-node">
            <div className="flow-node-title">INPUT</div>
            <div className="flow-node-content">P2IDE Note</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">CHECK</div>
            <div className="flow-node-content">Timelock</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node">
            <div className="flow-node-title">BRANCH</div>
            <div className="flow-node-content">Target or Sender?</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node" style={{ borderColor: '#56d364' }}>
            <div className="flow-node-title" style={{ color: '#56d364' }}>PATH A</div>
            <div className="flow-node-content" style={{ color: '#56d364' }}>Target Claims</div>
          </div>
          <div className="flow-node" style={{ borderColor: '#f85149' }}>
            <div className="flow-node-title" style={{ color: '#f85149' }}>PATH B</div>
            <div className="flow-node-content" style={{ color: '#f85149' }}>Sender Reclaims</div>
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: '#a371f7' }}>Expected Note Inputs (4 elements)</h3>
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
              <td style={{ color: '#f0883e' }}>timelock_block_height</td>
              <td>Block height before which note cannot be consumed</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>1</td>
              <td style={{ color: '#db6d28' }}>reclaim_block_height</td>
              <td>Block height at which sender can reclaim (0 = disabled)</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>2</td>
              <td style={{ color: '#f778ba' }}>target_account_id_prefix</td>
              <td>First half of the target account ID</td>
            </tr>
            <tr>
              <td style={{ color: '#79c0ff' }}>3</td>
              <td style={{ color: '#f778ba' }}>target_account_id_suffix</td>
              <td>Second half of the target account ID</td>
            </tr>
          </tbody>
        </table>

        <div className="timeline-viz">
          <div className="timeline-title">Block Height Timeline</div>
          <div className="timeline">
            <div className="timeline-zone locked"></div>
            <div className="timeline-zone target-only"></div>
            <div className="timeline-zone reclaim-enabled"></div>
            <div className="timeline-bar"></div>
            <div className="timeline-marker timelock"></div>
            <div className="timeline-marker reclaim"></div>
            <div className="timeline-label top timelock">timelock_height</div>
            <div className="timeline-label bottom timelock">Note unlocks</div>
            <div className="timeline-label top reclaim">reclaim_height</div>
            <div className="timeline-label bottom reclaim">Sender can reclaim</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', background: '#da363355', borderRadius: '4px' }}></div>
              <span style={{ color: '#da3633' }}>Locked (no one)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', background: '#56d36455', borderRadius: '4px' }}></div>
              <span style={{ color: '#56d364' }}>Target only</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', background: '#f8514955', borderRadius: '4px' }}></div>
              <span style={{ color: '#f85149' }}>Target OR Sender</span>
            </div>
          </div>
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
                <span className="stack-item value">num_inputs (4)</span>
                <span className="stack-item ptr">inputs_ptr (0)</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="code-block">
              <code><span className="keyword">eq</span>.<span className="number">4</span> <span className="keyword">assert</span>.err=ERR_P2IDE_WRONG_NUMBER_OF_INPUTS</code>
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
            <div className="memory-cell" style={{ borderLeftColor: '#f0883e' }}>
              <div className="memory-addr">Address 0</div>
              <div className="memory-content">timelock_block_height</div>
            </div>
            <div className="memory-cell" style={{ borderLeftColor: '#db6d28' }}>
              <div className="memory-addr">Address 1</div>
              <div className="memory-content">reclaim_block_height</div>
            </div>
            <div className="memory-cell" style={{ borderLeftColor: '#f778ba' }}>
              <div className="memory-addr">Address 2</div>
              <div className="memory-content">target_account_id_prefix</div>
            </div>
            <div className="memory-cell" style={{ borderLeftColor: '#f778ba' }}>
              <div className="memory-addr">Address 3</div>
              <div className="memory-content">target_account_id_suffix</div>
            </div>
          </div>
        </div>

        <div className="note-box">
          <p>💡 Pushes 0 as the memory destination, then calls <code>get_inputs</code> which stores all 4 note inputs starting at address 0. The assertion ensures exactly 4 inputs exist.</p>
        </div>
      </div>
      {/* Phase 2-3: Load & Timelock */}
      <div className="phase inputs">
        <div className="phase-header">
          <div className="phase-number">2</div>
          <div className="phase-title">Load Data from Memory to Stack</div>
        </div>
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">mem_loadw_be</span>{'\n'}<span className="comment"># loads word from address 0</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item timelock">timelock_height</span>
                <span className="stack-item reclaim">reclaim_height</span>
                <span className="stack-item target">target_id_prefix</span>
                <span className="stack-item target">target_id_suffix</span>
              </div>
            </div>
          </div>
        </div>
        <div className="note-box">
          <p>💡 <code>mem_loadw_be</code> loads all 4 elements in big-endian order. The stack now contains all the data needed for validation: timelock height, reclaim height, and the target account ID.</p>
        </div>
      </div>

      <div className="phase timelock">
        <div className="phase-header">
          <div className="phase-number">3</div>
          <div className="phase-title">Check Timelock (verify_unlocked)</div>
        </div>
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.tx::get_block_number</span>{'\n'}<span className="comment"># get current block height</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item height">current_height</span>
                <span className="stack-item timelock">timelock_height</span>
                <span className="stack-item reclaim">reclaim_height</span>
                <span className="stack-item target">target_id_prefix</span>
                <span className="stack-item target">target_id_suffix</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.verify_unlocked</span>{'\n'}<span className="comment"># checks: timelock_height &lt;= current_height</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item height">current_height</span>
                <span className="stack-item reclaim">reclaim_height</span>
                <span className="stack-item target">target_id_prefix</span>
                <span className="stack-item target">target_id_suffix</span>
              </div>
            </div>
          </div>
        </div>
        <div className="note-box" style={{ borderLeftColor: '#f0883e' }}>
          <p>⏰ <strong>Timelock Check:</strong> The <code>verify_unlocked</code> procedure checks that <code>timelock_block_height ≤ current_block_height</code>. If the note is still locked, execution panics with <code>ERR_P2IDE_TIMELOCK_HEIGHT_NOT_REACHED</code>.</p>
        </div>
      </div>
      {/* Phase 4: Validate Account */}
      <div className="phase validate">
        <div className="phase-header">
          <div className="phase-number">4</div>
          <div className="phase-title">Determine if Account is Target</div>
        </div>
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.active_account::get_id</span>{'\n'}<span className="keyword">dup</span>.<span className="number">1</span> <span className="keyword">dup</span>.<span className="number">1</span>{'\n'}<span className="comment"># duplicate account ID for later use</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item id">acct_id_prefix</span>
                <span className="stack-item id">acct_id_suffix</span>
                <span className="stack-item id">acct_id_prefix</span>
                <span className="stack-item id">acct_id_suffix</span>
                <span className="stack-item height">current_height</span>
                <span className="stack-item reclaim">reclaim_height</span>
                <span className="stack-item target">target_id_prefix</span>
                <span className="stack-item target">target_id_suffix</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">movup</span>.<span className="number">7</span> <span className="keyword">movup</span>.<span className="number">7</span>{'\n'}<span className="procedure">exec.account_id::is_equal</span>{'\n'}<span className="comment"># compare account_id with target_id</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item bool">is_target (bool)</span>
                <span className="stack-item id">acct_id_prefix</span>
                <span className="stack-item id">acct_id_suffix</span>
                <span className="stack-item height">current_height</span>
                <span className="stack-item reclaim">reclaim_height</span>
              </div>
            </div>
          </div>
        </div>
        <div className="comparison-box">
          <div className="id-box account">
            <div className="id-box-label">Executing Account ID</div>
            <div className="id-box-content">
              <div>prefix: acct_id_prefix</div>
              <div>suffix: acct_id_suffix</div>
            </div>
          </div>
          <div className="equals-sign">==?</div>
          <div className="id-box target">
            <div className="id-box-label">Target Account ID</div>
            <div className="id-box-content">
              <div>prefix: target_id_prefix</div>
              <div>suffix: target_id_suffix</div>
            </div>
          </div>
        </div>
        <div className="note-box">
          <p>💡 The account ID is duplicated because we might need it later in the reclaim branch. The <code>movup</code> operations bring the target ID to the top for comparison. The result is a boolean <code>is_target</code>.</p>
        </div>
      </div>

      {/* Phase 5: Branch Decision */}
      <div className="phase branch">
        <div className="phase-header">
          <div className="phase-number">5</div>
          <div className="phase-title">Branch: Target Claim vs Sender Reclaim</div>
        </div>
        <div className="decision-diamond">
          <div className="question">if.true → is_target == 1?</div>
        </div>
        <div className="branch-container">
          <div className="branch-box target-branch">
            <div className="branch-header">
              <div className="branch-icon">✓</div>
              <div className="branch-title">TRUE: Target Claims</div>
            </div>
            <div className="branch-condition">
              <code>account_id == target_account_id</code>
            </div>
            <div className="branch-steps">
              <div className="branch-step">
                <div className="branch-step-num">1</div>
                <span><code>dropw</code> - clear remaining stack</span>
              </div>
              <div className="branch-step">
                <div className="branch-step-num">2</div>
                <span><code>add_assets_to_account</code> - receive all assets</span>
              </div>
            </div>
            <div className="note-box" style={{ marginTop: '15px', borderLeftColor: '#56d364' }}>
              <p>✅ Simple path: the target account directly receives all note assets.</p>
            </div>
          </div>
          <div className="branch-box reclaim-branch">
            <div className="branch-header">
              <div className="branch-icon">↩</div>
              <div className="branch-title">FALSE: Sender Reclaims</div>
            </div>
            <div className="branch-condition">
              <code>account_id != target_account_id</code>
            </div>
            <div className="branch-steps">
              <div className="branch-step">
                <div className="branch-step-num">1</div>
                <span>Check <code>reclaim_height ≠ 0</code> (enabled)</span>
              </div>
              <div className="branch-step">
                <div className="branch-step-num">2</div>
                <span>Check <code>reclaim_height ≤ current</code></span>
              </div>
              <div className="branch-step">
                <div className="branch-step-num">3</div>
                <span>Get sender via <code>get_sender</code></span>
              </div>
              <div className="branch-step">
                <div className="branch-step-num">4</div>
                <span>Assert <code>account_id == sender_id</code></span>
              </div>
              <div className="branch-step">
                <div className="branch-step-num">5</div>
                <span><code>add_assets_to_account</code></span>
              </div>
            </div>
            <div className="note-box" style={{ marginTop: '15px', borderLeftColor: '#f85149' }}>
              <p>🔒 Multiple checks: reclaim must be enabled, block height must be reached, and the account must be the original sender.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Phase 5A: Target Path */}
      <div className="phase target">
        <div className="phase-header">
          <div className="phase-number">5A</div>
          <div className="phase-title">Target Claim Path</div>
          <span className="phase-badge badge-target">if.true</span>
        </div>
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">dropw</span>{'\n'}<span className="comment"># drop: acct_id (2), current_height, reclaim_height</span></code>
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
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.active_note::add_assets_to_account</span>{'\n'}<span className="comment"># transfer all note assets to target</span></code>
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
          <p>✅ <strong>Target Claim Complete:</strong> The simplest path — since the executing account matches the target, we just clean up the stack and transfer all assets.</p>
        </div>
      </div>

      {/* Phase 5B: Reclaim Path */}
      <div className="phase reclaim">
        <div className="phase-header">
          <div className="phase-number">5B</div>
          <div className="phase-title">Sender Reclaim Path (reclaim_note)</div>
          <span className="phase-badge badge-reclaim">else</span>
        </div>
        <div className="steps">
          <div className="step">
            <div className="code-block">
              <code><span className="comment"># Stack: [acct_prefix, acct_suffix, current_height, reclaim_height]</span>{'\n'}<span className="keyword">movup</span>.<span className="number">3</span> <span className="keyword">dup</span> <span className="keyword">neq</span>.<span className="number">0</span>{'\n'}<span className="keyword">assert</span>.err=ERR_P2IDE_RECLAIM_DISABLED</code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item reclaim">reclaim_height</span>
                <span className="stack-item id">acct_id_prefix</span>
                <span className="stack-item id">acct_id_suffix</span>
                <span className="stack-item height">current_height</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="code-block">
              <code><span className="keyword">movup</span>.<span className="number">3</span>{'\n'}<span className="keyword">lte</span> <span className="keyword">assert</span>.err=ERR_P2IDE_RECLAIM_HEIGHT_NOT_REACHED{'\n'}<span className="comment"># reclaim_height &lt;= current_height</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item id">acct_id_prefix</span>
                <span className="stack-item id">acct_id_suffix</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.active_note::get_sender</span>{'\n'}<span className="comment"># get the note's original sender</span></code>
            </div>
            <div className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="stack-viz">
              <div className="stack-label">Stack After</div>
              <div className="stack-items">
                <span className="stack-item sender">sender_id_prefix</span>
                <span className="stack-item sender">sender_id_suffix</span>
                <span className="stack-item id">acct_id_prefix</span>
                <span className="stack-item id">acct_id_suffix</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.account_id::is_equal</span>{'\n'}<span className="keyword">assert</span>.err=ERR_P2IDE_RECLAIM_ACCT_IS_NOT_SENDER</code>
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
          <div className="step">
            <div className="code-block">
              <code><span className="procedure">exec.active_note::add_assets_to_account</span>{'\n'}<span className="comment"># transfer assets back to sender</span></code>
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
        <div className="comparison-box" style={{ border: '2px solid #f85149' }}>
          <div className="id-box account">
            <div className="id-box-label">Executing Account</div>
            <div className="id-box-content">acct_id</div>
          </div>
          <div className="equals-sign">==</div>
          <div className="id-box sender">
            <div className="id-box-label">Note Sender</div>
            <div className="id-box-content">sender_id</div>
          </div>
        </div>
        <div className="note-box" style={{ borderLeftColor: '#f85149' }}>
          <p>↩️ <strong>Reclaim Complete:</strong> Three conditions must pass: (1) reclaim is enabled (height ≠ 0), (2) reclaim block height reached, (3) executing account is the original sender. Then assets are returned.</p>
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
            <div className="flow-node-title">SENDER</div>
            <div className="flow-node-content" style={{ color: '#a371f7' }}>Creates P2IDE</div>
            <div style={{ fontSize: '0.7rem', color: '#8b949e', marginTop: '5px' }}>sets target, locks, reclaim</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node" style={{ borderColor: '#f0883e' }}>
            <div className="flow-node-title">TIMELOCK</div>
            <div className="flow-node-content" style={{ color: '#f0883e' }}>Wait for unlock</div>
            <div style={{ fontSize: '0.7rem', color: '#8b949e', marginTop: '5px' }}>blocks until height</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-node" style={{ borderColor: '#56d364' }}>
            <div className="flow-node-title">TARGET</div>
            <div className="flow-node-content" style={{ color: '#56d364' }}>Claims Assets</div>
            <div style={{ fontSize: '0.7rem', color: '#8b949e', marginTop: '5px' }}>anytime after unlock</div>
          </div>
        </div>
        <div className="flow-diagram" style={{ marginTop: '10px' }}>
          <div style={{ flex: 1 }}></div>
          <div className="flow-arrow" style={{ transform: 'rotate(90deg)' }}>↓</div>
          <div style={{ flex: 1 }}></div>
        </div>
        <div className="flow-diagram">
          <div style={{ flex: 1 }}></div>
          <div className="flow-node" style={{ borderColor: '#f85149', maxWidth: '200px' }}>
            <div className="flow-node-title">OR SENDER</div>
            <div className="flow-node-content" style={{ color: '#f85149' }}>Reclaims</div>
            <div style={{ fontSize: '0.7rem', color: '#8b949e', marginTop: '5px' }}>after reclaim height</div>
          </div>
          <div style={{ flex: 1 }}></div>
        </div>
        <div className="note-box" style={{ borderLeftColor: '#56d364', marginTop: '30px' }}>
          <p><strong>Key Features of P2IDE vs P2ID:</strong></p>
          <p style={{ marginTop: '10px' }}>1. <strong>Timelock:</strong> Note cannot be consumed until <code>timelock_block_height</code> is reached</p>
          <p>2. <strong>Reclaimable:</strong> Sender can reclaim assets after <code>reclaim_block_height</code></p>
          <p>3. <strong>Disable Reclaim:</strong> Set <code>reclaim_block_height = 0</code> to disable</p>
          <p>4. <strong>Dual Authorization:</strong> Either target (anytime after timelock) or sender (after reclaim height) can consume</p>
        </div>
        <div className="comparison-box" style={{ marginTop: '20px', border: '2px solid #58a6ff', gridTemplateColumns: '1fr' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#58a6ff', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Comparison: P2ID vs P2IDE</div>
            <table className="inputs-table" style={{ marginTop: 0 }}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>P2ID</th>
                  <th>P2IDE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Note Inputs</td>
                  <td>2 (account ID only)</td>
                  <td>4 (ID + timelock + reclaim)</td>
                </tr>
                <tr>
                  <td>Timelock</td>
                  <td style={{ color: '#f85149' }}>No</td>
                  <td style={{ color: '#56d364' }}>Yes</td>
                </tr>
                <tr>
                  <td>Reclaimable</td>
                  <td style={{ color: '#f85149' }}>No</td>
                  <td style={{ color: '#56d364' }}>Yes (optional)</td>
                </tr>
                <tr>
                  <td>Who Can Consume</td>
                  <td>Target only</td>
                  <td>Target or Sender (time-dependent)</td>
                </tr>
                <tr>
                  <td>Use Case</td>
                  <td>Simple transfers</td>
                  <td>Escrow, time-locked payments, conditional transfers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default P2IDE;
