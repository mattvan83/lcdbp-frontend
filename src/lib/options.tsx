import { NextAdminOptions } from "@premieroctet/next-admin";

export const options: NextAdminOptions = {
  title: "⚡️ Admin du Chœur du Bon Pays",
  model: {
    studiedworks: {
      title: "Chants Travaillés",
      icon: "BriefcaseIcon",
    },
    contacts: {
      title: "Contacts",
      icon: "InboxArrowDownIcon",
    },
    events: {
      title: "Evènements",
      icon: "CalendarDaysIcon",
    },
    users: {
      toString: (users) => `${users.firstname} ${users.lastname}`,
      title: "Membres",
      icon: "UserIcon",
      list: {
        display: [
          "id",
          "firstname",
          "lastname",
          "email",
          "voice",
          "incomingDate",
          "birthDate",
          "postalCode",
          "city",
        ],
        search: ["firstname", "lastname"],
        defaultSort: {
          field: "lastname",
          direction: "asc",
        },
        filters: [
          {
            name: "Basses",
            active: false,
            value: {
              voice: {
                equals: "B1",
              },
            },
          },
          {
            name: "Barytons",
            active: false,
            value: {
              voice: {
                equals: "B2",
              },
            },
          },
          {
            name: "Ténors 1",
            active: false,
            value: {
              voice: {
                equals: "T1",
              },
            },
          },
          {
            name: "Ténors 2",
            active: false,
            value: {
              voice: {
                equals: "T2",
              },
            },
          },
        ],
        exports: [
          {
            format: "csv",
            url: "/api/users/export?format=csv",
          },
          {
            format: "json",
            url: "/api/users/export?format=json",
          },
        ],
      },
      edit: {
        display: [
          "id",
          "firstname",
          "lastname",
          "email",
          "voice",
          "incomingDate",
          "birthDate",
          "address",
          "postalCode",
          "city",
          "phone",
          "mobile",
          "type",
        ],
        fields: {
          voice: {
            format: "textarea",
          },
        },
      },
    },
    listenings: {
      title: "Prestations",
      icon: "MusicalNoteIcon",
    },
    pressreviews: {
      title: "Revues de Presse",
      icon: "NewspaperIcon",
    },
  },
  // pages: {
  //   "/": {
  //     title: "Page d'accueil",
  //     icon: "HomeIcon",
  //   },
  // },
  externalLinks: [
    {
      label: "Page d'accueil du site",
      url: "/",
    },
  ],
  sidebar: {
    groups: [],
    // [
    //   {
    //     title: "Chants Travaillés",
    //     className: "bg-green-600 p-2 rounded-md",
    //     models: ["studiedworks"],
    //   },
    //   {
    //     title: "Contacts",
    //     className: "bg-green-600 p-2 rounded-md",
    //     models: ["contacts"],
    //   },
    //   {
    //     title: "Evènements",
    //     className: "bg-green-600 p-2 rounded-md",
    //     models: ["events"],
    //   },
    //   {
    //     title: "Membres",
    //     className: "bg-green-600 p-2 rounded-md",
    //     models: ["users"],
    //   },
    //   {
    //     title: "Prestations",
    //     className: "bg-green-600 p-2 rounded-md",
    //     models: ["listenings"],
    //   },
    //   {
    //     title: "Revues de Presse",
    //     className: "bg-green-600 p-2 rounded-md",
    //     models: ["pressreviews"],
    //   },
    // ],
  },
};
