const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

const specialties = [
    { id: "cardiology", valor: "Cardiología" },
    { id: "dermatology", valor: "Dermatología" },
    { id: "neurology", valor: "Neurología" },
    { id: "pediatrics", valor: "Pediatría" },
    { id: "psychiatry", valor: "Psiquiatría" },
    { id: "orthopedics", valor: "Ortopedia" },
];

const previsions = [
    { id: 'fonasa', value: 'FONASA' },
    { id: 'isapre', value: 'ISAPRE' }
];

const medicalCenters = [
    { id: 1, commune: 'las_condes' },
    { id: 2, commune: 'la_reina' },
    { id: 3, commune: 'providencia' },
    { id: 4, commune: 'santiago' },
    { id: 5, commune: 'peñalolen' },
    { id: 6, commune: 'ñuñoa' },
];

await prisma.specialty.createMany({
    data: specialties.map(s => ({ id: s.id, name: s.valor })),
    skipDuplicates: true,
});

await prisma.prevision.createMany({
    data: previsions.map(p => ({ id: p.id, name: p.value })),
    skipDuplicates: true,
});

await prisma.medicalCenter.createMany({
    data: medicalCenters,
    skipDuplicates: true,
});

  	console.log('Specialties, Previsions, and Medical Centers seeded successfully');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
})
	.finally(async () => {
		await prisma.$disconnect();
});
