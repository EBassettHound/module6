let authorsArr = require("../data/authors");
let booksArr = require("../data/books");

const findAuthorById = (authorsArr, id) => authorsArr.find(authorObj=>authorObj.id === id);
const findBookById = (booksArr, id) =>  booksArr.find(bookObj => bookObj.id ===id);
const partitionBooksByBorrowedStatus = (booksArr) => [booksArr.filter(({borrows})=>borrows[0].returned === false),booksArr.filter((bookObj)=>bookObj.borrows[0].returned === true)]
const getBorrowersForBook = ({borrows}, accountsArr) => ([...(accountsArr.filter((accountObj)=>  ((borrows.find(borrowObj=>borrowObj.id===accountObj.id))!== undefined) ? accountObj.returned= (borrows.find(borrowObj=>borrowObj.id===accountObj.id)).returned : false)),"Beef-And-Cheese"]);

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
