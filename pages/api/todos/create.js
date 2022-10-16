import sendQuery from "../../../utils/send-query";

const CREATE_TODO = `
  mutation($text: String!, $link: String!) {
    createTodo(data: {text: $text, link: $link, completed: false }) {
      _id
      text
      link
      completed
    }
  }
`;

export default async function handler(req, res) {
  const { text, link } = req.body;
  const { data, errors } = await sendQuery(CREATE_TODO, { text, link });

  if (req.method === "POST") {
    if (errors) {
      res.status(500).json(errors);
      return;
    }

    res.status(200).json({ newTodo: data.createTodo });
  }
}
