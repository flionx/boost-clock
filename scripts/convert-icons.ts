import fs from "fs";
import path from "path";

const iconsDir = path.resolve("src/shared/assets/icons");
const outputDir = path.resolve("src/shared/ui/icons");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(iconsDir).filter(f => f.endsWith(".svg"));

const toCamelCase = (attr: string) =>
  attr.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

// 🔹 Убираем fill, stroke, color и приводим атрибуты к JSX-формату
function sanitizeSvg(svg: string) {
  return (
    svg
      .replace(/<\?xml.*?\?>/g, "")
      .replace(/<!DOCTYPE.*?>/g, "")
      // удаляем fill / stroke / color
      .replace(/\s*(fill|stroke|color)="[^"]*"/g, "")
      // превращаем stroke-width → strokeWidth
      .replace(/([a-zA-Z0-9]+-[a-zA-Z0-9]+)=/g, match => {
        const attr = match.slice(0, -1);
        return `${toCamelCase(attr)}=`;
      })
      // убираем сам <svg> wrapper
      .replace(/<svg[^>]*>/, "")
      .replace(/<\/svg>/, "")
      .trim()
  );
}

function extractViewBox(svg: string): string {
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  if (viewBoxMatch) return viewBoxMatch[1];

  const widthMatch = svg.match(/width="([^"]+)"/);
  const heightMatch = svg.match(/height="([^"]+)"/);

  if (widthMatch && heightMatch) {
    const w = parseFloat(widthMatch[1]);
    const h = parseFloat(heightMatch[1]);
    if (!isNaN(w) && !isNaN(h)) return `0 0 ${w} ${h}`;
  }

  return "0 0 24 24";
}

let exportsContent = "";
let convertedCount = 0;

for (const file of files) {
  const svg = fs.readFileSync(path.join(iconsDir, file), "utf-8");
  const inner = sanitizeSvg(svg);
  const viewBox = extractViewBox(svg);

  const componentName =
    file
      .replace(/\.svg$/, "")
      .replace(/(^\w|-\w)/g, c => c.replace("-", "").toUpperCase()) + "Icon";

  const componentCode = `import React from "react";

export const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="${viewBox}"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    ${inner}
  </svg>
);
`;

  fs.writeFileSync(path.join(outputDir, `${componentName}.tsx`), componentCode);
  exportsContent += `export * from "./${componentName}";\n`;
  convertedCount++;
}

fs.writeFileSync(path.join(outputDir, "index.ts"), exportsContent);

console.log(`✅ Successfully converted ${convertedCount} SVG icons!`);
