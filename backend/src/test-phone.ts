import { extractPhone } from "./utils/phone";

const phones = [
  "+91 9876543210",
  "+1 (415) 555-1234",
  "415-555-1234 x234",
  "+44 7911 123456 ext 89",
  "9876543210",
];

phones.forEach((phone) => {
  console.log(phone);
  console.log(extractPhone(phone));
  console.log("----------------------");
});