const bcrypt = require('bcrypt');

bcrypt.hash('1234', 10).then((hash) => {
  console.log('📌 1234의 bcrypt 해시:', hash);
});
