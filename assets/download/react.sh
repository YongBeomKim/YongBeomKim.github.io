TITLE="\n\n >>> react.js, TailwindCSS with Typescript"
echo ${TITLE}"\n ::"
yarn create vite frontend --template react-ts && cd frontend

# yarn add --dev @types/react @types/react-dom
yarn add --dev react@18.3.0 react-dom@18.3.0
yarn add --dev @types/react@18.3.0 @types/react-dom@18.3.0
yarn add --dev @types/node
yarn add --dev tailwindcss @tailwindcss/vite

yarn install
yarn add --dev react-icons react-router-dom @types/react-router-dom
yarn add --dev axios react-cookie react-helmet-async
yarn add --dev postcss autoprefixer styled-components @types/styled-components


# https://ui.shadcn.com/docs/installation/vite
TITLE="\n\n >>> shadcn/UI settings in vite.js"
echo ${TITLE}"\n ::"

# `./src/index.css` add headline
{ echo '@import "tailwindcss";'; cat ./src/index.css; } > tmpfile && mv tmpfile ./src/index.css

# Edit `tsconfig.json` file
echo '{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}' > tsconfig.json

# Edit `tsconfig.app.json` file
echo '{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,

    /* ui.shadcn.com */
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": ["src"]
}' > tsconfig.app.json

# Edit `vite.config.ts` file
echo 'import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})' > vite.config.ts


# https://ui.shadcn.com/docs/installation/vite
TITLE="\n\n >>> shadcn/UI init"
echo ${TITLE}"\n ::"
npx shadcn@latest init