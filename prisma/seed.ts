import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const categories = [
  { id: "cat-elektronik", name: "Elektronik", slug: "elektronik" },
  { id: "cat-fashion", name: "Fashion", slug: "fashion" },
  { id: "cat-rumah-tangga", name: "Rumah Tangga", slug: "rumah-tangga" },
  { id: "cat-kecantikan", name: "Kecantikan", slug: "kecantikan" },
] as const

async function main() {
  console.log("Resetting existing products...")
  await prisma.clickLog.deleteMany()
  await prisma.product.deleteMany()

  console.log("Seeding categories...")
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: { name: cat.name, slug: cat.slug },
      create: { id: cat.id, name: cat.name, slug: cat.slug },
    })
  }

  console.log("Categories seeded. No products — tambahkan produk via admin panel.")
  console.log("Seed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
