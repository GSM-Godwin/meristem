import type { LegalSection } from "@/lib/types/legal";

const introductionParagraph =
  "Meristem Securities Limited understands that your privacy is important and that you care about how your personal data is used and shared online. We respect the privacy of everyone who visits our website and uses our online services. We are committed to respecting, securing, and protecting your personal data. We are also committed to being transparent about what we collect from you and how we use it. This privacy policy covers information practices, including how we use, share and secure the personal information you provide and your legal rights.";

const aboutTheseTermsParagraph =
  "We are also committed to being transparent about what we collect from you and how we use it. This privacy policy covers information practices, including how we use, share and secure the personal information you provide and your legal rights.";

const yourRightsIntro =
  "Under the Nigerian Data Protection Regulation (NDPR), you have several rights about your personal data. This policy has been designed to uphold your rights where we act as a data processor:";

const yourRightsList = [
  "Right of access: you have the right to request a copy of the information that we hold about you.",
  "Right of rectification: you have a right to correct data that we hold about you that is inaccurate or incomplete.",
  "Right to be forgotten: in certain circumstances you can ask for the data we hold about to be erased from our record.",
  "Right to restriction of processing: where certain conditions apply to have a right to restrict the processing.",
  "Right of portability: you have the right to have the data we hold about you transferred to another organization.",
  "Right to object: you have the right to object to certain types of processing such as direct marketing.",
  "Right to object to automated processing, including profiling: you also have the right not to be subject to automated processing or profiling.",
  "Right to judicial review: if we refuse your request under rights of access, we will provide you with a reason to why. You have the right to complain as detailed below.",
];

const yourRightToComplainParagraphs = [
  "If you wish to make a complaint about how your personal data is being processed or how your complaint has been handled, you have the right to lodge a complaint directly to our in-house data officer or with the supervisory authority.",
  "If we are unable to help, or you are not satisfied with our response, you also have the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC). NDPC can be contacted:",
  "By post to: No. 5, Donau Crescent, Off Amazon Street, Maitama, Abuja, Nigeria. Telephone: +234 (0) 916 061 5551 Email Address: info@ndpc.gov.ng",
  "We would, however, appreciate the chance to deal with your concerns before you approach NDPC, so please contact us in the first instance.",
];

const securityParagraph =
  "As part of delivering optimum service to our customers, we take extra security measures to maintain your data in a secure and organised manner. Only authorised employees from our organization can access, alter, disclose and destroy personal data, when required. In addition, these employees only act within the scope of their authority and are trained to prevent any errors or omissions. We also carry out ongoing security monitoring exercises to ensure that our systems are updated and adopt appropriate industry data collection, storage, and processing practices. Physical security measures are in place to protect against unauthorized access, alteration, disclosure of personal information, username, password, transaction information and data stored in your user account. Access to your name and address is restricted to our employees who need to know such information in connection with delivering our services to you and are bound by legal confidential obligations. We reserve the right to change this privacy policy. All enquiries about this privacy policy should be directed to contact compliance@meristemng.com";

const governingLawParagraph =
  "This privacy policy is made pursuant to the Nigeria Data Protection Act, 2023 (or any subsequent amendments thereof) and other relevant Nigerian laws, regulations or international conventions applicable to Nigeria. Where any provision of this Policy is deemed inconsistent with a law, regulation or convention, such provision shall be subject to the overriding law, regulation or convention.";

export const privacyPolicySections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [introductionParagraph],
  },
  {
    id: "about-these-terms",
    title: "About these terms",
    paragraphs: [aboutTheseTermsParagraph],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    paragraphs: [yourRightsIntro],
    listItems: yourRightsList,
  },
  {
    id: "your-right-to-complain",
    title: "Your Right to Complain",
    paragraphs: yourRightToComplainParagraphs,
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [securityParagraph],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [introductionParagraph],
  },
  {
    id: "about-these-terms",
    title: "About These Terms",
    paragraphs: [aboutTheseTermsParagraph],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    paragraphs: [yourRightsIntro],
    listItems: yourRightsList,
    paragraphsAfter: [
      "Your right to complain.",
      ...yourRightToComplainParagraphs,
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [securityParagraph],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [governingLawParagraph],
  },
];
