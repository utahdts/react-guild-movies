// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      id: 1,
      title: "GraphQL is Amazing",
      description: "Ben tells us why GraphQL is amazing",
      authors: ["Ben Meibos"],
      date: "2018-03-01",
      tags: ["graphql"],
    },
    {
      id: 2,
      title: "UGRC is Amazing",
      description: "Steve tells us why UGRC is amazing",
      authors: ["Steve Gourley"],
      date: "2018-03-01",
      tags: ["ugrc"],
    },
    {
      id: 3,
      title: "Immer makes your life easier",
      description: "Ben tells us why Immer allows you to use pop()",
      authors: ["Ben Meibos"],
      date: "2018-03-01",
      tags: ["immer", "immutable"],
    },
    {
      id: 4,
      title: "Code splitting",
      description: "Joseph owes us a talk on code-splitting",
      authors: ["Joseph Sharp"],
      date: "2018-03-01",
      tags: ["webpack", "callbacks"],
    },
  ]);
}
