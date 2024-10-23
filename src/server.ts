import express from 'express';

const app = express();
app.use(express.json());

const PORT = 9000;

// Example route with typed req/res
app.get('/', (req, res) => {
    res.send({ message: "wow" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
