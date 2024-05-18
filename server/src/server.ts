import dotenv from 'dotenv';
import app from './app';
dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
