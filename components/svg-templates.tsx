import type { KitCustomization } from "./jersey-customizer"

function extractCls2Path(svg: string): string | null {
  const match = svg.match(/<path[^>]*class="cls-2"[^>]*d="([^"]+)"/)
  return match ? match[1] : null
}


const FRONT_SVG_BASE = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_5" data-name="Layer 5" viewBox="0 0 1000 1000">
  <defs>
    <style>
      .cls-1 {
        fill: #d9ad37;
      }
      .cls-2 {
        fill: #fff;
      }
      .cls-3 {
        fill: #344c96;
      }
      .cls-4, .cls-5 {
        fill: none;
        stroke: #132255;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
      .cls-5 {
        stroke-dasharray: 0 0 3 3;
      }
    </style>
  </defs>
  <path class="cls-2" d="m664.19,193.35l-55.11-12.38v63.72c0,57.25-46.41,103.66-103.66,103.66h0c-57.25,0-103.66-46.41-103.66-103.66v-66.15s-65.95,14.81-65.95,14.81c22.48,325.1-119.39,310.64-119.39,310.64v307.44s187.36,13.61,285.22,13.61,281.95-13.61,281.95-13.61v-307.44s-141.87,14.46-119.39-310.64Z"/>
  <path class="cls-1" d="m593.48,175.07l.02,66.19c0,48.57-39.51,88.08-88.08,88.08s-88.08-39.51-88.08-88.08l.04-66.19h-8.93v66.19c0,53.56,43.42,96.98,96.98,96.98h0c53.56,0,96.98-43.42,96.98-96.98v-66.19h-8.92Z"/>
  <path class="cls-2" d="m423.62,174.97v67.1c0,43.99,35.66,79.66,79.66,79.66h4.28c43.99,0,79.66-35.66,79.66-79.66v-67.1c0,22-40.9,45.87-81.8,45.87-40.9,0-81.8-23.87-81.8-45.87Z"/>
  <g>
    <path class="cls-4" d="m216.42,791.41s.5.09,1.48.25"/>
    <path class="cls-5" d="m220.84,792.13c36.39,5.78,291.53,43.31,559.76,5.61"/>
    <path class="cls-4" d="m782.1,797.53c.49-.07.99-.14,1.49-.21"/>
  </g>
  <g>
    <path class="cls-4" d="m216.42,779.95s.5.09,1.48.25"/>
    <path class="cls-5" d="m220.84,780.67c36.39,5.78,291.53,43.31,559.76,5.61"/>
    <path class="cls-4" d="m782.1,786.07c.49-.07.99-.14,1.49-.21"/>
  </g>
  <path class="cls-3" d="m616.39,182.59v65.18c0,61.24-49.82,111.06-111.06,111.06s-111.06-49.82-111.06-111.06v-67.53l-3.84.84v66.7c0,63.36,51.54,114.9,114.9,114.9s114.9-51.54,114.9-114.9v-64.29l-3.84-.89Z"/>
</svg>`

const BACK_SVG_BASE = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_5" data-name="Layer 5" viewBox="0 0 1000 1000">
  <defs>
    <style>
      .cls-1 {
        fill: #d9ad37;
      }
      .cls-2 {
        fill: #fff;
      }
      .cls-3 {
        fill: #344c96;
      }
      .cls-4, .cls-5 {
        fill: none;
        stroke: #132255;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
      .cls-5 {
        stroke-dasharray: 0 0 3 3;
      }
    </style>
  </defs>
  <path class="cls-2" d="m664.19,191.36l-55.11-12.38-4.13-.05c-23.4,32.7-61.67,54.03-104.95,54.03h0c-43.61,0-82.14-21.66-105.49-54.78l-58.7,13.18c22.48,325.1-119.39,310.64-119.39,310.64v307.44s187.36,13.61,285.22,13.61,281.95-13.61,281.95-13.61v-307.44s-141.87,14.46-119.39-310.64Z"/>
  <path class="cls-1" d="m599.87,177.38c-20.86,32.83-58.17,56.06-99.87,56.06s-79.52-23.66-100.38-56.49l-11.89,2.77c22.06,39.49,63.83,65.24,112.27,65.24h0c48.44,0,90.11-25.8,112.17-65.28l-12.3-2.3Z"/>
  <path class="cls-3" d="m619.16,181.25c-22.2,40.87-68.5,72.72-119.16,72.72s-96.95-31.85-119.16-72.72l-7.38,1.66c22.8,45.18,71.4,78.55,126.53,78.55h0c55.14,0,103.84-33.35,126.64-78.52l-7.48-1.68Z"/>
  <g>
    <path class="cls-4" d="m216.42,789.43s.5.09,1.47.25"/>
    <path class="cls-5" d="m220.84,790.15c36.39,5.78,291.53,43.31,559.76,5.61"/>
    <path class="cls-4" d="m782.1,795.55c.49-.07.99-.14,1.49-.21"/>
  </g>
  <g>
    <path class="cls-4" d="m216.42,777.96s.5.09,1.47.25"/>
    <path class="cls-5" d="m220.84,778.69c36.39,5.78,291.53,43.31,559.76,5.61"/>
    <path class="cls-4" d="m782.1,784.08c.49-.07.99-.14,1.49-.21"/>
  </g>
</svg>`

export function generateJerseySVG(kit: KitCustomization, view: "front" | "back"): string {
  let baseSvg = view === "front" ? FRONT_SVG_BASE : BACK_SVG_BASE

  // Replace jersey colors
  baseSvg = baseSvg
    .replace(/\.cls-1\s*\{[^}]*fill:\s*[^;]+;/g, `.cls-1 { fill: ${kit.secondaryColor};`)
    .replace(/\.cls-2\s*\{[^}]*fill:\s*[^;]+;/g, `.cls-2 { fill: ${kit.primaryColor};`)
    .replace(/\.cls-3\s*\{[^}]*fill:\s*[^;]+;/g, `.cls-3 { fill: ${kit.accentColor};`)

  let svg = baseSvg
  const closeTag = "</svg>"

  // Extract cls-2 shape path automatically
  const cls2Path = extractCls2Path(baseSvg)

  if (cls2Path && kit.materialImage) {
    const clipId = `materialClip-${view}-${Date.now()}`

    // Insert clipPath inside <defs>
    const defsPos = svg.indexOf("</defs>")
    const clipDef = `
      <clipPath id="${clipId}">
        <path d="${cls2Path}" />
      </clipPath>
    `
    svg = svg.slice(0, defsPos) + clipDef + svg.slice(defsPos)

    // Add clipped image inside jersey
    const materialImage = `
      <g clip-path="url(#${clipId})" opacity="0.3">
        <image 
          href="${kit.materialImage}"
          x="0" y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    `
    svg = svg.replace(closeTag, `${materialImage}${closeTag}`)
  }

  // Front text (Name + Number)
  if (view === "front") {
    const frontText = `
      <g font-family="${kit.fontFamily}" text-anchor="middle">
        <text x="500" y="470" font-size="40" fill="${kit.accentColor}" font-weight="${kit.fontWeight}">
          ${kit.name}
        </text>

        <text x="500" y="650" font-size="${kit.numberSize}" fill="${kit.accentColor}" 
          font-weight="bold" stroke="${kit.secondaryColor}" stroke-width="3">
          ${kit.number.toString().padStart(2, "0")}
        </text>
      </g>
    `
    svg = svg.replace(closeTag, `${frontText}${closeTag}`)
  }

  // Back text
  if (view === "back" && kit.companyName) {
    const backText = `
      <g font-family="${kit.fontFamily}" text-anchor="middle">
        <text x="500" y="295" font-size="24" fill="${kit.accentColor}" 
          font-style="italic" font-weight="${kit.fontWeight}">
          ${kit.companyName}
        </text>

        <text x="500" y="650" font-size="270px" fill="${kit.accentColor}" 
          font-weight="bold" stroke="${kit.secondaryColor}" stroke-width="3">
          ${kit.number.toString().padStart(2, "0")}
        </text>
      </g>
    `
    svg = svg.replace(closeTag, `${backText}${closeTag}`)
  }

  return svg
}
