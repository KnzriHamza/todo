import {
    IconBulb,
    IconHome,
    IconHeart,
    IconUser,
    IconCube,
    IconBuildingEstate,
    IconBasket,
    IconBolt,
    IconChevronsDown,
    IconChevronDown,
    IconMinus,
    IconChevronUp,
    IconChevronsUp,
} from "@tabler/icons-react";

export const colors = [
    "black",
    "white",
    "blue",
    "azure",
    "purple",
    "pink",
    "red",
    "orange",
    "yellow",
    "green",
    "lime",
];
export const icons = {
    personal: IconUser,
    home: IconHome,
    favorite: IconHeart,
    ideas: IconBulb,
    cube: IconCube,
    work: IconBuildingEstate,
    shopping: IconBasket,
    bolt: IconBolt,
};
export const priorities = {
    lowest: { icon: IconChevronsDown, color: "muted" },
    low: { icon: IconChevronDown, color: "green" },
    medium: { icon: IconMinus, color: "blue" },
    high: { icon: IconChevronUp, color: "yellow" },
    highest: { icon: IconChevronsUp, color: "red" },
};
