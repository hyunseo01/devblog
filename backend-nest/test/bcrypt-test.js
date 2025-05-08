const bcrypt = require('bcrypt');

bcrypt.hash('9501', 10).then((hash) => {
  console.log('📌 관리자비번 bcrypt 해시:', hash);
});
