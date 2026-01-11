const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Company = require("../model/companyModel");

dotenv.config({ path: "../config.env" });

const DB = process.env.DB_URL.replace("<db_password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log("DB connection error:", err);
  });

const banks = [
  // --- United States ---
  "JPMorgan Chase",
  "Bank of America",
  "Wells Fargo",
  "Citigroup",
  "Goldman Sachs",
  "Morgan Stanley",
  "U.S. Bancorp",
  "PNC Financial Services",
  "Capital One",
  "Truist Financial",
  "Charles Schwab Corporation",
  "American Express",

  // --- United Kingdom ---
  "HSBC Holdings",
  "Barclays",
  "Lloyds Banking Group",
  "NatWest Group",
  "Standard Chartered",
  "Nationwide Building Society",
  "Santander UK",
  "Virgin Money",
  "Coutts",

  // --- Europe ---
  "BNP Paribas", // France
  "Crédit Agricole", // France
  "Société Générale", // France
  "Deutsche Bank", // Germany
  "Commerzbank", // Germany
  "UBS Group", // Switzerland
  "Banco Santander", // Spain
  "BBVA", // Spain
  "ING Group", // Netherlands
  "Nordea", // Finland
  "Intesa Sanpaolo", // Italy
  "UniCredit", // Italy

  // --- Canada ---
  "Royal Bank of Canada (RBC)",
  "Toronto-Dominion Bank (TD)",
  "Scotiabank",
  "Bank of Montreal (BMO)",
  "CIBC",

  // --- Australia & New Zealand ---
  "Commonwealth Bank",
  "Westpac",
  "ANZ (Australia and New Zealand Banking Group)",
  "NAB (National Australia Bank)",

  // --- Asia ---
  "ICBC (Industrial and Commercial Bank of China)",
  "China Construction Bank",
  "Agricultural Bank of China",
  "Bank of China",
  "Mitsubishi UFJ Financial Group (MUFG)", // Japan
  "Sumitomo Mitsui Financial Group", // Japan
  "Mizuho Financial Group", // Japan
  "DBS Bank", // Singapore
  "OCBC Bank", // Singapore
  "UOB", // Singapore

  // --- Modern FinTech / Neo Banks (Very popular now) ---
  "Revolut",
  "Monzo",
  "Starling Bank",
  "N26",
  "Chime",
  "Wise",
  "Nubank",
  "SoFi",
  "Ally Bank",
];

const addCompanies = async () => {
  try {
    await Company.deleteMany();

    const formatted = banks.map((name) => ({
      name: name.trim(),
      totalReviews: 0,
      positiveCount: 0,
      negativeCount: 0,
      nutralCount: 0,
      reviews: [],
    }));

    await Company.insertMany(formatted);
    console.log("Companies seeded successfully");
    process.exit();
  } catch (err) {
    console.log("Error seeding companies:", err);
    process.exit(1);
  }
};

const deleteCompanies = async () => {
  try {
    await Company.deleteMany();
    console.log("All companies deleted successfully");
    process.exit();
  } catch (err) {
    console.log("Error deleting companies:", err);
    process.exit(1);
  }
};

const run = async () => {
  const arg = process.argv[2];
  if (arg === "--add") {
    await addCompanies();
  } else if (arg === "--delete") {
    await deleteCompanies();
  } else {
    console.log(
      "Invalid argument. Use '--add' to add companies or '--delete' to delete all companies."
    );
    process.exit(1);
  }
};

run();
