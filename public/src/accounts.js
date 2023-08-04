let accountsArr = require("../data/accounts");
let booksArr = require("../data/books");
let authorsArr = require("../data/authors");
let partition = require("./books").partitionBooksByBorrowedStatus;

const findAccountById = (accountsArr, id) => accountsArr.find(accObj=>accObj.id === id);
const sortAccountsByLastName = (accountsArr) => accountsArr.sort((accA,accB)=> (accA.name.last) < (accB.name.last) ? -1 : 1);
const getTotalNumberOfBorrows = ({id}, booksArr) =>{
  let count = 0;
  booksArr.forEach(bookObj => bookObj.borrows.forEach(borrowObj => count += (borrowObj.id === id ? 1 : 0)));
  return count;
}

function getBooksPossessedByAccount(account, booksArr, authorsArr) {
  const [checkedOut] = partition(booksArr);
  let result = checkedOut.filter(bookObj=> { if (bookObj.borrows[0].id === account.id) { 
    authorsArr.forEach(authorObj => {if (authorObj.id === bookObj.authorId)bookObj.author = authorObj});
    return true;
  }})
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
