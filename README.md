# simoneromano.github.io

Personal portfolio for Simone Romano: cybersecurity engineering, security research, digital forensics, applied AI, and secure systems.

The site is deliberately dependency-free. It uses semantic HTML, custom CSS, and a small amount of vanilla JavaScript, and is deployed as static assets on Cloudflare Workers.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Structure

- `index.html` - portfolio homepage
- `case-studies/` - long-form project write-ups
- `styles.css` - design system and responsive layouts
- `script.js` - navigation and reveal behavior
- `wrangler.jsonc` - Cloudflare Workers deployment configuration

[Visit the portfolio](https://sromano-digital-portfolio.simoneromano221.workers.dev/)
