// dateUtils.js

import { format, parse } from 'date-fns';

export const convertToISO8601 = (dateString, formatPattern) => {
  try {
    const parsedDate = parse(dateString, formatPattern, new Date(), {
      timeZone: 'America/Sao_Paulo',
    });
    return format(parsedDate, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
  } catch (error) {
    console.error('Erro ao converter a data: ', error);
    return null;
  }
};

export const isValidISO8601Date = (dateString) => {
  // Verifique se a data corresponde ao formato AAAA-MM-DD
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!isoDateRegex.test(dateString)) {
    return false;
  }

  // Agora, você pode tentar criar uma data com a string e verificar se ela é válida
  const parsedDate = new Date(dateString);
  return !isNaN(parsedDate.getTime());
};
