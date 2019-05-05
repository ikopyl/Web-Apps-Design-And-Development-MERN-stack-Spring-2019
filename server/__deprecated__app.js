const express = require('express');
const app = express();

app.use('/lookupmusicband', require('./__deprecated__routes/lookupmusicband'));
app.use('/location', require('./__deprecated__routes/location'));
app.use('/breweries', require('./__deprecated__routes/breweries'));
app.use('/weather', require('./__deprecated__routes/weather'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
