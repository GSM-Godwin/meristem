export interface BoardMember {
  name: string;
  position: string;
  imageUrl: string;
}

export const boardOfDirectors: BoardMember[] = [
  {
    name: "Amina Maina",
    position: "",
    imageUrl: "/amina.jpeg",
  },
  {
    name: "Kemi Ojenike",
    position: "",
    imageUrl: "/kemi.jpeg",
  },
  {
    name: "Ohis Ohiwerei",
    position: "",
    imageUrl: "/Ohis.jpeg",
  },
  {
    name: "Sulaiman Adedokun",
    position: "",
    imageUrl: "/Sulaiman.jpeg",
  },
];

export const executiveManagement: BoardMember[] = [
  {
    name: "Sulaiman Adekogun, CFA",
    position: "Group Managing Director — Meristem Securities Limited",
    imageUrl: "",
  },
  {
    name: "Mubo Olabode",
    position: "Director — Meristem Finance Limited",
    imageUrl: "",
  },
  {
    name: "Damilola Hassan",
    position: "Managing Director — Meristem Trustees Limited",
    imageUrl: "",
  },
  {
    name: "Bamidele Bashir",
    position: "Managing Director — Meristem Registrars & Probate Services Limited",
    imageUrl: "",
  },
  {
    name: "Kemi Ogunleye",
    position: "Managing Director — Meristem Wealth Management",
    imageUrl: "",
  },
  {
    name: "Tunde Ajayi",
    position: "Managing Director — Meristem Capital Limited",
    imageUrl: "",
  },
  {
    name: "Oscar Nduka Onyema",
    position: "Chairman — Meristem Stockbrokers Limited",
    imageUrl: "",
  },
  {
    name: "Adaeze Okonkwo",
    position: "Head, Family Office — Meristem Family Office",
    imageUrl: "",
  },
];

export function getMemberInitials(name: string): string {
  const tokens = name
    .replace(/[()]/g, " ")
    .split(/[\s,]+/)
    .map((token) => token.replace(/\./g, ""))
    .filter(
      (token) =>
        token.length > 0 &&
        !/^(OON|OFR|CFA|GOAL|MBA|FCS|MD|CEO)$/i.test(token)
    );

  if (tokens.length === 0) return "?";
  if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
  return (tokens[0][0] + tokens[tokens.length - 1][0]).toUpperCase();
}
