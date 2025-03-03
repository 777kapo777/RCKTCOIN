import express from 'express';
import { join } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Отдаем статические файлы из папки сборки
app.use(express.static(join(process.cwd(), 'dist')));

// Любой запрос возвращает index.html (для SPA)
app.get('*', (req, res) => {
  res.sendFile(join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
