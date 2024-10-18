const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users.js');
const vendorsRoutes = require('./routes/vendors.js');
const washerRoutes = require('./routes/washer.js');
const stationsRoutes = require('./routes/stations.js');
const itemsRoutes = require('./routes/items.js');
const discountsRoutes = require('./routes/discounts.js');
const authRoutes = require('./routes/auth.js');

const app = express(bodyParser.json());
const PORT = 5000;

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/vendors', vendorsRoutes);
app.use('/api/v1/washer', washerRoutes);
app.use('/api/v1/stations', stationsRoutes);
app.use('/api/v1/items', itemsRoutes);
app.use('/api/v1/discounts', discountsRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));