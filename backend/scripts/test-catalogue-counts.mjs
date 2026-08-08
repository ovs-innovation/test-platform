import { listPublicTestSeries } from '../src/controllers/publicController.js';
import { pool } from '../src/config/db.js';
import { isNeetPg, isNeetUg } from '../../frontend/src/lib/testSeriesCover.js';

const run = async () => {
  try {
    let list = [];
    let resolveRes;
    const resPromise = new Promise((resolve) => { resolveRes = resolve; });
    const res = {
      status: () => res,
      json: (d) => {
        list = d.test_series;
        resolveRes();
      },
    };
    const req = { query: {} };
    listPublicTestSeries(req, res);
    await resPromise;

    console.log('TOTAL SERIES:', list.length);

    const counts = {
      all: 0,
      free: 0,
      jee: 0,
      neet: 0,
      neetpg: 0,
      featured: 0,
    };

    list.forEach((s) => {
      const text = `${s.exam_type || ''} ${s.title || ''}`;
      const isFree = Number(s.price) === 0;
      if (isFree) {
        counts.free++;
      } else {
        counts.all++;
        if (/jee/i.test(text)) counts.jee++;
        if (isNeetUg(text)) counts.neet++;
        if (isNeetPg(text)) counts.neetpg++;
        if (s.is_featured) counts.featured++;
      }
    });

    console.log('DERIVED CATALOGUE COUNTS:', counts);

    console.log('\n--- PAID SERIES LISTING ---');
    list.filter(s => Number(s.price) > 0).forEach(s => {
      console.log(`[${s.exam_type}] ${s.title} | Price: ₹${s.price} | Tests: ${s.test_count} | Days: ${s.validity_days} | Featured: ${s.is_featured}`);
    });

    console.log('\n--- FREE SERIES LISTING ---');
    list.filter(s => Number(s.price) === 0).forEach(s => {
      console.log(`[${s.exam_type}] ${s.title} | Price: ₹${s.price} | Tests: ${s.test_count} | Days: ${s.validity_days}`);
    });

  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
};

run();
