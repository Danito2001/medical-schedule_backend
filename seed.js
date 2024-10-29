const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt'); // Importar bcrypt
const prisma = new PrismaClient();

async function main() {

    const doctors = [
        { id: 1, name: 'Carlos', lastName: 'García', email: 'doctor1@gmail.com', password: 'password123', specialtyId: 1, centerId: 1 },
        { id: 2, name: 'María', lastName: 'Fernández', email: 'doctor2@gmail.com', password: 'password123', specialtyId: 2, centerId: 2 },
        { id: 3, name: 'Juan', lastName: 'López', email: 'doctor3@gmail.com', password: 'password123', specialtyId: 3, centerId: 3 },
        { id: 4, name: 'Ana', lastName: 'Martínez', email: 'doctor4@gmail.com', password: 'password123', specialtyId: 4, centerId: 4 },
        { id: 5, name: 'Luis', lastName: 'Sánchez', email: 'doctor5@gmail.com', password: 'password123', specialtyId: 5, centerId: 5 },
        { id: 6, name: 'Laura', lastName: 'Pérez', email: 'doctor6@gmail.com', password: 'password123', specialtyId: 6, centerId: 6 },
        { id: 7, name: 'Miguel', lastName: 'Ramírez', email: 'doctor7@gmail.com', password: 'password123', specialtyId: 1, centerId: 1 },
        { id: 8, name: 'Sofía', lastName: 'Torres', email: 'doctor8@gmail.com', password: 'password123', specialtyId: 2, centerId: 2 },
        { id: 9, name: 'David', lastName: 'Vargas', email: 'doctor9@gmail.com', password: 'password123', specialtyId: 3, centerId: 3 },
        { id: 10, name: 'Lucía', lastName: 'Castillo', email: 'doctor10@gmail.com', password: 'password123', specialtyId: 4, centerId: 4 },
        { id: 11, name: 'José', lastName: 'Molina', email: 'doctor11@gmail.com', password: 'password123', specialtyId: 5, centerId: 5 },
        { id: 12, name: 'Patricia', lastName: 'Rojas', email: 'doctor12@gmail.com', password: 'password123', specialtyId: 6, centerId: 6 },
        { id: 13, name: 'Andrés', lastName: 'Navarro', email: 'doctor13@gmail.com', password: 'password123', specialtyId: 1, centerId: 1 },
        { id: 14, name: 'Gabriela', lastName: 'Suárez', email: 'doctor14@gmail.com', password: 'password123', specialtyId: 2, centerId: 2 },
        { id: 15, name: 'Ricardo', lastName: 'Hernández', email: 'doctor15@gmail.com', password: 'password123', specialtyId: 3, centerId: 3 },
        { id: 16, name: 'Natalia', lastName: 'Morales', email: 'doctor16@gmail.com', password: 'password123', specialtyId: 4, centerId: 4 },
        { id: 17, name: 'Pedro', lastName: 'Reyes', email: 'doctor17@gmail.com', password: 'password123', specialtyId: 5, centerId: 5 },
        { id: 18, name: 'Elena', lastName: 'Silva', email: 'doctor18@gmail.com', password: 'password123', specialtyId: 6, centerId: 6 },
        { id: 19, name: 'Francisco', lastName: 'Ortega', email: 'doctor19@gmail.com', password: 'password123', specialtyId: 1, centerId: 1 },
        { id: 20, name: 'Paula', lastName: 'Cruz', email: 'doctor20@gmail.com', password: 'password123', specialtyId: 2, centerId: 2 },
  	];

	const patients = [
		{ id: 1, rut: '12.345.678-9', name: 'Juan', lastName: 'Pérez', previsionId: 1 },
		{ id: 2, rut: '11.223.344-5', name: 'María', lastName: 'González', previsionId: 2 },
		{ id: 3, rut: '22.334.556-7', name: 'Carlos', lastName: 'Martínez', previsionId: 1 },
		{ id: 4, rut: '33.445.667-8', name: 'Ana', lastName: 'Hernández', previsionId: 2 },
		{ id: 5, rut: '44.556.778-9', name: 'Pedro', lastName: 'Soto', previsionId: 1 },
		{ id: 6, rut: '55.667.889-0', name: 'Luisa', lastName: 'Ramírez', previsionId: 2 },
		{ id: 7, rut: '66.778.990-1', name: 'Jorge', lastName: 'López', previsionId: 1 },
		{ id: 8, rut: '77.889.001-2', name: 'Claudia', lastName: 'Mendoza', previsionId: 2 },
	];

	const hashedDoctors = await Promise.all(doctors.map(async (doctor) => {
        const hashedPassword = await bcrypt.hash(doctor.password, 10); // Encriptar la contraseña
        return { ...doctor, password: hashedPassword }; // Reemplazar la contraseña por la encriptada
    }));
	
	await prisma.patient.createMany({
		data: patients,
		skipDuplicates: true, 
	});
  

  	await prisma.doctor.createMany({
    	data: hashedDoctors,
    	skipDuplicates: true,
  	});

  	console.log('Doctors and Patients seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
