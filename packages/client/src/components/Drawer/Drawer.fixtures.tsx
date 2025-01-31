import {
  Home,
  Journeys,
  Campaigns,
  Segments,
  Users,
  Settings,
  Messaging,
  People,
  Integrations,
} from "../Icons/Icons";

export default [
  { id: "home", imgIcon: Home(), text: "Home" },
  { id: "journeys", imgIcon: Journeys(), text: "Journeys" },
  { id: "campaigns", imgIcon: Campaigns(), text: "Campaigns" },
  { id: "alltemplates", imgIcon: Campaigns(), text: "Templates" },
  { id: "segments", imgIcon: Segments(), text: "Segments" },
  { id: "users", imgIcon: Users(), text: "Users" },
  // {
  //   id: "integrations",
  //   imgIcon: Integrations(),
  //   text: "Integrations",
  // },
  { id: "settings", imgIcon: Settings(), text: "Settings" },
  //{ id: "analysis", imgIcon: Analysis(), text: "Analysis" },
];

export const dataSubArray = [
  {
    id: "home",
    imgIcon: Home(),
    text: "Home",
    type: "menu",
    link: "/home",
  },
  {
    id: "messaging",
    imgIcon: Messaging(),
    text: "Messaging",
    type: "group",
    children: [
      {
        id: "journeys",
        imgIcon: Journeys(),
        text: "Journey Builder",
        type: "menu",
        link: "/flow",
      },
      {
        id: "campaigns",
        imgIcon: Campaigns(),
        text: "Template Builder",
        type: "menu",
        link: "/templates",
      },
      {
        id: "event-tracker",
        imgIcon: Campaigns(),
        text: "Event Tracker",
        type: "menu",
        link: "/event-tracker",
      },
    ],
  },
  {
    id: "audience",
    imgIcon: People(),
    text: "Audience",
    type: "group",
    children: [
      {
        id: "users",
        imgIcon: Users(),
        text: "People",
        type: "menu",
        link: "/people",
      },
      {
        id: "segments",
        imgIcon: Segments(),
        text: "Segments",
        type: "menu",
        link: "/segment",
      },
    ],
  },
  {
    id: "integrations",
    imgIcon: Integrations(),
    text: "Data",
    type: "group",
    children: [
      {
        id: "integrations",
        imgIcon: Integrations(),
        text: "Database import",
        type: "menu",
        link: "/integrations",
      },
      // {
      //   id: "analysis",
      //   imgIcon: Analysis(),
      //   text: "Analysis",
      //   type: "menu",
      //   link: "/analysis",
      // },
    ],
  },
  {
    id: "settings",
    imgIcon: Settings(),
    text: "Settings",
    type: "menu",
    link: "/settings",
  },
];
