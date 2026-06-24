export interface BoardMember {
  name: string;
  position: string;
  imageUrl: string;
}

export const boardOfDirectors: BoardMember[] = [
  {
    name: "Amina Maina",
    position: "Chairman",
    imageUrl: "/amina.jpeg",
  },
  {
    name: "Ohis Ohiwerei",
    position: "Director",
    imageUrl: "/Ohis.jpeg",
  },
  {
    name: "Sulaiman Adedokun, CFA",
    position: "Group Managing Director",
    imageUrl: "/Sulaiman.jpeg",
  },
  {
    name: "Kemi Ojenike",
    position: "Managing Director",
    imageUrl: "/kemi.jpeg",
  },
];

export const executiveManagement: BoardMember[] = [
  {
    name: "",
    position: "",
    imageUrl: "",
  },
  {
    name: "",
    position: "",
    imageUrl: "",
  },
  {
    name: "",
    position: "",
    imageUrl: "",
  },
  {
    name: "",
    position: "",
    imageUrl: "",
  },
  {
    name: "",
    position: "",
    imageUrl: "",
  },
  {
    name: "",
    position: "",
    imageUrl: "",
  },
  {
    name: "",
    position: "",
    imageUrl: "",
  },
  {
    name: "",
    position: "",
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
