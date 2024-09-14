# LinkedIn PDF to HTML Resume Converter

## Objective
This application allows users to upload a LinkedIn PDF resume and generate an HTML format using the OpenAI API.

## Features
- Upload LinkedIn PDF
- Input OpenAI API key
- Converts the resume into an HTML file using AI

## Tech Stack
- **Backend**: Node.js, Express, OpenAI API
- **Frontend**: React.js
- **Deployment**: Vercel

## How to Use
1. Input your OpenAI API key.
2. Upload the PDF downloaded from LinkedIn.
3. Click "Generate HTML Resume".
4. View the generated resume in HTML format.

## Approach
- **PDF Parsing**: Used `pdf-parse` to extract text from the PDF.
- **OpenAI API**: The extracted text was sent to OpenAI's GPT model to format it into HTML.
- **Deployment**: Deployed on Vercel for easy access.

## How to Run Locally
1. Clone the repository.
2. Install dependencies

Screenshot -
![image](https://github.com/user-attachments/assets/9a44a12e-a0b5-4172-8784-302c0901fbf3)
