export interface PhoneInfo {
  country_code: string;
  mobile_without_country_code: string;
  extension: string;
}

export function extractPhone(phone: string): PhoneInfo {
  if (!phone) {
    return {
      country_code: "",
      mobile_without_country_code: "",
      extension: "",
    };
  }

  let value = phone.trim();

  let extension = "";

  const extensionMatch = value.match(
    /(?:ext\.?|extension|x)\s*(\d+)$/i
  );

  if (extensionMatch) {
    extension = extensionMatch[1];
    value = value.replace(extensionMatch[0], "").trim();
  }

  value = value.replace(/[()\-\s]/g, "");

  let countryCode = "";

  if (value.startsWith("+")) {
    const match = value.match(/^\+\d{1,3}/);

    if (match) {
      countryCode = match[0];
      value = value.substring(countryCode.length);
    }
  }

  value = value.replace(/\D/g, "");

  return {
    country_code: countryCode,
    mobile_without_country_code: value,
    extension,
  };
}