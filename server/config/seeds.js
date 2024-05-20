const db = require('./connection');
const { User, Part, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {

  await cleanDB('Category', 'categories');
  await cleanDB('User', 'users');
  await cleanDB('Part', 'parts');


  const categories = await Category.insertMany([
    // creating categories for parts to sit in.
    { name: 'Motherboard' }, // id: 0
    { name: 'CPU' }, // id: 1
    { name: 'GPU' }, // id: 2
    { name: 'RAM' }, // id: 3
    { name: 'PSU' }, // id: 4
    { name: 'Case' }, // id: 5
    { name: 'Storage' }, // id: 6
    { name: 'Cooling' } // id: 7
  ]);

  // I'm only populating one part in each category for now, because I intend to
  // create a way for admins to add new parts or update old parts in the database from the client.
  const parts = await Part.insertMany([
    {
      name: 'ASUS GeForce RTX 4070 Dual OC 12GB',
      description:
        'The ASUS GeForce RTX 4070 Dual OC 12GB graphics card features a 2520MHz boost clock, 2550MHz OC clock, 12GB GDDR6X 192-bit memory interface, 21Gb/s memory speed, PCI-E 4.0, 1 x HDMI 2.1, 3 x DisplayPort 1.4a, OpenGL 4.6 and DirectX 12 support.',
      image: 'RTX4070.png',
      price: 949,
      quantity: 100,
      manuLink: 'https://www.asus.com/au/motherboards-components/graphics-cards/dual/dual-rtx4070-o12g/',
      category: categories[2]._id,
    },
    {
      name: 'ASUS Prime B760M-A WIFI DDR5 Motherboard',
      description:
        'The ASUS Prime B760M-A motherboard supports 12th/13th/14th Gen Intel Core processors, Pentium Gold and Celeron processors and LGA 1700 sockets, features up to 4 x DDR5 memory slots, PCIe 4.0 compatible expansion slots, 2 x M.2 slots, 4 x SATA ports (Gb/s), 6 x rear USB ports, 10 x front USB ports, Realtek 2.5Gb Ethernet, Realtek 7.1 HD audio codec, and an mATX form factor.',
      image: 'Asus-B760M-A.png',
      price: 259,
      quantity: 100,
      manuLink: 'https://www.asus.com/au/motherboards-components/motherboards/prime/prime-b760m-a-wifi/',
      category: categories[0]._id
    },
    {
      name: 'Samsung 970 EVO Plus NVMe SSD 1TB',
      description:
        'The Samsung SSD 970 EVO Plus is a client PC NVMe SSD with 3-bit MLC V-NAND. The 970 EVO Plus is specially designed for tech enthusiasts, hardcore gamers, and professionals who need unrivalled performance, superior reliability, and it boasts the best-in-class capacity for intensive workloads on PCs and workstations.',
      image: 'Samsung-970-EVO-Plus.jpg',
      price: 199,
      quantity: 100,
      manuLink: 'https://www.samsung.com/au/memory-storage/nvme-ssd/970-evo-plus-nvme-m-2-ssd-1tb-mz-v7s1t0bw/',
      category: categories[6]._id
    },
    {
      name: 'Intel Core i7 14700 Processor',
      description:
        'Intel Core i7 14700 (5.4GHz max clock speed), 20 Cores, 28 Threads, Socket LGA 1700, BX8071514700.',
      image: 'Intel-i7-14700.avif',
      price: 609,
      quantity: 100,
      manuLink: 'https://www.intel.com/content/www/us/en/products/sku/236781/intel-core-i7-processor-14700-33m-cache-up-to-5-40-ghz/specifications.html',
      category: categories[1]._id
    },
    {
      name: 'ASUS GT302 TUF Gaming ARGB Mid Tower E-ATX Case Black',
      description:
        'The ASUS GT302 TUF Gaming ARGB Mid Tower ATX Case features an optimised square-type mesh front with four pre-installed 120mm PWM ARGB fans ensuring maximised airflow efficiency, supports mini-ITX, micro-ATX, ATX and E-ATX motherboards, with radiator support at the front (up to 280mm), top (up to 360mm), and rear (up to 140mm), and supports a graphics card of up to 407mm in length.',
      image: 'Asus-GT302-aRGB-Black.png',
      price: 239,
      quantity: 100,
      manuLink: 'https://www.asus.com/motherboards-components/cases/tuf-gaming/tuf-gaming-gt302-argb/',
      category: categories[5]._id
    },
    {
      name: 'ASUS ROG Strix Gold 850W Modular Power Supply',
      description:
        'The ASUS ROG Strix Gold 850W Modular Power Supply is 80PLUS gold certified, features an axial-tech fan design with dual ball fan bearings, ROG heatsinks that provide 2 x more volume resulting in significantly lower temperatures, 0dB technology, Japanese capacitors to ensure efficient operation, includes magnetic logos and stickers for cosmetic purposes, and is fully modular.',
      image: 'Asus-ROG-Stric-850W-Mod.png',
      price: 209,
      quantity: 100,
      manuLink: 'https://rog.asus.com/au/power-supply-units/rog-strix/rog-strix-850g-model/',
      category: categories[4]._id
    },
    {
      name: 'Corsair Dominator RGB 32GB (2x16GB) 5200MHz CL40 DDR5',
      description:
        'The Corsair Dominator RGB 32GB (2x16GB) features 5200MHz CL40 DDR5 memory, tested latency of 40-40-40-77, 1.25V, custom high-performance PCB, onboard voltage regulation, XMP 3.0, 12 individually addressable Capellix RGB LEDs, compatible with Corsair iCUE and is compatible with DDR5 motherboards.',
      image: 'Corsair-Dominator-RGB-32GB-5200-2x16-DDR5.jpg',
      price: 209,
      quantity: 100,
      manuLink: 'https://www.corsair.com/us/en/p/memory/cmt32gx5m2b5200c40/dominatora-platinum-rgb-32gb-2x16gb-ddr5-dram-5200mhz-c40-memory-kit-a-black-cmt32gx5m2b5200c40',
      category: categories[3]._id
    },
    {
      name: 'ASUS ROG Ryuo III 360 ARGB AIO CPU Cooler',
      description:
        'Gloriously tame the thermals of your high-performance rig with the ROG Ryuo III 360 ARGB. Its premium shell frames an AniMe Matrix display that can be customized to uniquely express your allegiance. Encased deeper within is an 8th Gen Asetek pump that spins coolant through a higher capacity radiator chilled by 120mm ROG ARGB fans, giving your CPU the headroom to flex through everything.',
      image: 'ASUS-ROG-3-360-ARGB-AIO.jpg',
      price: 419,
      quantity: 100,
      manuLink: 'https://rog.asus.com/au/cooling/cpu-liquid-coolers/rog-ryuo/rog-ryuo-iii-360-argb-model/',
      category: categories[7]._id
    },
  ]);

  // test user
  await User.create({
    firstName: 'Jakeb',
    lastName: 'Jackson',
    email: 'jjackson@testmail.com',
    password: 'password12345',
    orders: []
  });

  console.log('Users seeded');

  process.exit();
});