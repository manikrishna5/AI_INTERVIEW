// import axios from "axios";
// import pdfParse from "pdf-parse/lib/pdf-parse.js";

import { createRequire } from "module";

const require =
  createRequire(import.meta.url);

const pdf =
  require("pdf-parse");

const extractPdfText =
  async (buffer) => {
    const data =
      await pdf(buffer);

    return data.text;
  };

export default extractPdfText;