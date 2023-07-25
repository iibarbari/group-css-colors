import calculateColorGroup from './groupColor';
import rgbToHex from './rgbToHex'
import hexToRgb from './hexToRgb';
import rgbToHsl from './rgbToHsl';

const colorPicker = document.getElementById("select-color")

colorPicker?.addEventListener("input", (e: Event) => {
    if (e.target instanceof Element) {
        const color = (<HTMLInputElement>e.target).value;
        const rgb = hexToRgb(color);

        if (rgb !== null) {
            // Set rgb value
            document.querySelectorAll("#color-values tbody tr#RGB td")[0].textContent = `rgb (${rgb.r} ${rgb.g} ${rgb.b})`;

            // Set hex value
            document.querySelectorAll("#color-values tbody tr#HEX td")[0].textContent = color;

            // Set hsl value
            document.querySelectorAll("#color-values tbody tr#HSL td")[0].textContent = `hsl(${rgbToHsl(rgb.r, rgb.g, rgb.b)})`;

            // Get calculated color group
            // calculateColorGroup([rgb.r, rgb.g, rgb.b])
            const { name, color: calculatedColor } = calculateColorGroup([rgb.r, rgb.g, rgb.b])

            // Set body background
            document.body.style.background = color;
            document.body.style.backgroundImage = `linear-gradient(90deg, ${color} 0%, ${color} 49%, ${name} 51%, ${name} 100%)`;

            // Set calculated rgb value
            document.querySelectorAll("#calculated-color tbody tr#RGB td")[0].textContent = `rgb (${calculatedColor[0]} ${calculatedColor[1]} ${calculatedColor[2]})`;

            // Set calculated hex value
            document.querySelectorAll("#calculated-color tbody tr#HEX td")[0].textContent = rgbToHex(calculatedColor[0], calculatedColor[1], calculatedColor[2]);

            // Set calculated hsl value
            document.querySelectorAll("#calculated-color tbody tr#HSL td")[0].textContent = `hsl(${rgbToHsl(calculatedColor[0], calculatedColor[1], calculatedColor[2])})`;

            // Set calculated name value
            document.querySelectorAll("#calculated-color tbody tr#NAME td")[0].textContent = name;
        }
    }
})
