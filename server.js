const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Раздача статических файлов из текущей папки или из папки "public"
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
