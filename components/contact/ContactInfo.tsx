function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M18.333 14.075v2.575a1.667 1.667 0 01-1.815 1.666 16.482 16.482 0 01-7.193-2.562 16.25 16.25 0 01-5-5A16.482 16.482 0 011.815 3.46 1.667 1.667 0 013.48 1.667h2.575a1.667 1.667 0 011.667 1.434c.095.7.247 1.387.452 2.057a1.667 1.667 0 01-.375 1.758l-1.09 1.09a13.333 13.333 0 005 5l1.09-1.09a1.667 1.667 0 011.758-.375c.67.205 1.357.357 2.057.452a1.667 1.667 0 011.434 1.667z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3.333 5.833h13.334c.92 0 1.666.746 1.666 1.667v8.333c0 .92-.746 1.667-1.666 1.667H3.333c-.92 0-1.666-.746-1.666-1.667V7.5c0-.92.746-1.667 1.666-1.667z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.333 7.5L10 12.083 1.667 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M16.667 8.333c0 4.583-6.667 10-6.667 10S3.333 12.917 3.333 8.333a6.667 6.667 0 1113.334 0z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.833a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const contactItems = [
  {
    icon: PhoneIcon,
    label: "Phone Number",
    value: "+234808 832 7952",
    href: "tel:08088327952",
  },
  {
    icon: MailIcon,
    label: "Email",
    value: "familyoffice@meristemng.com",
    href: "mailto:familyoffice@meristemng.com",
  },
  {
    icon: MapPinIcon,
    label: "Head Office",
    value: "20A, Gerrard Road, Ikoyi, Lagos, Nigeria.",
  },
  // {
  //   icon: MapPinIcon,
  //   label: "Address",
  //   value:
  //     "1 Opobo Crescent, Opposite Aladumo Schools, GRA Junction, Port Harcourt, Rivers State, Nigeria. (07080647497)",
  // },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-[30px] font-semibold text-[#181D27] leading-9.5 mb-4">
          Every family&apos;s journey is different.
        </h2>
        <p className="text-base text-[#535862] leading-7">
          Whether you are exploring continuity for the first time or refining
          structures already in place, we welcome a thoughtful conversation
          about your family&apos;s needs.
        </p>
      </div>

      <div className="border border-[#E9EAEB] rounded-xl divide-y divide-[#E9EAEB]">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          const content = (
            <>
              <span className="shrink-0 w-10 h-10 rounded-full border border-[#E9EAEB] flex items-center justify-center text-[#535862]">
                <Icon />
              </span>
              <div>
                <p className="text-sm font-medium text-[#535862] mb-1">
                  {item.label}
                </p>
                <p className="text-base font-semibold text-[#181D27] leading-6">
                  {item.value}
                </p>
              </div>
            </>
          );

          return item.href ? (
            <a
              key={index}
              href={item.href}
              className="flex items-start gap-4 p-6 hover:bg-[#FAFAFA] transition-colors"
            >
              {content}
            </a>
          ) : (
            <div key={index} className="flex items-start gap-4 p-6">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
