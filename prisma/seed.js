import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const adminExists = await prisma.admin.findFirst({
        where: {username: "admin"},
    });

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash("admin", 10);

        await prisma.admin.create({
            data: {
                username: "admin",
                password: hashedPassword,
                role: "admin",
            },
        });

        console.log("Admin user created!");
    } else {
        console.log("Admin user already exists.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });