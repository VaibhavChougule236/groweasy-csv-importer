import { normalizeRecords } from "./services/normalization.service";

const records = [
  {
    "Full Name": "John Doe",
    "Mail ID": "john@gmail.com",
    "Town": "Pune",
    "Organization": "Google",
  },
];

const mapping = {
  "Full Name": "name",
  "Mail ID": "email",
  "Town": "city",
  "Organization": "company",
};

console.log(normalizeRecords(records, mapping));