require('dotenv').config({ path: '../.env' });

const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
  
  // MySQL 연결
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
  
  // 저장 버튼 클릭 -> 정보를 db에 저장
  app.post('/saveExpense', (req, res) => {
    const { date, amount, description } = req.body;
  
    const query = 'INSERT INTO expenses (date, amount, description) VALUES (?, ?, ?)';
    connection.query(query, [date, amount, description], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving expense');
      } else {
        res.send('Expense saved successfully');
      }
    });
  });
  
  // db에서 지출 정보 클라이언트에 응답
  app.get('/expenses', (req, res) => {
    connection.query('SELECT * FROM expenses', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching expenses');
      } else {
        res.json(results);
      }
    });
  });

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 루트 URL에 대한 응답
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다!`);
});
