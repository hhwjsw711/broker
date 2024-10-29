import { headers } from "next/headers";
import countriesData from "./countries.json";
import flags from "./country-flag";
import { EU_COUNTRY_CODES } from "./eu-countries";
import timezones from "./timezones.json";

interface Currency {
  name: string;
  symbol: string;
}

interface Country {
  cca2: string;
  currencies: Record<string, Currency>;
  languages: Record<string, string>;
  flag: string;
}

export function getCountryCode() {
  return headers().get("x-vercel-ip-country") || "SE";
}

export function getTimezone() {
  return headers().get("x-vercel-ip-timezone") || "Europe/Berlin";
}

export function getTimezones() {
  return timezones;
}

export function getCountryInfo() {
  const country = getCountryCode();

  const countries = countriesData as unknown as Country[];

  const countryInfo = countries.find((x) => x.cca2 === country);

  if (!countryInfo) {
    return {
      currencyCode: undefined,
      currency: undefined,
      languages: undefined,
    };
  }

  const currencyCode = Object.keys(countryInfo.currencies)?.at(0);
  const currency = currencyCode ? countryInfo.currencies[currencyCode] : undefined;
  const languages = Object.values(countryInfo.languages).join(", ");

  return {
    currencyCode,
    currency,
    languages,
  };
}

export function isEU() {
  const countryCode = headers().get("x-vercel-ip-country");

  if (countryCode && EU_COUNTRY_CODES.includes(countryCode)) {
    return true;
  }

  return false;
}

export function getCountry() {
  const country = getCountryCode();

  return flags[country as keyof typeof flags];
}
