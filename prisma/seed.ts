import { PrismaClient, Product } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: `${process.env.DATABASE_URL}`,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  const data = Bun.file("dummy-data.json");
  if (!(await data.exists())) {
    console.warn(
      "dummy-data.json file does not exist, make sure you place it in root project directory"
    );

    return;
  }

  const parsedData: Product[] = await data.json();

  try {
    for (const product of parsedData) {
      await prisma.product.create({ data: product });
    }
  } catch (err) {
    if (err instanceof Error) console.error(err.message);

    console.error("Failed seeded database with dummy data");
  } finally {
    console.log("Successfully seeded database with dummy data");
  }
}

main();
