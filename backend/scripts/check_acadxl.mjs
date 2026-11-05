import https from 'https';

const candidates = [
  'https://pub-859e5651feee4f16977f11b45a906f44.r2.dev/pyq/AcadXL-Mathematics-PrepXL-Import/AcadXL-Mathematics-PrepXL-Import---test---vector-algebra---mixed.json',
  'https://pub-859e5651feee4f16977f11b45a906f44.r2.dev/pyq/AcadXL-Mathematics-PrepXL-Import/AcadXL-Mathematics-PrepXL-Import---test---vector-algebra---mixed.paper.json',
  'https://pub-859e5651feee4f16977f11b45a906f44.r2.dev/pyq/AcadXL-Mathematics-PrepXL-Import/AcadXL-Mathematics-PrepXL-Import---test---vector-algebra---mixed.questions.json',
  'https://pub-859e5651feee4f16977f11b45a906f44.r2.dev/pyq/AcadXL-Mathematics-PrepXL-Import/vector-algebra.json',
  'https://pub-859e5651feee4f16977f11b45a906f44.r2.dev/papers/AcadXL-Mathematics-PrepXL-Import---test---vector-algebra---mixed.json',
  'https://pub-859e5651feee4f16977f11b45a906f44.r2.dev/mock-tests/AcadXL-Mathematics-PrepXL-Import---test---vector-algebra---mixed.json'
];

async function check(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      console.log(res.statusCode, url);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.log('Error', url, err.message);
      resolve(500);
    }).end();
  });
}

async function main() {
  for (const url of candidates) {
    await check(url);
  }
}

main();
