import { compose } from "@cofe/api";
import { post } from "@cofe/io";
import { withApiAuth } from "@/api/withApiAuth";
import { withApiCatch } from "@/api/withApiCatch";

export default compose([withApiCatch(), withApiAuth()], async (req, res) => {
  if (req.method === "POST") {
    const page = await post(
      `${process.env.DB_URL}/api/apps/${req.query.id as string}/pages`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      }
    );

    res.status(201).json(page);
  } else {
    res.status(405).end();
  }
});
