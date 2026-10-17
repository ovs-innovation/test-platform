import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Daily Work & Accomplishments Report - 03 Oct 2026</title>
<style>
  @page {
    size: A4 portrait;
    margin: 12mm 14mm 12mm 14mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.45;
    font-size: 10pt;
  }
  .header-card {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
    color: #ffffff;
    padding: 20px 24px;
    border-radius: 12px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
  }
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    padding-bottom: 12px;
    margin-bottom: 12px;
  }
  .title-area h1 {
    font-size: 18pt;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 3px;
    color: #ffffff;
  }
  .title-area p {
    font-size: 9.5pt;
    color: #93c5fd;
    font-weight: 500;
  }
  .badge-container {
    text-align: right;
  }
  .badge-date {
    display: inline-block;
    background: #2563eb;
    color: #ffffff;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 9pt;
    font-weight: 600;
    letter-spacing: 0.3px;
    margin-bottom: 4px;
  }
  .badge-status {
    display: block;
    font-size: 8.5pt;
    color: #86efac;
    font-weight: 600;
  }
  .header-meta {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .meta-item .meta-label {
    color: #94a3b8;
    text-transform: uppercase;
    font-size: 7pt;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  .meta-item .meta-val {
    color: #f8fafc;
    font-weight: 600;
    font-size: 9pt;
    margin-top: 1px;
  }
  
  /* KPI Cards */
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }
  .kpi-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px 14px;
    border-left: 4px solid #3b82f6;
  }
  .kpi-card.purple { border-left-color: #8b5cf6; }
  .kpi-card.amber { border-left-color: #f59e0b; }
  .kpi-title {
    font-size: 7.5pt;
    text-transform: uppercase;
    font-weight: 700;
    color: #64748b;
    letter-spacing: 0.5px;
  }
  .kpi-num {
    font-size: 13pt;
    font-weight: 800;
    color: #0f172a;
    margin: 1px 0;
  }
  .kpi-desc {
    font-size: 7.5pt;
    color: #64748b;
    line-height: 1.3;
  }

  /* Projects Section */
  .section-title {
    font-size: 11.5pt;
    font-weight: 700;
    color: #0f172a;
    border-bottom: 1.5px solid #cbd5e1;
    padding-bottom: 4px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .project-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 14px;
    overflow: hidden;
    page-break-inside: avoid;
  }
  .project-header {
    background: #f1f5f9;
    padding: 8px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
  }
  .project-name {
    font-size: 10.5pt;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .tag {
    font-size: 7pt;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .tag-blue { background: #dbeafe; color: #1e40af; }
  .tag-purple { background: #ede9fe; color: #5b21b6; }
  .tag-amber { background: #fef3c7; color: #92400e; }
  .tag-green { background: #dcfce7; color: #166534; }
  
  .project-body {
    padding: 10px 14px;
  }
  .task-list {
    list-style: none;
  }
  .task-item {
    position: relative;
    padding-left: 18px;
    margin-bottom: 8px;
    font-size: 9pt;
    color: #334155;
    line-height: 1.4;
  }
  .task-item:last-child {
    margin-bottom: 4px;
  }
  .task-item::before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 0;
    color: #10b981;
    font-size: 9pt;
    font-weight: 800;
  }
  .task-item strong {
    color: #0f172a;
  }
  .commit-badge {
    display: block;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 7.5pt;
    padding: 4px 8px;
    border-radius: 4px;
    color: #475569;
    margin-top: 6px;
    word-break: break-all;
  }

  /* Table styling */
  .table-section {
    margin-top: 12px;
    page-break-inside: avoid;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8pt;
  }
  th {
    background: #f1f5f9;
    color: #334155;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 7pt;
    letter-spacing: 0.5px;
    padding: 6px 8px;
    border: 1px solid #cbd5e1;
    text-align: left;
  }
  td {
    padding: 6px 8px;
    border: 1px solid #cbd5e1;
    color: #334155;
    vertical-align: top;
  }
  tr:nth-child(even) td {
    background: #f8fafc;
  }

  .footer-note {
    margin-top: 14px;
    border-top: 1px solid #cbd5e1;
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    font-size: 7.5pt;
    color: #94a3b8;
  }
</style>
</head>
<body>

  <!-- HEADER -->
  <div class="header-card">
    <div class="header-top">
      <div class="title-area">
        <h1>Daily Work & Accomplishments Report</h1>
        <p>Cross-Project Engineering, Production Deployments & System Enhancements</p>
      </div>
      <div class="badge-container">
        <span class="badge-date">📅 03 October 2026</span>
        <span class="badge-status">● All Projects Synced & Verified</span>
      </div>
    </div>
    <div class="header-meta">
      <div class="meta-item">
        <div class="meta-label">Developer</div>
        <div class="meta-val">Saurabh Singh</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Environment</div>
        <div class="meta-val">Antigravity AI IDE</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Total Repositories</div>
        <div class="meta-val">3 Active Projects</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Delivery Scope</div>
        <div class="meta-val">Frontend, Backend & Cloud Ops</div>
      </div>
    </div>
  </div>

  <!-- KPI SUMMARY -->
  <div class="kpi-row">
    <div class="kpi-card">
      <div class="kpi-title">Test Platform</div>
      <div class="kpi-num">Admin UI & AI Vision</div>
      <div class="kpi-desc">Header flush alignment, admission photo upload/preview, Node 22 Alpine runtime upgrade</div>
    </div>
    <div class="kpi-card purple">
      <div class="kpi-title">VoltoMatic</div>
      <div class="kpi-num">Rebranding & Deploy</div>
      <div class="kpi-desc">Purged legacy grocery assets, industrial binders catalog, live dynamic API sync (8089)</div>
    </div>
    <div class="kpi-card amber">
      <div class="kpi-title">Manchanda Fabrics</div>
      <div class="kpi-num">Cart & Invoicing</div>
      <div class="kpi-desc">Reseller invoice customization, address preservation, cart maximize & terracotta theme</div>
    </div>
  </div>

  <!-- PROJECT 1: TEST PLATFORM -->
  <div class="project-box">
    <div class="project-header">
      <div class="project-name">
        <span>1. Test Platform (Assessment & Test Series Engine)</span>
      </div>
      <div>
        <span class="tag tag-blue">React + Vite</span>
        <span class="tag tag-blue">Node.js 22</span>
        <span class="tag tag-green">Pushed to Remote</span>
      </div>
    </div>
    <div class="project-body">
      <ul class="task-list">
        <li class="task-item">
          <strong>Admin Dashboard Layout Flush Alignment:</strong> Eliminated the unwanted vertical gap above the main admin layout. Refactored <code>AdminLayout.jsx</code> to lock the sidebar and top navigation header flush at <code>top: 0</code> across all viewport sizes, removing container overflow and visual misalignments.
        </li>
        <li class="task-item">
          <strong>Admission Slip Modal – Student Photo Preview & Management:</strong> Integrated student photo handling in <code>AdmissionManager.jsx</code> and backend <code>admissionController.js</code>. Administrators can now inspect applicant portraits, upload or replace profile photos directly within the modal, and generate print-ready admission cards.
        </li>
        <li class="task-item">
          <strong>PDF Vision AI Engine & Node 22 Upgrade:</strong> Upgraded the container runtime to <code>node:22-alpine</code>, polyfilled <code>Promise.withResolvers</code> for asynchronous vision document chunking, added fallback alerts for degraded extractions, and implemented compare-topper score analytics for test rankings.
        </li>
        <li class="task-item">
          <strong>Backend Dev Server Port Stabilization:</strong> Handled port collision issues on dev startup using automated port-freeing scripts (<code>free-port.js</code>) and verified watch reloading across API endpoints.
        </li>
      </ul>
      <div class="commit-badge">Git Commits: f421187 (align sidebar/header flush & admission photo) | 6d9692d (pdf-vision node:22-alpine & compare-topper)</div>
    </div>
  </div>

  <!-- PROJECT 2: VOLTOMATIC -->
  <div class="project-box">
    <div class="project-header">
      <div class="project-name">
        <span>2. VoltoMatic (Industrial Power Solutions E-Commerce)</span>
      </div>
      <div>
        <span class="tag tag-purple">Next.js / React</span>
        <span class="tag tag-purple">Express + MongoDB</span>
        <span class="tag tag-green">Live Synced</span>
      </div>
    </div>
    <div class="project-body">
      <ul class="task-list">
        <li class="task-item">
          <strong>Complete Purge of Legacy Grocery Assets & Rebranding:</strong> Conducted a complete cleanup of legacy vegetable store templates. Removed obsolete voucher and coupon modules from both admin settings and storefront, aligning the catalog strictly with industrial electrical components.
        </li>
        <li class="task-item">
          <strong>Industrial Technical Content & Legal Pages Overhaul:</strong> Completely rewritten About Us, Terms & Conditions, and Privacy Policy pages, substituting grocery placeholders with VoltoMatic industrial engineering specs, ISO certifications, and corporate profiles.
        </li>
        <li class="task-item">
          <strong>Engineering Catalog Binders & Visual Assets:</strong> Replaced grocery banners with industrial engineering catalog binders (<code>app-download-img-left.png</code> and <code>app-download-img.png</code>) and updated <code>FooterTop.js</code> with direct links to technical PDF brochures.
        </li>
        <li class="task-item">
          <strong>Production Dynamic BaseURL & Port 8089 Routing:</strong> Fixed production CORS and connection failures by making the frontend API <code>baseURL</code> resolve dynamically to the current origin <code>/api</code> in browser contexts, routed live requests to port 8089, and implemented client-side product fallbacks.
        </li>
      </ul>
      <div class="commit-badge">Git Commits: 081503e (catalog binders) | 5724d0e (live API 8089 & fallbacks) | 603c372 (dynamic baseURL) | c7ffaa8 (about-us power specs) | 68b99f3 (clean template assets)</div>
    </div>
  </div>

  <!-- PROJECT 3: MANCHANDA FABRICS -->
  <div class="project-box">
    <div class="project-header">
      <div class="project-name">
        <span>3. Manchanda Fabrics (Luxury Ethnic Fashion & Reseller Hub)</span>
      </div>
      <div>
        <span class="tag tag-amber">React Storefront</span>
        <span class="tag tag-amber">Admin & Invoicing</span>
        <span class="tag tag-green">Verified & Active</span>
      </div>
    </div>
    <div class="project-body">
      <ul class="task-list">
        <li class="task-item">
          <strong>Reseller B2B Invoice & Shipping Slip Customization:</strong> Customized <code>InvoiceForDownload.jsx</code>, <code>ShippingLabel4x6.jsx</code>, and <code>downloadShippingLabelPdf.js</code> to omit Net Invoice Values and hide shipping costs on reseller invoices, ensuring client confidentiality while preserving complete customer shipping address data.
        </li>
        <li class="task-item">
          <strong>Right-Side Cart Drawer with Maximize & Mobile Sheet:</strong> Retained the classic desktop right-side cart drawer while implementing an expansive full-width maximize/restore toggle. Built an optimized mobile half-screen sliding bottom sheet with smooth touch gestures.
        </li>
        <li class="task-item">
          <strong>Taxonomy & Category Slug Resolution:</strong> Fixed routing for silk and gajji silk category listings, supported MongoDB ObjectId lookups with automated canonical slug redirection, and ensured cart items retain active slug references.
        </li>
        <li class="task-item">
          <strong>Terracotta Brand Identity & Visual Theme:</strong> Harmonized the complete storefront design system around a warm terracotta palette (<code>#9C6A5A</code>), elegant italic serif typography, and cohesive footer accents inspired by the About Us presentation.
        </li>
        <li class="task-item">
          <strong>Post-Order Tracking & Dispatch Communications:</strong> Established post-checkout email linking, delivery tracking dispatches, and client verification notifications.
        </li>
      </ul>
      <div class="commit-badge">Git Commits: 869236c (address preservation & reseller invoice) | a71d833 (cart maximize) | 3cfe8fb (mobile bottom sheet) | 46bb735 (terracotta theme) | 82e39bd (slugs & dispatch emails)</div>
    </div>
  </div>

  <!-- SUMMARY TABLE -->
  <div class="table-section">
    <div class="section-title">
      <span>Executive Task & Delivery Matrix</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 22%;">Project</th>
          <th style="width: 40%;">Key Deliverables</th>
          <th style="width: 20%;">Tech Stack</th>
          <th style="width: 18%;">Current Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Test Platform</strong></td>
          <td>Admin flush top:0 alignment, Admission Slip student photo preview/upload, Node 22 Alpine PDF vision pipeline</td>
          <td>React, Vite, Node 22, Docker, Vision AI</td>
          <td><span class="tag tag-green">Completed & Pushed</span></td>
        </tr>
        <tr>
          <td><strong>VoltoMatic</strong></td>
          <td>Purged legacy grocery assets/coupons, uploaded industrial catalog binders, live API dynamic baseURL & port 8089</td>
          <td>Next.js, Tailwind, Express, MongoDB Atlas</td>
          <td><span class="tag tag-green">Live Deployed</span></td>
        </tr>
        <tr>
          <td><strong>Manchanda Fabrics</strong></td>
          <td>Reseller invoice formatting, customer address preservation, cart maximize & mobile bottom sheet, warm terracotta theme</td>
          <td>React, Tailwind, Node API, PDFkit</td>
          <td><span class="tag tag-green">Client Approved</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- FOOTER -->
  <div class="footer-note">
    <div>Generated automatically via Antigravity AI IDE • Saurabh Singh</div>
    <div>Report Date: October 03, 2026 • Confidential & Proprietary Daily Work Log</div>
  </div>

</body>
</html>
"""

desktop = r"C:\Users\saura\Desktop"
html_file = os.path.join(desktop, "Daily_Work_Report_2026-10-03.html")
pdf_file = os.path.join(desktop, "Daily_Work_Report_2026-10-03.pdf")

with open(html_file, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"HTML written to: {html_file}")

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome):
    chrome = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

cmd = [
    chrome,
    "--headless",
    "--disable-gpu",
    "--run-all-compositor-stages-before-draw",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_file}",
    html_file
]

res = subprocess.run(cmd, capture_output=True, text=True)
print("Browser exit code:", res.returncode)

if os.path.exists(pdf_file):
    print(f"SUCCESS: PDF created at: {pdf_file}")
    print(f"File size: {os.path.getsize(pdf_file)} bytes")
else:
    print("FAILED to create PDF file.")
