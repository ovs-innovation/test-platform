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
Physics,"A particle moves along a circular path of radius R. In one complete revolution, its displacement is:","mcq",4,"2πR|πR|Zero|2R",2,,"In one complete revolution, the initial and final positions coincide, so displacement is zero."
Chemistry,"What is the pH value of a neutral aqueous solution at 25°C?","mcq",4,"0|7|14|1",1,,"At 25°C, pure water has [H+] = 10^-7 M, giving a pH of 7."
`;
