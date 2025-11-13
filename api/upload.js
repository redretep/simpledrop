import formidable from "formidable";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

export default async (req, res) => {
  const form = formidable({ multiples: false, uploadDir: "/tmp", keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload failed" });

    const file = files.file[0];
    const fileId = Date.now().toString();
    const newPath = `/tmp/${fileId}_${file.originalFilename}`;
    fs.renameSync(file.filepath, newPath);

    // return a link to download API
    const url = `${req.headers.origin}/api/download?id=${fileId}_${encodeURIComponent(file.originalFilename)}`;
    res.status(200).json({ url });
  });
};
