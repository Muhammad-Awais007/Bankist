'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Muhammad Awais',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Muhammad Fakhar Arshad',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Ali Muhammad Madni',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Saran Ahmad',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        
        <div class="movements__value">${mov} €</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income} €`;

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc.movements);
  // Display Balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent FORM from Submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value,
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;

    containerApp.style.opacity = 100;

    // Clear input fielsa
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update User Interface
    updateUI(currentAccount);
  } else {
    labelWelcome.textContent = `Incorrect Pin, Please Enter Correct Pin`;
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value,
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // Doing the Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update User Interface
    updateUI(currentAccount);
  } else {
    alert('Enter Correct Account Details');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add Movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  } else {
    alert('Cannot offer this Amount');
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName,
    );

    console.log(index);

    // Delete Account
    accounts.splice(index, 1);

    //  Hide UI
    containerApp.style.opacity = 0;
  } else {
    alert('Enter Correct Account Details');
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
// LECTURES
/////////////////////////////////////////////////

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
//   ['PKR', 'Pakistani Rupees'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*

///////////////////////////////////////
// Simple Array Methods
///////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice Method
console.log(arr);
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(-2));
console.log(arr.slice(1, -1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// Splice Method
// console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// Reverse Method
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

console.log(arr + ',' + arr2);

// Concatinate / CONCAT Method
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN Method
console.log(letters.join(' - '));

///////////////////////////////////////
// The at Method
///////////////////////////////////////

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// Getting the last Element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log(arr.at(-2));

console.log('Awais'.at(0));
console.log('Awais'.at(-1));

///////////////////////////////////////
// Looping Arrays ForEach
///////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Using ForOf loop
console.log('----- Using ForOF Method -----');
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You Deposited: ${Math.abs(movement)}$ `);
  } else {
    console.log(`Movement ${i + 1}: You Withdraw: ${Math.abs(movement)}`);
  }
}

// Using ForEach loop
console.log('----- Using ForEach Method -----');
movements.forEach(function (move, i, arr) {
  if (move > 0) {
    console.log(`Movement ${i + 1}: You Deposited: ${Math.abs(move)}$ `);
  } else {
    console.log(`Movement ${i + 1}: You Withdraw: ${Math.abs(move)}`);
  }
});
// 0: Function(200)
// 1: Function(450)
// 2: Function(400)
// ...


///////////////////////////////////////
// ForEach With Maps and Sets
///////////////////////////////////////

// Map using ForEach
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ['PKR', 'Pakistani Rupees'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set using ForEach
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR', 'PKR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  // In ForEach for Sets, Keys and Values are same
  console.log(`${value}: ${value}`);
});

///////////////////////////////////////
// The Map Method
///////////////////////////////////////

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// Using Arrow Function
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

// Using ForOf Loop
const movementsUSDForOf = [];
for (const mov of movements) movementsUSDForOf.push(mov * eurToUsd);

console.log(movementsUSDForOf);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} : ${Math.abs(mov)}`,
);

console.log(movementsDescriptions);

///////////////////////////////////////
// The Filter Method
///////////////////////////////////////

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
const withdrew = movements.filter(mov => mov < 0);

console.log(movements);
console.log(deposits);
console.log(withdrew);

// Using ForOf loop
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}

console.log(depositsFor);

///////////////////////////////////////
// The Reduce Method
///////////////////////////////////////

console.log(movements);

// Accumulator -> Like a Showball / Sum of all
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

// Doing same with the For loop
let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

// Maximum value in array
const maxValue = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

console.log(maxValue);

/////////////////////////////////////////
// The Chaining Method
/////////////////////////////////////////

const eurToUsd = 1.1;

// PIPELINE(Data gose in and comes processed at the end)

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

///////////////////////////////////////
// The Find Method
///////////////////////////////////////

const firstWithdrawl = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawl);

console.log(accounts);

// Practice using Find() Metod
const account = accounts.find(acc => acc.owner === 'Saran Ahmad');
console.log(account);

// Practice using ForOf Loop
// let account = [];

// for (const acc of accounts) {
//   if (acc.owner === 'Saran Ahmad') {
//     account = acc;
//   }
// }

console.log(account);

///////////////////////////////////////
// Some and Every Method
///////////////////////////////////////


console.log(movements);
// Check's only Equality
console.log(movements.includes(-130));

// Some Method
// Can Check Condition (Can Check Single Element)
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// Every Method
//Can Check Condition (Can Check All Element)
console.log(account4.movements.every(mov => mov > 0));

// Saperate Callback Function
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////
// Flat and FlatMap Method
///////////////////////////////////////

// Flat Method
// Removes all nested arrays and returns back single array comtaining all elements.
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(arr.flat());
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8, [9, 10]];
// retreving 2 levels from nested arrays
console.log(arrDeep.flat(2));

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance);

// FlatMap Method
// Allows Using Map and Flat method combined, But FlatMap goes only one level deep

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance2);

///////////////////////////////////////
// Sorting Arrays
///////////////////////////////////////

// Ssorting Strings
const owners = ['Fakhar', 'Awais', 'Saran', 'Madni'];

console.log(owners.sort());
// It Mutates original Array, so we have to use sort carefully
console.log(owners);

// Sorting Numbers
console.log(movements);

// return < 0, A, B (Keep order)
// return > 0, B, A (Switch O)

// Ascending
// Using Traditional Methods
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   }
//   if (a < b) {
//     return -1;
//   }
// });

// Using Sort Method
movements.sort((a, b) => a - b);

console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) {
//     return -1;
//   }
//   if (a < b) {
//     return 1;
//   }
// });

movements.sort((a, b) => b - a);

console.log(movements);

///////////////////////////////////////
// More ways of Creating and Filling Arrays
///////////////////////////////////////

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty Arrays and Fill Method
const x = new Array(7);
console.log(x);
console.log(x.map(() => 5)); // Dose Nothing

// Fill(value, start, stop)
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.From

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// We use (_)Underscore to show unused parameter
const z = Array.from({ length: 7 }, (_, i) => i + 1);

console.log(z);
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')),
  );

  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];

  console.log(movementsUI2);
  // By using spread operator, we have to done Maping saperately
});

// Randdom number 1 to 100
const randomDiceRoll = Array.from(
  { length: 100 },
  (_, i) => i + Math.trunc(Math.random() * 100) + 1,
);

console.log(randomDiceRoll);

///////////////////////////////////////
// Array Methods Practice
///////////////////////////////////////

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// practicing without Reduce method
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

//Using Reduce method
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  //  Same reduce using (++)Incriment operator
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// 3.
const { deposits, withdrawls } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawls += cur);
      // Doing same but in other way
      sums[cur > 0 ? 'deposits' : 'withdrawls'] += cur;
      return sums;
    },
    { deposits: 0, withdrawls: 0 },
  );

console.log(deposits, withdrawls);

// 4.
// Trying to do letter capilization:
// this is a nicwe title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

*/
