import { NextAdminOptions } from "@premieroctet/next-admin";
import { cookies } from "next/headers";

const { BACKEND_ADDRESS } = process.env;

export const options: NextAdminOptions = {
  title: "⚡️ Admin du Chœur du Bon Pays",
  model: {
    News: {
      toString: (news: { thumbnailDescription: string }) =>
        `${news.thumbnailDescription}`,
      title: "News",
      icon: "InformationCircleIcon",
      list: {
        display: [
          // "id",
          "newsDate",
          "thumbnailDescription",
        ],
        fields: {
          newsDate: {
            formatter: (value: string | Date | null) =>
              value ? new Date(value).toLocaleDateString("fr-FR") : "",
          },
        },
        search: ["newsDate", "thumbnailDescription"],
        defaultSort: {
          field: "newsDate",
          direction: "asc",
        },
        filters: [],
      },
      edit: {
        display: ["id", "newsDate", "thumbnailUrl", "thumbnailDescription"],
        fields: {
          thumbnailUrl: {
            format: "file",
            handler: {
              upload: async (buffer: Buffer, { name }: { name: string }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const formData = new FormData();
                const file = new File([buffer], name);
                formData.append("thumbnailFromFront", file);
                formData.append("token", userToken || "");

                const response = await fetch(
                  `${BACKEND_ADDRESS}/news/uploadThumbnail`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                const data = await response.json();
                if (data.result) {
                  return data.thumbnailUrl;
                }
                throw new Error("Upload news thumbnail to Cloudinary failed");
              },
              uploadErrorMessage: "Upload news thumbnail to Cloudinary failed",
            },
          },
        },
      },
      aliases: {
        eventDate: "Date",
        thumbnailUrl: "Affiche News",
        thumbnailDescription: "Description de l'affiche",
      },
      actions: [
        {
          type: "server",
          id: "delete all",
          icon: "TrashIcon",
          title: "Delete All",
          canExecute: () => true,
          action: async (ids: (string | number)[]) => {
            try {
              const cookieStore = cookies();
              const userToken = cookieStore.get("user_token")?.value;

              const body = JSON.stringify({
                token: userToken,
                ids: ids,
              });

              const response = await fetch(
                `${BACKEND_ADDRESS}/news/deleteAll`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: body,
                }
              );

              const data = await response.json();

              if (!data.result) {
                throw new Error(data.error);
              }
              return {
                type: "success",
                message: "Deleted All Successfully",
              };
            } catch (error: Error | any) {
              return {
                type: "error",
                message: `Failed to delete: ${error.message}`,
              };
            }
          },
          successMessage: "Deleted All Successfully",
          errorMessage: "Failed To Delete All",
        },
      ],
    },
    Work: {
      toString: (Work: { code: string; title: string }) =>
        `${Work.code} ${Work.title}`,
      title: "Chants Travaillés",
      icon: "BriefcaseIcon",
      list: {
        display: [
          // "id",
          "code",
          "title",
          "authorMusic",
          "isAtWork",
          "recordings",
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
          "partitionThumbnailUrl",
          "isAtWork",
          "recordings",
        ],
        fields: {
          partitionUrl: {
            format: "file",
            handler: {
              upload: async (buffer: Buffer, { name }: { name: string }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const formData = new FormData();
                const file = new File([buffer], name);
                formData.append("partitionFromFront", file);
                formData.append("token", userToken || "");

                const response = await fetch(
                  `${BACKEND_ADDRESS}/studiedWorks/uploadPartition`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                const data = await response.json();
                if (data.result) {
                  return data.partitionUrl;
                }
                throw new Error("Upload partition to Cloudinary failed");
              },
              uploadErrorMessage: "Upload partition to Cloudinary failed",
            },
          },
          partitionThumbnailUrl: {
            format: "file",
            handler: {
              upload: async (buffer: Buffer, { name }: { name: string }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const formData = new FormData();
                const file = new File([buffer], name);
                formData.append("partitionThumbnailFromFront", file);
                formData.append("token", userToken || "");

                const response = await fetch(
                  `${BACKEND_ADDRESS}/studiedWorks/uploadPartitionThumbnail`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                const data = await response.json();
                if (data.result) {
                  return data.partitionThumbnailUrl;
                }
                throw new Error(
                  "Upload partition thumbnail to Cloudinary failed"
                );
              },
              uploadErrorMessage:
                "Upload partition thumbnail to Cloudinary failed",
            },
          },
        },
      },
      aliases: {
        code: "Thème",
        title: "Titre",
        artwork: "Oeuvre",
        authorMusic: "Compositeur",
        partitionUrl: "Partition",
        partitionThumbnailUrl: "Affiche de la partition",
        recordings: "Enregistrements de travail",
        isAtWork: "En cours d'étude",
      },
      actions: [
        {
          type: "server",
          id: "delete all",
          icon: "TrashIcon",
          title: "Delete All",
          canExecute: () => true,
          action: async (ids: (string | number)[]) => {
            try {
              const cookieStore = cookies();
              const userToken = cookieStore.get("user_token")?.value;

              const body = JSON.stringify({
                token: userToken,
                ids: ids,
              });

              const response = await fetch(
                `${BACKEND_ADDRESS}/studiedWorks/deleteAllWorks`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: body,
                }
              );

              const data = await response.json();

              if (!data.result) {
                throw new Error(data.error);
              }
              return {
                type: "success",
                message: "Deleted All Successfully",
              };
            } catch (error: Error | any) {
              return {
                type: "error",
                message: `Failed to delete: ${error.message}`,
              };
            }
          },
          successMessage: "Deleted All Successfully",
          errorMessage: "Failed To Delete All",
        },
      ],
    },
    Recording: {
      toString: (Recording: { recordingDescription: string }) =>
        `${Recording.recordingDescription}`,
      title: "Enregistrements de Travail",
      icon: "MusicalNoteIcon",
      list: {
        display: [
          // "id",
          "recordingDescription",
          // "recordingUrl",
          "voiceType",
          "work",
        ],
        search: ["recordingDescription", "voiceType"],
        defaultSort: {
          field: "recordingDescription",
          direction: "asc",
        },
        filters: [
          {
            name: "Barytons",
            active: false,
            value: {
              voiceType: {
                equals: "BARYTON",
              },
            },
          },
          {
            name: "Basses",
            active: false,
            value: {
              voiceType: {
                equals: "BASS",
              },
            },
          },
          {
            name: "Ténors 1",
            active: false,
            value: {
              voiceType: {
                equals: "TENOR1",
              },
            },
          },
          {
            name: "Ténors 2",
            active: false,
            value: {
              voiceType: {
                equals: "TENOR2",
              },
            },
          },
          {
            name: "Tutti",
            active: false,
            value: {
              voiceType: {
                equals: "TUTTI",
              },
            },
          },
        ],
      },
      edit: {
        display: ["recordingDescription", "recordingUrl", "voiceType", "work"],
        fields: {
          recordingUrl: {
            format: "file",
            // handler: {
            //   upload: async (buffer: Buffer, { name }: { name: string }) => {
            //     const cookieStore = cookies();
            //     const userToken = cookieStore.get("user_token")?.value;

            //     const formData = new FormData();
            //     const file = new File([buffer], name);
            //     formData.append("recordingFromFront", file);
            //     formData.append("token", userToken || "");

            //     const response = await fetch(
            //       `${BACKEND_ADDRESS}/studiedWorks/uploadRecording`,
            //       {
            //         method: "POST",
            //         body: formData,
            //       }
            //     );

            //     const data = await response.json();
            //     if (data.result) {
            //       return data.recordingUrl;
            //     }
            //     throw new Error("Upload recording to Cloudinary failed");
            //   },
            //   uploadErrorMessage: "Upload recording to Cloudinary failed",
            // },
            handler: {
              upload: async (buffer: Buffer, { name }: { name: string }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const recordingFile = new File([buffer], name);

                try {
                  // Step 1: Get the signed URL and upload parameters
                  const signResponse = await fetch(
                    `${BACKEND_ADDRESS}/studiedWorks/uploadRecording`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ token: userToken }),
                    }
                  );
                  const signData = await signResponse.json();

                  if (!signData.result) {
                    throw new Error(signData.error);
                  }

                  // Step 2: Create form data for direct upload to Cloudinary
                  const formData = new FormData();
                  // Add parameters in the exact order they were signed
                  formData.append(
                    "eager_async",
                    signData.params.eager_async.toString()
                  );
                  formData.append("folder", signData.params.folder);
                  formData.append("public_id", signData.params.public_id);
                  formData.append(
                    "timestamp",
                    signData.params.timestamp.toString()
                  );
                  // Add the file and remaining parameters after the signed ones
                  formData.append("file", recordingFile);
                  formData.append(
                    "timeout",
                    signData.params.timeout.toString()
                  );
                  formData.append(
                    "chunk_size",
                    signData.params.chunk_size.toString()
                  );
                  formData.append("api_key", signData.params.api_key);
                  formData.append(
                    "resource_type",
                    signData.params.resource_type
                  );
                  formData.append("signature", signData.params.signature);

                  // Step 3: Upload directly to Cloudinary
                  const uploadResponse = await fetch(signData.uploadUrl, {
                    method: "POST",
                    body: formData,
                  });

                  if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(
                      errorData.error?.message || "Upload failed"
                    );
                  }

                  const uploadResult = await uploadResponse.json();

                  // Step 4: Notify backend of successful upload
                  const completeResponse = await fetch(
                    `${BACKEND_ADDRESS}/studiedWorks/uploadRecordingComplete`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        token: userToken,
                        recordingUrl: uploadResult.secure_url,
                      }),
                    }
                  );

                  const data = await completeResponse.json();
                  if (data.result) {
                    return data.recordingUrl;
                  }
                  throw new Error("Upload recording to Cloudinary failed");
                } catch (error) {
                  console.error("Upload error:", error);
                  throw error;
                }
              },
              uploadErrorMessage: "Upload recording to Cloudinary failed",
            },
          },
        },
      },
      aliases: {
        recordingUrl: "Fichier audio",
        recordingDescription: "Description du fichier audio",
        voiceType: "Voix",
        work: "Chant travaillé",
      },
      actions: [
        {
          type: "server",
          id: "delete all",
          icon: "TrashIcon",
          title: "Delete All",
          canExecute: () => true,
          action: async (ids: (string | number)[]) => {
            try {
              const cookieStore = cookies();
              const userToken = cookieStore.get("user_token")?.value;

              const body = JSON.stringify({
                token: userToken,
                ids: ids,
              });

              const response = await fetch(
                `${BACKEND_ADDRESS}/studiedWorks/deleteAllRecordings`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: body,
                }
              );

              const data = await response.json();

              if (!data.result) {
                throw new Error(data.error);
              }
              return {
                type: "success",
                message: "Deleted All Successfully",
              };
            } catch (error: Error | any) {
              return {
                type: "error",
                message: `Failed to delete: ${error.message}`,
              };
            }
          },
          successMessage: "Deleted All Successfully",
          errorMessage: "Failed To Delete All",
        },
      ],
    },
    contacts: {
      toString: (contacts: {
        firstname: string;
        lastname: string;
        email: string;
      }) => `${contacts.firstname} ${contacts.lastname} (${contacts.email})`,
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
            formatter: (value: string | Date | null) =>
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
      toString: (events: { thumbnailDescription: string }) =>
        `${events.thumbnailDescription}`,
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
            formatter: (value: string | Date | null) => {
              if (!value) {
                return "";
              }
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
              upload: async (buffer: Buffer, { name }: { name: string }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const formData = new FormData();
                const file = new File([buffer], name);
                formData.append("thumbnailFromFront", file);
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
                throw new Error("Upload event thumbnail to Cloudinary failed");
              },
              uploadErrorMessage: "Upload event thumbnail to Cloudinary failed",
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
      actions: [
        {
          type: "server",
          id: "delete all",
          icon: "TrashIcon",
          title: "Delete All",
          canExecute: () => true,
          action: async (ids: (string | number)[]) => {
            try {
              const cookieStore = cookies();
              const userToken = cookieStore.get("user_token")?.value;

              const body = JSON.stringify({
                token: userToken,
                ids: ids,
              });

              const response = await fetch(
                `${BACKEND_ADDRESS}/events/deleteAll`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: body,
                }
              );

              const data = await response.json();

              if (!data.result) {
                throw new Error(data.error);
              }
              return {
                type: "success",
                message: "Deleted All Successfully",
              };
            } catch (error: Error | any) {
              return {
                type: "error",
                message: `Failed to delete: ${error.message}`,
              };
            }
          },
          successMessage: "Deleted All Successfully",
          errorMessage: "Failed To Delete All",
        },
      ],
    },
    users: {
      toString: (users: { firstname: string; lastname: string }) =>
        `${users.firstname} ${users.lastname}`,
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
            formatter: (value: string | Date | null) =>
              value ? new Date(value).toLocaleDateString("fr-FR") : "",
          },
          birthDate: {
            formatter: (value: string | Date | null) =>
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
      toString: (listenings: { title: string; authorMusic?: string }) =>
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
            formatter: (value: string | Date | null) =>
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
              upload: async (buffer: Buffer, { name }: { name: string }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const audioFile = new File([buffer], name);

                try {
                  // Step 1: Get the signed URL and upload parameters
                  const signResponse = await fetch(
                    `${BACKEND_ADDRESS}/listenings/uploadListening`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ token: userToken }),
                    }
                  );
                  const signData = await signResponse.json();

                  console.log("signData: ", signData);

                  if (!signData.result) {
                    throw new Error(signData.error);
                  }

                  // Step 2: Create form data for direct upload to Cloudinary
                  const formData = new FormData();
                  // Add parameters in the exact order they were signed
                  formData.append(
                    "eager_async",
                    signData.params.eager_async.toString()
                  );
                  formData.append("folder", signData.params.folder);
                  formData.append("public_id", signData.params.public_id);
                  formData.append(
                    "timestamp",
                    signData.params.timestamp.toString()
                  );
                  // Add the file and remaining parameters after the signed ones
                  formData.append("file", audioFile);
                  formData.append(
                    "timeout",
                    signData.params.timeout.toString()
                  );
                  formData.append(
                    "chunk_size",
                    signData.params.chunk_size.toString()
                  );
                  formData.append("api_key", signData.params.api_key);
                  formData.append(
                    "resource_type",
                    signData.params.resource_type
                  );
                  formData.append("signature", signData.params.signature);

                  // Step 3: Upload directly to Cloudinary
                  const uploadResponse = await fetch(signData.uploadUrl, {
                    method: "POST",
                    body: formData,
                  });

                  if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(
                      errorData.error?.message || "Upload failed"
                    );
                  }

                  const uploadResult = await uploadResponse.json();

                  console.log("uploadResult: ", uploadResult);

                  // Step 4: Notify backend of successful upload
                  const completeResponse = await fetch(
                    `${BACKEND_ADDRESS}/listenings/uploadListeningComplete`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        token: userToken,
                        audioUrl: uploadResult.secure_url,
                      }),
                    }
                  );

                  const data = await completeResponse.json();
                  if (data.result) {
                    return data.audioUrl;
                  }
                  throw new Error("Upload audio to Cloudinary failed");
                } catch (error) {
                  console.error("Upload error:", error);
                  throw error;
                }
              },
              uploadErrorMessage: "Upload audio to Cloudinary failed",
            },
          },
          thumbnailUrl: {
            format: "file",
            handler: {
              upload: async (buffer: Buffer, { name }: { name: string }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const formData = new FormData();
                const file = new File([buffer], name);
                formData.append("thumbnailFromFront", file);
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
                throw new Error(
                  "Upload listening thumbnail to Cloudinary failed"
                );
              },
              uploadErrorMessage:
                "Upload listening thumbnail to Cloudinary failed",
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
      actions: [
        {
          type: "server",
          id: "delete all",
          icon: "TrashIcon",
          title: "Delete All",
          canExecute: () => true,
          action: async (ids: (string | number)[]) => {
            try {
              const cookieStore = cookies();
              const userToken = cookieStore.get("user_token")?.value;

              const body = JSON.stringify({
                token: userToken,
                ids: ids,
              });

              const response = await fetch(
                `${BACKEND_ADDRESS}/listenings/deleteAll`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: body,
                }
              );

              const data = await response.json();

              if (!data.result) {
                throw new Error(data.error);
              }
              return {
                type: "success",
                message: "Deleted All Successfully",
              };
            } catch (error: Error | any) {
              return {
                type: "error",
                message: `Failed to delete: ${error.message}`,
              };
            }
          },
          successMessage: "Deleted All Successfully",
          errorMessage: "Failed To Delete All",
        },
      ],
    },
    pressreviews: {
      toString: (pressreviews: { thumbnailDescription: string }) =>
        `${pressreviews.thumbnailDescription}`,
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
            formatter: (value: string | Date | null) =>
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
              upload: async (buffer: Buffer, { name }: { name: string }) => {
                const cookieStore = cookies();
                const userToken = cookieStore.get("user_token")?.value;

                const formData = new FormData();
                const file = new File([buffer], name);
                formData.append("thumbnailFromFront", file);
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
      actions: [
        {
          type: "server",
          id: "delete all",
          icon: "TrashIcon",
          title: "Delete All",
          canExecute: () => true,
          action: async (ids: (string | number)[]) => {
            try {
              const cookieStore = cookies();
              const userToken = cookieStore.get("user_token")?.value;

              const body = JSON.stringify({
                token: userToken,
                ids: ids,
              });

              const response = await fetch(
                `${BACKEND_ADDRESS}/pressReviews/deleteAll`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: body,
                }
              );

              const data = await response.json();

              if (!data.result) {
                throw new Error(data.error);
              }
              return {
                type: "success",
                message: "Deleted All Successfully",
              };
            } catch (error: Error | any) {
              return {
                type: "error",
                message: `Failed to delete: ${error.message}`,
              };
            }
          },
          successMessage: "Deleted All Successfully",
          errorMessage: "Failed To Delete All",
        },
      ],
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
