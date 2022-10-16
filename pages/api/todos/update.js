import sendQuery from "../../../utils/send-query";

const TOGGLE_COMPLETED = `
  mutation($id: ID!, $text: String!, $link: String! $completed: Boolean!) {
    updateTodo(id: $id, data: { text: $text, link: $link,  completed: $completed }) {
      _id
      completed
    }
  }
`;

export default async function handler(req, res) {
  const { id, text, link, completed } = req.body;
  const { data, errors } = await sendQuery(TOGGLE_COMPLETED, {
    id,
    text,
    link,
    completed,
  });

  if (req.method === "POST") {
    if (errors) {
      res.status(500).json(errors);
      return;
    }

    res.status(200).json({ updatedTodo: data.updateTodo });
  }
}
