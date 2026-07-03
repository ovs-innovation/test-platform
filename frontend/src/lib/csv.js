import api from './api.js';

export function downloadCsv(filename, content) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadFromApi(path, fallbackName) {
  const res = await api.get(path, { responseType: 'blob' });
  const disposition = res.headers['content-disposition'] || '';
  const match = disposition.match(/filename="([^"]+)"/);
  const filename = match ? match[1] : fallbackName;
  const url = URL.createObjectURL(res.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsText(file);
  });
}

export const CSV_TEMPLATE = `question_text,question_type,marks,options,correct_index,correct_indices,solution
"What is 2+2?","mcq",1,"2|3|4|5",2,,"4"
"Select prime numbers","multi_select",2,"2|3|4|6",,"0|1",
`;

export const BANK_CSV_TEMPLATE = `category,question_text,question_type,marks,options,correct_index,correct_indices,solution
JavaScript,"What is typeof null?","mcq",1,"object|number|null|undefined",0,,"object"
`;
