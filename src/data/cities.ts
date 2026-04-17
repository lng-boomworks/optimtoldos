export interface City {
  name: string;
}

export const SERVICE_CITIES: City[] = [
  // Costa Blanca — Costa
  { name: "Alicante" },
  { name: "Elche" },
  { name: "Torrevieja" },
  { name: "Benidorm" },
  { name: "Santa Pola" },
  { name: "Orihuela" },
  { name: "Guardamar del Segura" },
  { name: "Dénia" },
  { name: "Jávea" },
  { name: "Altea" },
  { name: "Calpe" },
  // Área metropolitana
  { name: "San Vicente del Raspeig" },
  { name: "San Juan de Alicante" },
  { name: "Mutxamel" },
  { name: "El Campello" },
  { name: "Villajoyosa" },
  // Interior
  { name: "Alcoy" },
  { name: "Elda" },
  { name: "Petrer" },
  { name: "Novelda" },
];

export const SERVICE_CITIES_SCHEMA = SERVICE_CITIES.map((c) => ({
  "@type": "City" as const,
  name: c.name,
}));
