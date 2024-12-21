const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

const specialties = [
    { id: 1, name: "cardiology" },
    { id: 2, name: "dermatology" },
    { id: 3, name: "neurology" },
    { id: 4, name: "pediatrics" },
    { id: 5, name: "psychiatry" },
    { id: 6, name: "orthopedics" }
];

const previsions = [
    { id: 1, value: 'fonasa' },
    { id: 2, value: 'isapre' }
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
    data: specialties.map(s => ({ id: s.id, name: s.name })),
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
