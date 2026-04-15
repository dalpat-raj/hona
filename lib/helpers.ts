// import bcrypt from 'bcryptjs'
// export function saltAndHashPassword(password: string) {
//   const saltRounds = 10;
//   const salt = bcrypt.genSaltSync(saltRounds); 
//   const hash = bcrypt.hashSync(password, salt); 
//   return hash; 
// }

import { Product } from "./definations";

export const formatTitle = (title: string) => {
  return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, ''); 
};

export const formatDate = (date: Date | undefined) => {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',   
    day: 'numeric',   
    month: 'short',   
  }).format(date);
};


export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


export const getPrice = (product: Product) => {
  return product.variants?.[0]?.sellingPrice || 0;
};