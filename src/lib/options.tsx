import { NextAdminOptions } from "@premieroctet/next-admin";
import { cookies } from "next/headers";

const { BACKEND_ADDRESS } = process.env;

export const options: NextAdminOptions = {
  title: "⚡️ Admin du Chœur du Bon Pays",
  model: {
    Work: {
      toString: (Work) => `${Work.code} ${Work.title}`,
      title: "Chants Travaillés",
      icon: "BriefcaseIcon",
      list: {
        display: [
          // "id",
          "code",
          "title",
          "authorMusic",
          "isAtWork",
          // "recordings",
        ],
        fields: {},
        search: ["code", "title", "authorMusic"],
        defaultSort: {
          field: "code",
          direction: "asc",
        },
        filters: [
          {
            name: "Profanes",
            active: false,
            value: {
              code: {
                startsWith: "A",
              },
            },
          },
          {
            name: "Religieux",
            active: false,
            value: {
              code: {
                startsWith: "B",
              },
            },
          },
          {
            name: "Classique",
            active: false,
            value: {
              code: {
                startsWith: "C",
              },
            },
          },
          {
            name: "Traditionnel",
            active: false,
            value: {
              code: {
                startsWith: "D",
              },
            },
          },
          {
            name: "Noël",
            active: false,
            value: {
              code: {
                startsWith: "E",
              },
            },
          },
        ],
        exports: [],
      },
      edit: {
        display: [
          "id",
          "code",
          "title",
          "artwork",
          "authorMusic",
          "partitionUrl",
          // "partitionThumbnailUrl",
          "isAtWork",
          "recordings",
        ],
        fields: {
          partitionUrl: {
            format: "file",
          },
        },
      },
      aliases: {
        code: "Thème",
        title: "Titre",
        artwork: "Oeuvre",
        authorMusic: "Compositeur",
        partitionUrl: "Partition",
        workRecordings: "Enregistrements de travail",
        isAtWork: "En cours d'étude",
      },
    },
    contacts: {
      toString: (contacts) =>
        `${contacts.firstname} ${contacts.lastname} (${contacts.email})`,
      title: "Contacts",
      icon: "InboxArrowDownIcon",
      list: {
        display: [
          // "id",
          "createdAt",
          "firstname",
          "lastname",
          "email",
          "phone",
          "message",
        ],
        fields: {
          createdAt: {
            formatter: (value) =>
              value ? new Date(value).toLocaleDateString("fr-FR") : "",
          },
        },
        search: ["firstname", "lastname", "email"],
        defaultSort: {
          field: "createdAt",
          direction: "desc",
        },
        filters: [],
      },
      edit: {
        display: [
          "id",
          "createdAt",
          "firstname",
          "lastname",
          "email",
          "phone",
          "message",
          "ownCopy",
        ],
        fields: {
          message: {
            format: "textarea",
          },
        },
      },
      aliases: {
        createdAt: "Date de réception",
        firstname: "Prénom",
        lastname: "Nom",
        email: "Mail",
        phone: "Téléphone",
        message: "Message",
        ownCopy: "Copie personnelle",
      },
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
            name: "Barytons",
            active: false,
            value: {
              voice: {
                equals: "B1",
              },
            },
          },
          {
            name: "Basses",
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
      toString: (listenings) =>
        listenings.authorMusic
          ? `${listenings.title} (${listenings.authorMusic})`
          : `${listenings.title}`,
      title: "Prestations",
      icon: "MusicalNoteIcon",
      list: {
        display: [
          // "id",
          "recordingDate",
          "title",
          "authorMusic",
        ],
        fields: {
          recordingDate: {
            formatter: (value) =>
              value ? new Date(value).toLocaleDateString("fr-FR") : "",
          },
        },
        search: ["recordingDate", "title", "authorMusic"],
        defaultSort: {
          field: "recordingDate",
          direction: "desc",
        },
        filters: [],
      },
      edit: {
        display: [
          "id",
          "recordingDate",
          "title",
          "artwork",
          "audioUrl",
          "authorText",
          "authorMusic",
          "arrangement",
          "harmonization",
          "thumbnailUrl",
          "thumbnailDescription",
          "lastListening",
        ],
        fields: {
          audioUrl: {
            format: "file",
            handler: {
              upload: async (buffer, { name }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const formData = new FormData();
                const file = new File([buffer], name);
                formData.append("listeningFromFront", file);
                formData.append(
                  "listeningExtension",
                  name.substring(name.lastIndexOf("."))
                );
                formData.append("token", userToken || "");

                const response = await fetch(
                  `${BACKEND_ADDRESS}/listenings/uploadListening`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                const data = await response.json();
                if (data.result) {
                  return data.audioUrl;
                }
                throw new Error("Upload audio to Cloudinary failed");
              },
              uploadErrorMessage: "Upload audio to Cloudinary failed",
            },
          },
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
                  `${BACKEND_ADDRESS}/listenings/uploadThumbnail`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                const data = await response.json();
                if (data.result) {
                  return data.thumbnailUrl;
                }
                throw new Error("Upload thumbnail to Cloudinary failed");
              },
              uploadErrorMessage: "Upload thumbnail to Cloudinary failed",
            },
          },
        },
      },
      aliases: {
        recordingDate: "Date d'enregistrement",
        title: "Titre",
        artwork: "Oeuvre",
        audioUrl: "Enregistrement",
        authorText: "Parolier",
        authorMusic: "Compositeur",
        arrangement: "Arrangement",
        harmonization: "Harmonisation",
        thumbnailUrl: "Image associée",
        thumbnailDescription: "Description de l'image associée",
        lastListening: "Enregistrement récent",
      },
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
