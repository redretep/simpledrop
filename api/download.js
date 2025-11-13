import fs from "fs";
import path from "path";

export default async (req, res) => {
  const { id } = req.query;
  const filePath = path.join("/tmp", id);
  if (!fs.existsSync(filePath)) return res.status(404).send("Not found");

  res.setHeader("Content-Disposition", `attachment; filename="${id.split("_").slice(1).join("_")}"`);
  fs.createReadStream(filePath).pipe(res);
};
