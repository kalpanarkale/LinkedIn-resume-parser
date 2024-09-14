const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Endpoint for PDF file upload and OpenAI processing
app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    const pdfText = data.text;

    const openaiApiKey = req.body.apiKey;
    const configuration = new Configuration({ apiKey: openaiApiKey });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert the following resume text into an HTML resume format:\n\n${pdfText}`,
      max_tokens: 1000
    });

    const htmlResume = response.data.choices[0].text;
    res.json({ html: htmlResume });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the PDF.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
