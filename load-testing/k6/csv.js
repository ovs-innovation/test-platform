function splitCsvLine(line) {
  const out = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line.charAt(i);
    if (inQuotes) {
      if (ch === '"') {
        if (line.charAt(i + 1) === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      out.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  out.push(current);
  return out;
}

export function parseStudentCsv(text) {
  const lines = String(text || '').replace(/^\uFEFF/, '').split(/\r?\n/);
  if (!lines.length || !lines[0].trim()) {
    throw new Error('Student CSV is empty');
  }
  const header = splitCsvLine(lines[0]).map(function (cell) {
    return cell.trim().toLowerCase();
  });
  const emailIdx = header.indexOf('email');
  const passwordIdx = header.indexOf('password');
  const tokenIdx = header.indexOf('access_token');
  if (emailIdx === -1 || passwordIdx === -1 || tokenIdx === -1) {
    throw new Error('Student CSV header must be email,password,access_token');
  }

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cols = splitCsvLine(lines[i]);
    const email = String(cols[emailIdx] || '').trim();
    const password = cols[passwordIdx] === undefined ? '' : String(cols[passwordIdx]);
    const accessToken = String(cols[tokenIdx] || '').trim();
    if (!email || !password.trim()) {
      throw new Error('CSV row ' + (i + 1) + ' needs an email and a password');
    }
    rows.push({
      email: email,
      password: password,
      access_token: accessToken,
    });
  }
  if (!rows.length) throw new Error('Student CSV has no accounts');
  return rows;
}

export function assertUniqueRoster(roster, total) {
  const seen = {};
  for (let i = 0; i < total; i++) {
    const email = String(roster[i].email || '').toLowerCase();
    if (!email) throw new Error('Selected roster row ' + (i + 1) + ' is missing an email');
    if (seen[email]) {
      throw new Error('Duplicate student in the selected roster: ' + roster[i].email);
    }
    seen[email] = true;
  }
}
