const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://dani-todomanagelist.netlify.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// API Routes
const doctorRoutes = require('./api/doctor');
const userRoutes = require('./api/user');
const appointment = require('./api/appointment');
const specialty = require('./api/specialty/specialtyController');
const medicalCenter = require('./api/medical_center/medicalController');
const previsions = require('./api/previsions/previsionsController');
const email = require('./api/send-email/emailController');
const rut = require('./api/validation_rut/rutController');

// Register API routes
app.use('/api/doctor', doctorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointment', appointment);
app.use('/api/previsions', previsions.getAllPrevisions);
app.use('/api/medical-center', medicalCenter.getAllMedicalCenter);
app.use('/api/specialty', specialty.getAllSpecialty);
app.use('/api/rut', rut.validationRut);
app.use('/api/send-email', email.sendEmail);

// Root route
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
