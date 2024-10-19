import { prisma } from "../lib/prisma";
const bcrypt = require("bcrypt");

async function main() {

  await prisma.user.deleteMany()    // Deletes all users
  await prisma.vendor.deleteMany()  // Deletes all vendors
  await prisma.station.deleteMany() // Deletes all stations
  await prisma.item.deleteMany()    // Deletes all items
  await prisma.washer.deleteMany()  // Deletes all washers

  // SEED USERS
  await prisma.user.createMany({
    data: [
      { id: 31, name: null, email: "u1@t.com", password: await bcrypt.hash("test1", 10), points: 0, discounts: [], history: [] },
      { id: 32, name: null, email: "u2@t.com", password: await bcrypt.hash("test2", 10), points: 0, discounts: [], history: [] },
      { id: 33, name: null, email: "u3@t.com", password: await bcrypt.hash("test3", 10), points: 0, discounts: [], history: [] }
    ]
  })

  // SEED VENDORS
  await prisma.vendor.createMany({
    data: [
      { id: 21, email: "v1@t.com", password: await bcrypt.hash("test1", 10), name: null, x: 49.01, y: 67.01, inventory: [] },
      { id: 22, email: "v2@t.com", password: await bcrypt.hash("test2", 10), name: null, x: 47.01, y: 67.01, inventory: [] },
      { id: 23, email: "v3@t.com", password: await bcrypt.hash("test3", 10), name: null, x: 51.01, y: 63.01, inventory: [] },
      { id: 24, email: "v4@t.com", password: await bcrypt.hash("test4", 10), name: null, x: 47.01, y: 69.01, inventory: [] },
      { id: 25, email: "v5@t.com", password: await bcrypt.hash("test5", 10), name: null, x: 51.01, y: 69.01, inventory: [] }
    ]
  })

  // SEED STATIONS
  await prisma.station.createMany({
    data: [
      { id: 1, x: 49.01, y: 67.01, capacity: 120, tokens: 100, inventory: [] },
      { id: 2, x: 47.01, y: 63.01, capacity: 120, tokens: 100, inventory: [] },
      { id: 3, x: 51.01, y: 69.01, capacity: 120, tokens: 100, inventory: [] }
    ]
  })

  // SEED WASHERS
  await prisma.washer.create({
    data: {
      email: "w1@t.com", 
      password: await bcrypt.hash("test1", 10),
      x: 50.01,
      y: 47.23,
      inventory: []
    }
  })

  const serviceware = []

  // Vendor 1
  for (let i = 1; i <= 1000; i++) {
    serviceware.push({
      id: 100 + i,
      name: "Cup",
      type: null,
      status: "Fresh",
      owner: 21,
      size: 2
    })
  }
  for (let i = 1; i <= 100; i++) {
    serviceware.push({
      id: 1100 + i,
      name: "Plate",
      type: "Regular",
      status: "Fresh",
      owner: 21,
      size: 5
    })
  }
  for (let i = 1; i <= 800; i++) {
    serviceware.push({
      id: 1200 + i,
      name: "Plate",
      type: "Halal",
      status: "Fresh",
      owner: 21,
      size: 5
    })
  }
  for (let i = 1; i <= 100; i++) {
    serviceware.push({
      id: 2000 + i,
      name: "Plate",
      type: "Vegetarian",
      status: "Fresh",
      owner: 21,
      size: 5
    })
  }

  // Vendor 2
  for (let i = 1; i <= 1000; i++) {
    serviceware.push({
      id: 2100 + i,
      name: "Cup",
      type: null,
      status: "Fresh",
      owner: 22,
      size: 2
    })
  }
  for (let i = 1; i <= 500; i++) {
    serviceware.push({
      id: 3100 + i,
      name: "Plate",
      type: "Regular",
      status: "Fresh",
      owner: 22,
      size: 5
    })
  }
  for (let i = 1; i <= 175; i++) {
    serviceware.push({
      id: 3600 + i,
      name: "Plate",
      type: "Halal",
      status: "Fresh",
      owner: 22,
      size: 5
    })
  }
  for (let i = 1; i <= 200; i++) {
    serviceware.push({
      id: 3775 + i,
      name: "Plate",
      type: "Vegetarian",
      status: "Fresh",
      owner: 22,
      size: 5
    })
  }

  // Vendor 3
  for (let i = 1; i <= 1000; i++) {
    serviceware.push({
      id: 3975 + i,
      name: "Cup",
      type: null,
      status: "Fresh",
      owner: 23,
      size: 2
    })
  }
  for (let i = 1; i <= 300; i++) {
    serviceware.push({
      id: 4975 + i,
      name: "Plate",
      type: "Regular",
      status: "Fresh",
      owner: 23,
      size: 5
    })
  }
  for (let i = 1; i <= 175; i++) {
    serviceware.push({
      id: 5275 + i,
      name: "Plate",
      type: "Halal",
      status: "Fresh",
      owner: 23,
      size: 5
    })
  }
  for (let i = 1; i <= 900; i++) {
    serviceware.push({
      id: 5450 + i,
      name: "Plate",
      type: "Vegetarian",
      status: "Fresh",
      owner: 23,
      size: 5
    })
  }

  // Vendor 4
  for (let i = 1; i <= 1000; i++) {
    serviceware.push({
      id: 6350 + i,
      name: "Cup",
      type: null,
      status: "Fresh",
      owner: 24,
      size: 2
    })
  }
  for (let i = 1; i <= 800; i++) {
    serviceware.push({
      id: 7350 + i,
      name: "Plate",
      type: "Regular",
      status: "Fresh",
      owner: 24,
      size: 5
    })
  }
  for (let i = 1; i <= 175; i++) {
    serviceware.push({
      id: 8150 + i,
      name: "Plate",
      type: "Halal",
      status: "Fresh",
      owner: 24,
      size: 5
    })
  }
  for (let i = 1; i <= 200; i++) {
    serviceware.push({
      id: 8325 + i,
      name: "Plate",
      type: "Vegetarian",
      status: "Fresh",
      owner: 24,
      size: 5
    })
  }

  // Vendor 5
  for (let i = 1; i <= 1000; i++) {
    serviceware.push({
      id: 8525 + i,
      name: "Cup",
      type: null,
      status: "Fresh",
      owner: 25,
      size: 2
    })
  }
  for (let i = 1; i <= 300; i++) {
    serviceware.push({
      id: 9525 + i,
      name: "Plate",
      type: "Regular",
      status: "Fresh",
      owner: 25,
      size: 5
    })
  }
  for (let i = 1; i <= 175; i++) {
    serviceware.push({
      id: 9825 + i,
      name: "Plate",
      type: "Halal",
      status: "Fresh",
      owner: 25,
      size: 5
    })
  }
  for (let i = 1; i <= 100; i++) {
    serviceware.push({
      id: 10000 + i,
      name: "Plate",
      type: "Vegetarian",
      status: "Fresh",
      owner: 25,
      size: 5
    })
  }

  // Seed all the serviceware items into the database with already created vendors
  await prisma.item.createMany({
    data: serviceware
  })

  console.log("Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
