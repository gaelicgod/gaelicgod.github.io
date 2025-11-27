import "./FeeSwap.css";

function FeeSwap() {
  return (
    <div className="container">
      <h1>Lumina SWAP with FPI Fee Oracle</h1>
      <p className="subtitle">
        Foreign Procedure Invocation • Dynamic Fees via Cross-Contract Calls
      </p>

      <div className="section">
        <div className="section-header">
          <div
            className="section-icon"
            style={{ background: "#a371f733", color: "#a371f7" }}
          >
            🔗
          </div>
          <div>
            <div className="section-title">
              Foreign Procedure Invocation (FPI)
            </div>
            <div className="section-subtitle">
              Read-only cross-contract calls in Miden
            </div>
          </div>
        </div>

        <div className="comparison-grid">
          <div className="compare-box evm">
            <div className="compare-header">
              <div className="compare-logo">⟠</div>
              <div className="compare-name">EVM: controller.getFee()</div>
            </div>
            <div className="compare-code">
              <span className="comment">// PrivateSwitch.sol</span>
              {"\n"}
              <span className="type">uint256</span>{" "}
              <span className="variable">contributorFee</span> = FullMath.
              <span className="function">mulDivRoundingUp</span>({"\n"}
              amountOut,{"\n"}
              <span className="function">
                controller.getFee
              </span>(msg.sender),{" "}
              <span className="comment">// ← cross-contract call</span>
              {"\n"}
              <span className="number">1e6</span>
              {"\n"}
              );
            </div>
          </div>

          <div className="compare-box miden">
            <div className="compare-header">
              <div className="compare-logo">◈</div>
              <div className="compare-name">Miden: FPI to Fee Oracle</div>
            </div>
            <div className="compare-code">
              <span className="comment"># SWAP note script</span>
              {"\n"}
              <span className="keyword">push</span>.FEE_ORACLE_PROC_HASH{"\n"}
              <span className="keyword">push</span>.FEE_ORACLE_ID_SUFFIX{"\n"}
              <span className="keyword">push</span>.FEE_ORACLE_ID_PREFIX{"\n"}
              <span className="procedure">exec</span>
              .tx::execute_foreign_procedure{" "}
              <span className="comment"># ← FPI call</span>
              {"\n"}
              <span className="comment"># {"=>"} [fee_bps]</span>
            </div>
          </div>
        </div>

        <div className="note-box fpi">
          <p>
            🔗 <strong>FPI Enables:</strong> Your SWAP note script can call a{" "}
            <code>get_fee_bps</code> procedure on a Lumina Fee Oracle account.
            The oracle returns the current fee rate, just like{" "}
            <code>controller.getFee()</code> in your EVM contract. This is
            read-only — the oracle's state isn't modified.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div
            className="section-icon"
            style={{ background: "#58a6ff33", color: "#58a6ff" }}
          >
            🏗️
          </div>
          <div>
            <div className="section-title">System Architecture</div>
            <div className="section-subtitle">
              SWAP Note + Fee Oracle + Treasury
            </div>
          </div>
        </div>

        <div className="arch-diagram">
          <div className="arch-title">FPI-Enabled Fee Collection</div>
          <div className="arch-grid">
            <div className="arch-component swap-note">
              <div className="arch-icon">📜</div>
              <div className="arch-name">SWAP Note</div>
              <div className="arch-desc">
                Executes swap logic
                <br />
                Calls oracle via FPI
                <br />
                Splits assets for fees
                <br />
                Creates fee note
              </div>
            </div>

            <div className="arch-arrow fpi">
              <div className="arch-arrow-label">FPI Call</div>
              <div className="arch-arrow-line">→</div>
              <div className="arch-arrow-label">get_fee_bps()</div>
            </div>

            <div className="arch-component fee-oracle">
              <div className="arch-icon">🔮</div>
              <div className="arch-name">Fee Oracle Account</div>
              <div className="arch-desc">
                Stores current fee rate
                <br />
                Exposes get_fee_bps()
                <br />
                Admin can update rate
                <br />
                Public account state
              </div>
            </div>

            <div className="arch-arrow">
              <div className="arch-arrow-label">Fee Note</div>
              <div className="arch-arrow-line">→</div>
              <div className="arch-arrow-label">P2ID</div>
            </div>

            <div className="arch-component treasury">
              <div className="arch-icon">🏦</div>
              <div className="arch-name">Lumina Treasury</div>
              <div className="arch-desc">
                Receives fee notes
                <br />
                Accumulates fees
                <br />
                Multi-sig controlled
                <br />
                Private account
              </div>
            </div>
          </div>
        </div>

        <div className="note-box">
          <p>
            💡 <strong>Key Insight:</strong> The Fee Oracle is a{" "}
            <strong>public</strong> account so its storage (fee rate) can be
            read via FPI. The Treasury can be <strong>private</strong> — only
            the FEE_RECIPIENT digest is needed in the SWAP note inputs.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div
            className="section-icon"
            style={{ background: "#a371f733", color: "#a371f7" }}
          >
            🔮
          </div>
          <div>
            <div className="section-title">Fee Oracle Account</div>
            <div className="section-subtitle">
              Stores and exposes current fee rate
            </div>
          </div>
        </div>

        <div className="masm-block">
          <div className="masm-title">📝 fee_oracle.masm</div>
          <code className="masm-code">
            <span className="keyword">use</span>.miden::active_account{"\n"}
            <span className="keyword">use</span> miden::native_account{"\n"}
            <span className="keyword">use</span>.std::sys{"\n"}
            <span className="comment"># Storage layout:</span>{"\n"}
            <span className="comment"># Slot 0: fee_bps (e.g., 10 = 0.1%)</span>{"\n"}
            <span className="comment"># Slot 1: treasury_id_prefix</span>{"\n"}
            <span className="comment"># Slot 2: treasury_id_suffix</span>{"\n"}
            <span className="keyword">const</span>.FEE_SLOT=<span className="number">0</span>{"\n"}
            <span className="keyword">const</span>.TREASURY_PREFIX_SLOT=<span className="number">1</span>{"\n"}
            <span className="keyword">const</span>.TREASURY_SUFFIX_SLOT=<span className="number">2</span>{"\n"}
            <span className="highlight">
              <span className="comment">#! Returns current fee in basis points.</span>{"\n"}
              <span className="comment">#! Called via FPI from SWAP notes.</span>{"\n"}
              <span className="comment">#! Inputs: []</span>{"\n"}
              <span className="comment">#! Outputs: [fee_bps]</span>{"\n"}
              <span className="keyword">export</span>.<span className="label">get_fee_bps</span>{"\n"}
              <span className="keyword">push</span>.FEE_SLOT{"\n"}
              <span className="procedure">exec</span>.active_account::get_item{"\n"}
              <span className="comment"># {"=>"} [fee_bps, 0, 0, 0]</span>{"\n"}
              <span className="comment"># clean up, return just fee_bps</span>{"\n"}
              <span className="keyword">movdn</span>.<span className="number">3</span> <span className="keyword">drop</span> <span className="keyword">drop</span> <span className="keyword">drop</span>{"\n"}
              <span className="comment"># {"=>"} [fee_bps]</span>{"\n"}
              <span className="keyword">end</span>
            </span>{"\n"}
            <span className="comment">#! Returns treasury account ID for fee notes.</span>{"\n"}
            <span className="comment">#! Called via FPI from SWAP notes.</span>{"\n"}
            <span className="comment">#! Inputs: []</span>{"\n"}
            <span className="comment">#! Outputs: [treasury_prefix, treasury_suffix]</span>{"\n"}
            <span className="keyword">export</span>.<span className="label">get_treasury_id</span>{"\n"}
            <span className="keyword">push</span>.TREASURY_PREFIX_SLOT{"\n"}
            <span className="procedure">exec</span>.active_account::get_item{"\n"}
            <span className="keyword">movdn</span>.<span className="number">3</span> <span className="keyword">drop</span> <span className="keyword">drop</span> <span className="keyword">drop</span>{"\n"}
            <span className="comment"># {"=>"} [treasury_prefix]</span>{"\n"}
            <span className="keyword">push</span>.TREASURY_SUFFIX_SLOT{"\n"}
            <span className="procedure">exec</span>.active_account::get_item{"\n"}
            <span className="keyword">movdn</span>.<span className="number">3</span> <span className="keyword">drop</span> <span className="keyword">drop</span> <span className="keyword">drop</span>{"\n"}
            <span className="comment"># {"=>"} [treasury_prefix, treasury_suffix]</span>{"\n"}
            <span className="keyword">end</span>{"\n"}
            <span className="new">
              <span className="comment">#! Updates fee rate. Only callable by account owner.</span>{"\n"}
              <span className="comment">#! Inputs: [new_fee_bps]</span>{"\n"}
              <span className="comment">#! Outputs: []</span>{"\n"}
              <span className="keyword">export</span>.<span className="label">set_fee_bps</span>{"\n"}
              <span className="comment"># Verify caller is owner (auth check implicit)</span>{"\n"}
              <span className="keyword">push</span>.FEE_SLOT{"\n"}
              <span className="comment"># {"=>"} [slot, new_fee_bps]</span>{"\n"}
              <span className="keyword">swap</span>{"\n"}
              <span className="comment"># {"=>"} [new_fee_bps, slot]</span>{"\n"}
              <span className="procedure">exec</span>.native_account::set_item{"\n"}
              <span className="keyword">dropw</span>{"\n"}
              <span className="comment"># {"=>"} []</span>{"\n"}
              <span className="keyword">end</span>
            </span>
          </code>
        </div>

        <div className="note-box fpi">
          <p>
            🔮 <strong>Oracle Design:</strong> The oracle is minimal — just
            storage reads. <code>get_fee_bps</code> is the procedure your SWAP
            note will call via FPI. <code>set_fee_bps</code> is for admin
            updates (requires account auth). You could also store the treasury
            recipient here and fetch it via <code>get_treasury_id</code>.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div
            className="section-icon"
            style={{ background: "#58a6ff33", color: "#58a6ff" }}
          >
            📜
          </div>
          <div>
            <div className="section-title">SWAP Note with FPI Fee Lookup</div>
            <div className="section-subtitle">
              Dynamic fee retrieval at execution time
            </div>
          </div>
        </div>

        <div className="masm-block">
          <div className="masm-title">📝 fee_swap.masm (Key Sections)</div>
          <code className="masm-code">
            <span className="keyword">use</span>.miden::active_note{"\n"}
            <span className="keyword">use</span>.miden::output_note{"\n"}
            <span className="keyword">use</span>.miden::contracts::wallets::basic-&gt;wallet{"\n"}
            <span className="keyword">use</span>.miden::tx{"\n"}
            <span className="comment"># Fee Oracle account ID (hardcoded - this is Lumina's oracle)</span>{"\n"}
            <span className="keyword">const</span>.FEE_ORACLE_PREFIX=<span className="number">0xABCD...</span>  <span className="comment"># Replace with actual</span>{"\n"}
            <span className="keyword">const</span>.FEE_ORACLE_SUFFIX=<span className="number">0x1234...</span>  <span className="comment"># Replace with actual</span>{"\n"}
            <span className="keyword">const</span>.GET_FEE_BPS_HASH=<span className="number">0x9249...</span>   <span className="comment"># Hash of get_fee_bps proc</span>{"\n"}
            <span className="highlight">
              <span className="comment">#! Fetches current fee rate from Lumina Fee Oracle via FPI.</span>{"\n"}
              <span className="comment">#!</span>{"\n"}
              <span className="comment">#! Inputs:  []</span>{"\n"}
              <span className="comment">#! Outputs: [fee_bps]</span>{"\n"}
              <span className="keyword">proc</span>.<span className="label">get_fee_from_oracle</span>{"\n"}
              <span className="comment"># Push FPI parameters: [prefix, suffix, proc_hash]</span>{"\n"}
              <span className="keyword">push</span>.GET_FEE_BPS_HASH{"\n"}
              <span className="keyword">push</span>.FEE_ORACLE_SUFFIX{"\n"}
              <span className="keyword">push</span>.FEE_ORACLE_PREFIX{"\n"}
              <span className="comment"># =&gt; [prefix, suffix, proc_hash]</span>{"\n"}
              <span className="procedure">exec</span>.tx::execute_foreign_procedure{"\n"}
              <span className="comment"># =&gt; [fee_bps]</span>{"\n"}
              <span className="keyword">end</span>
            </span>{"\n"}
            <span className="comment">#! Calculate fee and net amount.</span>{"\n"}
            <span className="comment">#!</span>{"\n"}
            <span className="comment">#! Inputs:  [amount, fee_bps]</span>{"\n"}
            <span className="comment">#! Outputs: [fee, net]</span>{"\n"}
            <span className="keyword">proc</span>.<span className="label">calculate_fee</span>{"\n"}
            <span className="keyword">dup</span>.<span className="number">1</span> <span className="keyword">dup</span>.<span className="number">1</span>{"\n"}
            <span className="keyword">mul</span>{"\n"}
            <span className="keyword">push</span>.<span className="number">10000</span>{"\n"}
            <span className="keyword">div</span>{"\n"}
            <span className="comment"># =&gt; [fee, amount, fee_bps]</span>{"\n"}
            <span className="keyword">swap</span> <span className="keyword">drop</span>{"\n"}
            <span className="comment"># =&gt; [fee, amount]</span>{"\n"}
            <span className="keyword">dup</span> <span className="keyword">movup</span>.<span className="number">2</span> <span className="keyword">sub</span>{"\n"}
            <span className="comment"># =&gt; [fee, net]</span>{"\n"}
            <span className="keyword">end</span>{"\n"}
            <span className="comment"># ... (split_fungible_asset procedure from before) ...</span>{"\n"}
            <span className="keyword">begin</span>{"\n"}
            <span className="keyword">dropw</span>{"\n"}
            <span className="comment"># Load note inputs (same as before)</span>{"\n"}
            <span className="keyword">push</span>.<span className="number">0</span> <span className="procedure">exec</span>.active_note::get_inputs{"\n"}
            <span className="comment"># ... validation ...</span>{"\n"}
            <span className="highlight">
              <span className="comment"># ===== FPI: Get current fee rate =====</span>{"\n"}
              <span className="procedure">exec</span>.get_fee_from_oracle{"\n"}
              <span className="comment"># =&gt; [fee_bps]</span>{"\n"}
              <span className="comment"># Store fee_bps in memory for later use</span>{"\n"}
              <span className="keyword">mem_store</span>.<span className="number">100</span>{"\n"}
              <span className="comment"># =&gt; []</span>
            </span>{"\n"}
            <span className="comment"># ... create payback note ...</span>{"\n"}
            <span className="comment"># ... create fee note ...</span>{"\n"}
            <span className="comment"># ===== Split REQUESTED_ASSET (Maker fee) =====</span>{"\n"}
            <span className="comment"># Stack: [REQUESTED_ASSET]</span>{"\n"}
            <span className="keyword">mem_load</span>.<span className="number">100</span> <span className="comment"># reload fee_bps</span>{"\n"}
            <span className="procedure">exec</span>.split_fungible_asset{"\n"}
            <span className="comment"># =&gt; [FEE_ASSET, NET_ASSET]</span>{"\n"}
            <span className="comment"># Add FEE_ASSET to fee note</span>{"\n"}
            <span className="comment"># Move NET_ASSET to payback note</span>{"\n"}
            <span className="comment"># ... load OFFERED_ASSET ...</span>{"\n"}
            <span className="comment"># ===== Split OFFERED_ASSET (Taker fee) =====</span>{"\n"}
            <span className="keyword">mem_load</span>.<span className="number">100</span> <span className="comment"># reload fee_bps</span>{"\n"}
            <span className="procedure">exec</span>.split_fungible_asset{"\n"}
            <span className="comment"># =&gt; [FEE_ASSET, NET_ASSET]</span>{"\n"}
            <span className="comment"># Add FEE_ASSET to fee note</span>{"\n"}
            <span className="comment"># Receive NET_ASSET to consumer vault</span>{"\n"}
            <span className="comment"># ... cleanup ...</span>{"\n"}
            <span className="keyword">end</span>
          </code>
        </div>

        <div className="note-box warning">
          <p>
            ⚠️ <strong>FPI Requirement:</strong> The Fee Oracle must be included
            as a <code>ForeignAccount</code> in the transaction request. The
            matcher/client building the transaction must specify this. The
            oracle's state is read at transaction execution time.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div
            className="section-icon"
            style={{ background: "#56d36433", color: "#56d364" }}
          >
            🔄
          </div>
          <div>
            <div className="section-title">Execution Flow</div>
            <div className="section-subtitle">Step-by-step with FPI</div>
          </div>
        </div>

        <div className="flow-container">
          <div className="flow-title">
            SWAP Note Execution with Dynamic Fees
          </div>
          <div className="flow-steps">
            <div className="flow-step">
              <div className="flow-step-num">1</div>
              <div className="flow-step-desc">
                Load note inputs: REQUESTED_ASSET, PAYBACK_RECIPIENT,
                FEE_RECIPIENT, configs
              </div>
              <div className="flow-step-arrow">→</div>
              <div className="flow-step-result">
                <span>Stack ready</span>
                All data loaded
              </div>
            </div>

            <div className="flow-step fpi-call">
              <div className="flow-step-num">2</div>
              <div className="flow-step-desc">
                <strong>FPI Call:</strong>{" "}
                <code>exec.tx::execute_foreign_procedure</code> → Fee Oracle's{" "}
                <code>get_fee_bps()</code>
              </div>
              <div className="flow-step-arrow">→</div>
              <div className="flow-step-result">
                <span>fee_bps = 10</span>
                0.1% current rate
              </div>
            </div>

            <div className="flow-step">
              <div className="flow-step-num">3</div>
              <div className="flow-step-desc">
                Create payback note (for maker) and fee note (for Lumina
                treasury)
              </div>
              <div className="flow-step-arrow">→</div>
              <div className="flow-step-result">
                <span>2 output notes</span>
                note_idx stored
              </div>
            </div>

            <div className="flow-step fee-calc">
              <div className="flow-step-num">4</div>
              <div className="flow-step-desc">
                <strong>Maker Fee:</strong> Split REQUESTED_ASSET → (NET →
                payback, FEE → fee note)
              </div>
              <div className="flow-step-arrow">→</div>
              <div className="flow-step-result">
                <span>999 USDC → Maker</span>1 USDC → Treasury
              </div>
            </div>

            <div className="flow-step fee-calc">
              <div className="flow-step-num">5</div>
              <div className="flow-step-desc">
                <strong>Taker Fee:</strong> Split OFFERED_ASSET → (NET → vault,
                FEE → fee note)
              </div>
              <div className="flow-step-arrow">→</div>
              <div className="flow-step-result">
                <span>0.4995 ETH → Taker</span>
                0.0005 ETH → Treasury
              </div>
            </div>

            <div className="flow-step transfer">
              <div className="flow-step-num">6</div>
              <div className="flow-step-desc">
                Finalize: <code>move_asset_to_note</code>,{" "}
                <code>receive_asset</code>, cleanup stack
              </div>
              <div className="flow-step-arrow">→</div>
              <div className="flow-step-result">
                <span>Swap complete</span>3 outputs: payback, fee, vault
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Components */}
      <div className="section">
        <div className="section-header">
          <div
            className="section-icon"
            style={{ background: "#f0883e33", color: "#f0883e" }}
          >
            📦
          </div>
          <div>
            <div className="section-title">Implementation Components</div>
            <div className="section-subtitle">What you need to build</div>
          </div>
        </div>

        <div className="impl-grid">
          <div className="impl-card oracle">
            <div className="impl-header">
              <div className="impl-icon">🔮</div>
              <div className="impl-title">Fee Oracle Account</div>
            </div>
            <div className="impl-content">
              Public account that stores the current fee rate. Exposes{" "}
              <code>get_fee_bps()</code> for FPI calls.
            </div>
            <div className="impl-features">
              <div className="impl-feature">
                <span className="impl-feature-icon">✓</span>
                <span>Deploy once on Miden</span>
              </div>
              <div className="impl-feature">
                <span className="impl-feature-icon">✓</span>
                <span>Admin can update fee rate</span>
              </div>
              <div className="impl-feature">
                <span className="impl-feature-icon">✓</span>
                <span>Can store treasury ID too</span>
              </div>
            </div>
          </div>

          <div className="impl-card swap">
            <div className="impl-header">
              <div className="impl-icon">📜</div>
              <div className="impl-title">Fee-Enabled SWAP Note</div>
            </div>
            <div className="impl-content">
              Modified SWAP script that calls oracle via FPI, splits assets,
              creates fee note.
            </div>
            <div className="impl-features">
              <div className="impl-feature">
                <span className="impl-feature-icon">✓</span>
                <span>Hardcodes oracle account ID</span>
              </div>
              <div className="impl-feature">
                <span className="impl-feature-icon">✓</span>
                <span>FEE_RECIPIENT in note inputs</span>
              </div>
              <div className="impl-feature">
                <span className="impl-feature-icon">✓</span>
                <span>Maker + Taker fee extraction</span>
              </div>
            </div>
          </div>

          <div className="impl-card treasury">
            <div className="impl-header">
              <div className="impl-icon">🏦</div>
              <div className="impl-title">Lumina Treasury</div>
            </div>
            <div className="impl-content">
              Private account that receives fee notes. Standard wallet
              functionality.
            </div>
            <div className="impl-features">
              <div className="impl-feature">
                <span className="impl-feature-icon">✓</span>
                <span>P2ID recipient for fee notes</span>
              </div>
              <div className="impl-feature">
                <span className="impl-feature-icon">✓</span>
                <span>Can be multi-sig controlled</span>
              </div>
              <div className="impl-feature">
                <span className="impl-feature-icon">✓</span>
                <span>Accumulates multi-token fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div
            className="section-icon"
            style={{ background: "#627eea33", color: "#627eea" }}
          >
            ⚖️
          </div>
          <div>
            <div className="section-title">EVM ↔ Miden Feature Mapping</div>
            <div className="section-subtitle">
              PrivateSwitch → FPI-Enabled SWAP
            </div>
          </div>
        </div>

        <table className="mapping-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>EVM (PrivateSwitch)</th>
              <th>Miden (FPI SWAP)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dynamic Fee Rate</td>
              <td>
                <code>controller.getFee()</code>
              </td>
              <td>
                <code>FPI → oracle.get_fee_bps()</code>
              </td>
              <td style={{ color: "#56d364" }}>✓ Equivalent</td>
            </tr>
            <tr>
              <td>Per-User Fees</td>
              <td>
                <code>getFee(address)</code>
              </td>
              <td>Not directly (would need user registry)</td>
              <td style={{ color: "#f0883e" }}>~ Possible</td>
            </tr>
            <tr>
              <td>Fee Recipient</td>
              <td>
                <code>controller.feeRecipient()</code>
              </td>
              <td>Note inputs OR FPI to oracle</td>
              <td style={{ color: "#56d364" }}>✓ Equivalent</td>
            </tr>
            <tr>
              <td>Admin Updates</td>
              <td>Controller owner</td>
              <td>Oracle account owner</td>
              <td style={{ color: "#56d364" }}>✓ Equivalent</td>
            </tr>
            <tr>
              <td>Maker/Taker Fees</td>
              <td>Both pay on received</td>
              <td>Both pay on received</td>
              <td style={{ color: "#56d364" }}>✓ Equivalent</td>
            </tr>
            <tr>
              <td>Privacy</td>
              <td>None (public chain)</td>
              <td>Private notes, ZK proofs</td>
              <td style={{ color: "#56d364" }}>✓ Better</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section" style={{ borderTop: "4px solid #56d364" }}>
        <div className="section-header">
          <div
            className="section-icon"
            style={{ background: "#56d36433", color: "#56d364" }}
          >
            ✓
          </div>
          <div>
            <div className="section-title">Summary</div>
            <div className="section-subtitle">FPI makes this work</div>
          </div>
        </div>

        <div className="note-box success">
          <p>
            🎯 <strong>Key Takeaway:</strong> FPI bridges the gap between
            Miden's stateless notes and your EVM's stateful controller pattern.
            The Fee Oracle account becomes Miden's equivalent of{" "}
            <code>controller</code> — a public source of truth that SWAP notes
            can query at execution time.
          </p>
        </div>

        <div className="comparison-grid">
          <div className="compare-box" style={{ borderColor: "#56d364" }}>
            <div className="compare-header">
              <div className="compare-logo" style={{ background: "#56d36433" }}>
                ✓
              </div>
              <div className="compare-name" style={{ color: "#56d364" }}>
                What FPI Enables
              </div>
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#8b949e",
                lineHeight: "1.8",
              }}
            >
              • Dynamic fee rates (not hardcoded)
              <br />
              • Centralized fee management (oracle admin)
              <br />
              • Potential for tiered/per-user fees
              <br />
              • Treasury ID stored in oracle (optional)
              <br />• No script updates needed for fee changes
            </div>
          </div>

          <div className="compare-box" style={{ borderColor: "#f0883e" }}>
            <div className="compare-header">
              <div className="compare-logo" style={{ background: "#f0883e33" }}>
                !
              </div>
              <div className="compare-name" style={{ color: "#f0883e" }}>
                Requirements
              </div>
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#8b949e",
                lineHeight: "1.8",
              }}
            >
              • Fee Oracle must be public account
              <br />
              • Oracle ID hardcoded in SWAP script
              <br />
              • Matcher must include ForeignAccount in tx
              <br />
              • Get procedure hash at compile time
              <br />• Test FPI behavior thoroughly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeSwap;
