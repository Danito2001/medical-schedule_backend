const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    const doctors = [
        { id: 1, name: 'Carlos', lastName: 'García', email: 'example1@gmail.com', password: 'password123', specialtyId: 1, centerId: 1 },
        { id: 2, name: 'María', lastName: 'Fernández', email: 'example2@gmail.com', password: 'password123', specialtyId: 2, centerId: 2 },
        { id: 3, name: 'Juan', lastName: 'López', email: 'example3@gmail.com', password: 'password123', specialtyId: 3, centerId: 3 },
        { id: 4, name: 'Ana', lastName: 'Martínez', email: 'example4@gmail.com', password: 'password123', specialtyId: 4, centerId: 4 },
        { id: 5, name: 'Luis', lastName: 'Sánchez', email: 'example5@gmail.com', password: 'password123', specialtyId: 5, centerId: 5 },
        { id: 6, name: 'Laura', lastName: 'Pérez', email: 'example6@gmail.com', password: 'password123', specialtyId: 6, centerId: 6 },
        { id: 7, name: 'Miguel', lastName: 'Ramírez', email: 'example7@gmail.com', password: 'password123', specialtyId: 1, centerId: 1 },
        { id: 8, name: 'Sofía', lastName: 'Torres', email: 'example8@gmail.com', password: 'password123', specialtyId: 2, centerId: 2 },
        { id: 9, name: 'David', lastName: 'Vargas', email: 'example9@gmail.com', password: 'password123', specialtyId: 3, centerId: 3 },
        { id: 10, name: 'Lucía', lastName: 'Castillo', email: 'example10@gmail.com', password: 'password123', specialtyId: 4, centerId: 4 },
        { id: 11, name: 'José', lastName: 'Molina', email: 'example11@gmail.com', password: 'password123', specialtyId: 5, centerId: 5 },
        { id: 12, name: 'Patricia', lastName: 'Rojas', email: 'example12@gmail.com', password: 'password123', specialtyId: 6, centerId: 6 },
        { id: 13, name: 'Andrés', lastName: 'Navarro', email: 'example13@gmail.com', password: 'password123', specialtyId: 1, centerId: 1 },
        { id: 14, name: 'Gabriela', lastName: 'Suárez', email: 'example14@gmail.com', password: 'password123', specialtyId: 2, centerId: 2 },
        { id: 15, name: 'Ricardo', lastName: 'Hernández', email: 'example15@gmail.com', password: 'password123', specialtyId: 3, centerId: 3 },
        { id: 16, name: 'Natalia', lastName: 'Morales', email: 'example16@gmail.com', password: 'password123', specialtyId: 4, centerId: 4 },
        { id: 17, name: 'Pedro', lastName: 'Reyes', email: 'example17@gmail.com', password: 'password123', specialtyId: 5, centerId: 5 },
        { id: 18, name: 'Elena', lastName: 'Silva', email: 'example18@gmail.com', password: 'password123', specialtyId: 6, centerId: 6 },
        { id: 19, name: 'Francisco', lastName: 'Ortega', email: 'example19@gmail.com', password: 'password123', specialtyId: 1, centerId: 1 },
        { id: 20, name: 'Paula', lastName: 'Cruz', email: 'example20@gmail.com', password: 'password123', specialtyId: 2, centerId: 2 },
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
	
	await prisma.patient.createMany({
		data: patients,
		skipDuplicates: true, 
	});
  

  	await prisma.doctor.createMany({
    	data: doctors,
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
