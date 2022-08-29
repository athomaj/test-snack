module.exports = ({ env }) => ({
  'import-export-entries': {
    enabled: true,
  },
  email: {
    config: {
      provider: "strapi-provider-email-mailjet",
      providerOptions: {
        publicApiKey: "9fed056abe96ba5acbe698761b277589",
        secretApiKey: "31b601311c1eae1a1b053778c0b12f5a",
      },
      settings: {
        defaultFrom: "atelier@laplateforme.io",
        defaultFromName: "Scott from iJS.to",
        defaultTo: "jsluciani2b@gmail.com",
        defaultToName: "Johnny Bravodoe",
      },
    },
  },upload: {
    config: {
      provider: "strapi-provider-upload-minio-ce",
      providerOptions: {
        accessKey: "DUtA8gb8YAatJVLb2Vuq",
        secretKey: "gqMsVKeSbqflRQHQVbydo3e8Cr4nGpzUSzZe8JYz",
        bucket: "bucket1",
        endPoint: "minio.new-atelier.athomas.io",
        port: "443",
        useSSL:  "true",
        host: "minio.new-atelier.athomas.io",
        folder: "cms",
      },
    },
  },
});