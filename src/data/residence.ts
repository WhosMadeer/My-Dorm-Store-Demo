export const dormList = ["chestnut", "campusOne", "parkside"] as const;

export type dorm = (typeof dormList)[number];

export const dormSelectList: { key: dorm; label: string }[] = [
    {
        key: "campusOne",
        label: "Campus One",
    },
    {
        key: "chestnut",
        label: "Chestnut Residence",
    },
    {
        key: "parkside",
        label: "Parkside Residence",
    },
];
