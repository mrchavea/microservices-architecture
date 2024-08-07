export const ChatJsonSchema = {
  $async: true,
  type: "object",
  additionalProperties: false,
  properties: {
    id: {
      type: "string",
      format: "objectId",
    },
    slug: {
      type: "string",
      minLength: 2,
      maxLength: 50,
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
      errorMessage: {
        required: "Date of Birth is Required Property",
        pattern: "Correct format of Date Of Birth is dd-mmm-yyyy",
        format: "INCORRECT FORMAT"
      },
    },
    users: {
      type: "array",
      items: {
        type:"object"
      }
    },
    messages: {
      type: "array",
      items: {
        type:"object"
      }
    }
  },
  errorMessage: {
    properties: {
      name: "Name is invalid",
      slug: "Slug is invalid",
      users: "Users is invalid",
      messages: "Messages is invalid",
    }
  },
  required: ["name", "users", "messages", "slug"]
};