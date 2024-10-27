const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Prevision Seed
  await prisma.prevision.createMany({
    data: [
      { name: 'Fonasa' },
      { name: 'Isapre' }
    ],
    skipDuplicates: true  // Evita errores si algún registro ya existe
  });

  // Specialty Seed
  const specialties = [
    { name: 'Cardiology' },
    { name: 'Neurology' },
    { name: 'Dermatology' },
    { name: 'Pediatrics' },
    { name: 'Orthopedics' },
    { name: 'Gynecology' },
  ];

  await prisma.specialty.createMany({
    data: specialties,
    skipDuplicates: true,  // Evita errores si algún registro ya existe
  });

  // Medical Center Seed
  const medicalCenters = [
    { commune: 'las_condes' },
    { commune: 'la_reina' },
    { commune: 'ñuñoa' },
    { commune: 'providencia' },
    { commune: 'peñalolen' },
    { commune: 'santiago' },
  ];

  await prisma.medicalCenter.createMany({
    data: medicalCenters,
    skipDuplicates: true  // Evita duplicados
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
