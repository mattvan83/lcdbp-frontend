import { NextAdminOptions } from "@premieroctet/next-admin";
import { cookies } from "next/headers";

const { BACKEND_ADDRESS } = process.env;

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
      toString: (events) => `${events.thumbnailDescription}`,
      title: "Evènements",
      icon: "CalendarDaysIcon",
      list: {
        display: [
          // "id",
          "eventDate",
          "title",
          "place",
          "postalCode",
          "city",
          "price",
        ],
        fields: {
          eventDate: {
            formatter: (value) => {
              const inputDate = new Date(value);
              const options: Intl.DateTimeFormatOptions = {
                // weekday: "long", // full weekday name
                day: "numeric", // day of the month
                month: "numeric", // full month name
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              };
              return inputDate
                .toLocaleString("fr-FR", options)
                .replace(":", "h")
                .toUpperCase();
            },
          },
        },
        search: ["eventDate", "title"],
        defaultSort: {
          field: "eventDate",
          direction: "desc",
        },
        filters: [],
      },
      edit: {
        display: [
          "id",
          "eventDate",
          "title",
          "thumbnailUrl",
          "thumbnailDescription",
          "chores",
          "place",
          "postalCode",
          "city",
          "price",
        ],
        fields: {
          thumbnailUrl: {
            format: "file",
            handler: {
              upload: async (buffer, { name }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const formData = new FormData();
                const file = new File([buffer], name);
                formData.append("thumbnailFromFront", file);
                formData.append(
                  "imageExtension",
                  name.substring(name.lastIndexOf("."))
                );
                formData.append("token", userToken || "");

                const response = await fetch(
                  `${BACKEND_ADDRESS}/events/uploadThumbnail`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                const data = await response.json();
                if (data.result) {
                  return data.thumbnailUrl;
                }
                throw new Error("Upload to Cloudinary failed");
              },
              uploadErrorMessage: "Upload to Cloudinary failed",
            },
          },
        },
      },
      aliases: {
        eventDate: "Date",
        title: "Titre",
        thumbnailUrl: "Affiche",
        thumbnailDescription: "Description de l'affiche",
        chores: "Choeurs participants",
        place: "Lieu",
        postalCode: "Code postal",
        city: "Ville",
        price: "Prix",
      },
    },
    users: {
      toString: (users) => `${users.firstname} ${users.lastname}`,
      title: "Membres",
      icon: "UserIcon",
      list: {
        display: [
          // "id",
          "firstname",
          "lastname",
          "email",
          "voice",
          "incomingDate",
          "birthDate",
          "postalCode",
          "city",
        ],
        fields: {
          incomingDate: {
            formatter: (value) =>
              value ? new Date(value).toLocaleDateString("fr-FR") : "",
          },
          birthDate: {
            formatter: (value) =>
              value ? new Date(value).toLocaleDateString("fr-FR") : "",
          },
        },
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
        // fields: {
        //   voice: {
        //     format: "textarea",
        //   },
        // },
      },
      aliases: {
        firstname: "Prénom",
        lastname: "Nom",
        email: "Mail",
        voice: "Voix",
        incomingDate: "Date d'entrée",
        birthDate: "Anniversaire",
        address: "Adresse",
        postalCode: "Code postal",
        city: "Ville",
        phone: "Téléphone",
        mobile: "Portable",
        type: "Rôle",
      },
    },
    listenings: {
      title: "Prestations",
      icon: "MusicalNoteIcon",
    },
    pressreviews: {
      toString: (pressreviews) => `${pressreviews.thumbnailDescription}`,
      title: "Revues de Presse",
      icon: "NewspaperIcon",
      list: {
        display: [
          // "id",
          "pressReviewDate",
          "title",
          "journal",
          "city",
        ],
        fields: {
          pressReviewDate: {
            formatter: (value) =>
              value ? new Date(value).toLocaleDateString("fr-FR") : "",
          },
        },
        search: ["pressReviewDate", "title"],
        defaultSort: {
          field: "pressReviewDate",
          direction: "desc",
        },
        filters: [],
      },
      edit: {
        display: [
          "id",
          "pressReviewDate",
          "title",
          "journal",
          "thumbnailUrl",
          "thumbnailDescription",
          "city",
          "lastPressReview",
        ],
        fields: {
          thumbnailUrl: {
            format: "file",
            handler: {
              upload: async (buffer, { name }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const formData = new FormData();
                const file = new File([buffer], name);
                formData.append("thumbnailFromFront", file);
                formData.append(
                  "imageExtension",
                  name.substring(name.lastIndexOf("."))
                );
                formData.append("token", userToken || "");

                const response = await fetch(
                  `${BACKEND_ADDRESS}/pressReviews/uploadThumbnail`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                const data = await response.json();
                if (data.result) {
                  return data.thumbnailUrl;
                }
                throw new Error("Upload to Cloudinary failed");
              },
              uploadErrorMessage: "Upload to Cloudinary failed",
            },
          },
        },
      },
      aliases: {
        pressReviewDate: "Date",
        title: "Titre",
        thumbnailUrl: "Coupure de presse",
        thumbnailDescription: "Description de la coupure de presse",
        city: "Ville",
        lastPressReview: "Coupure de presse récente",
      },
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
