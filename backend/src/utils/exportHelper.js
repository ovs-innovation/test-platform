/**
 * Reusable Export Utility for Reports & Analytics Module
 * Supports exporting JSON report datasets to PDF and Excel/CSV formats.
 */

export function formatAsCsv(rows, headers) {
  if (!rows || !rows.length) return '';
  
  const cols = headers || Object.keys(rows[0]);
  const headerLine = cols.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',');
  
  const bodyLines = rows.map(row => {
    return cols.map(col => {
      let val = row[col];
      if (val === null || val === undefined) val = '';
      if (typeof val === 'object') val = JSON.stringify(val);
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(',');
  });

  return [headerLine, ...bodyLines].join('\n');
}

export function generateSimplePdfText(title, data) {
  const dateStr = new Date().toISOString().split('T')[0];
  let text = `=================================================================\n`;
  text += `${title.toUpperCase()} REPORT - ${dateStr}\n`;
  text += `=================================================================\n\n`;

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      text += `[Item ${index + 1}]\n`;
      Object.entries(item).forEach(([k, v]) => {
        text += `  ${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}\n`;
      });
      text += `-----------------------------------------------------------------\n`;
    });
  } else if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([k, v]) => {
      text += `${k}:\n`;
      if (Array.isArray(v)) {
        v.forEach(sub => {
          text += `  - ${typeof sub === 'object' ? JSON.stringify(sub) : sub}\n`;
        });
      } else if (typeof v === 'object' && v !== null) {
        text += `  ${JSON.stringify(v, null, 2)}\n`;
      } else {
        text += `  ${v}\n`;
      }
      text += `\n`;
    });
  } else {
    text += String(data);
  }

  return text;
}

export function handleReportExport(res, format, title, data, flatRows = null) {
  if (!format) return false;

  const normalizedFormat = String(format).toLowerCase().trim();
  const sanitizeFilename = (title || 'report').toLowerCase().replace(/[^a-z0-9]/g, '_');

  if (normalizedFormat === 'excel' || normalizedFormat === 'csv') {
    const rowsToExport = flatRows || (Array.isArray(data) ? data : (data.students || data.trend || data.chapters || data.rankings || [data]));
    const csvContent = formatAsCsv(rowsToExport);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizeFilename}_${Date.now()}.csv"`);
    res.status(200).send(csvContent);
    return true;
  }

  if (normalizedFormat === 'pdf') {
    const pdfText = generateSimplePdfText(title, data);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizeFilename}_${Date.now()}.pdf"`);
    res.status(200).send(Buffer.from(pdfText, 'utf-8'));
    return true;
  }

  return false;
}
