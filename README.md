# Transformer Architecture Explained

An interactive web application that explains the Transformer architecture with clear visuals and engaging elements. This website offers a step-by-step learning journey from sequence-to-sequence modeling fundamentals to advanced concepts, incorporating interactive demonstrations that showcase the Transformer's capabilities.

## Live Demo

Visit the live website: [Transformer Architecture Explained](https://yourusername.github.io/transformer_website/)

## Features

- Step-by-step explanation of the Transformer architecture
- Interactive visualizations of attention mechanisms
- Self-attention and multi-head attention demonstrations
- Mathematical formulas with clear explanations
- Interactive transformer demo with text generation
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/transformer_website.git
cd transformer_website
```

2. Install the dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

Then, you can start the production server:

```bash
npm run start
```

## Deployment to GitHub Pages

This project is configured to be easily deployed to GitHub Pages:

1. Update the `homepage` field in `package.json` with your GitHub username:
   ```json
   "homepage": "https://yourusername.github.io/transformer_website"
   ```

2. Also update the `metadataBase` URL in `src/app/layout.tsx`:
   ```typescript
   metadataBase: new URL('https://yourusername.github.io/transformer_website')
   ```

3. Deploy the site:
   ```bash
   npm run deploy
   ```

Alternatively, just push to the main branch and the GitHub Actions workflow will automatically deploy the site.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [D3.js](https://d3js.org/) - Data visualization library
- [KaTeX](https://katex.org/) - Math typesetting library

## Expanding the Project

Here are some ideas to enhance the project:

1. Add more interactive examples of transformer applications
2. Implement a real transformer model API integration
3. Add more detailed visualizations of the encoder and decoder
4. Create interactive code examples to demonstrate implementation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- "Attention Is All You Need" paper by Vaswani et al.
- The many researchers and engineers who have expanded on transformer architectures
