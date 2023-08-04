let booksArr = require("../data/books");
let accountArr = require("../data/accounts");

const getTotalBooksCount = booksArr => booksArr.length;
const getTotalAccountsCount = accountArr => accountArr.length;
const getBooksBorrowedCount = booksArr => booksArr.reduce((accum,{borrows})=> borrows[0].returned ? accum += 0 : accum += 1, 0);

function getMostCommonGenres(booksArr) {
  let genreArr =[];
  let genreObj = {};
  booksArr.forEach( bookObj => (genreObj[bookObj.genre] === undefined) ? genreObj[bookObj.genre] = 1 : genreObj[bookObj.genre] += 1)
  for (let genreElem in genreObj) {
    genreArr.push({name:genreElem,count:genreObj[genreElem]})
  }
  return genreArr.sort((genreA,genreB)=> genreB.count - genreA.count).slice(0,5);
}

function getMostPopularBooks(booksArr) {
  let countArr = [];
  booksArr.forEach(bookObj => { countArr.push({name: bookObj.title, count: bookObj.borrows.length})})
  return countArr.sort((bookA,bookB)=> bookB.count - bookA.count).slice(0,5)
}

function getMostPopularAuthors(booksArr, authorsArr) {
  let countArr = [];
  let popularAuth = {};

  booksArr.forEach( bookObj => (popularAuth[bookObj.authorId] === undefined) ? popularAuth[bookObj.authorId] = bookObj.borrows.length : popularAuth[bookObj.authorId] += bookObj.borrows.length);

  for (let key in popularAuth) {
    authorsArr.forEach(authObj=>{if (authObj.id === Number(key)) countArr.push({name: `${authObj.name.first} ${authObj.name.last}`, count: popularAuth[key]});})
  }
  
  return countArr.sort((authA,authB)=> authB.count > authA.count ? 1 : -1).slice(0,5).map((authObj)=>authObj);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
