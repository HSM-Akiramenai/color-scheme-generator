const colorPickerEl = document.getElementById('color-picker-input')
const getColorSchemeBtn = document.getElementById('get-colorScheme-btn')
const selectSchemeEl = document.getElementById('select-scheme-el')


document.addEventListener('click', (e) => {
    if(e.target.hasAttribute('data-color')){
        const color = e.target.getAttribute('data-color')
        navigator.clipboard.writeText(color)
            .then(() => {
                console.log(`Copied ${color} to clipboard!`);
                alert(`Copied ${color} to clipboard!`);
            })
    }
})

getColorSchemeBtn.addEventListener('click', () => {
    const loader = document.getElementById('loader')
    const overlay = document.getElementById('overlay')
    const color = colorPickerEl.value.replace(/^#/, '')
    const colorScheme = selectSchemeEl.value
    const count = 5
    
    overlay.classList.remove('hidden');
    loader.classList.remove('hidden');

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorScheme}&count=${count}`)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors.map(color => color.hex.value);
            overlay.classList.add('hidden');
            loader.classList.add('hidden');
            generateColorContainers(count);
            renderColors(colors);
        })
})

function generateColorContainers(count){
    let paletteHtmlString = ''
    let codesHtmlString = ''
    
    for(let i = 0; i < count; i++){
        paletteHtmlString += `<div></div>`
        codesHtmlString += `<div></div>`  
    }  
    
    document.getElementById('color-scheme-palette').innerHTML = paletteHtmlString
    document.getElementById('color-scheme-codes').innerHTML = codesHtmlString
}

function renderColors(colorsArray){
    const colorSwatches = document.querySelectorAll('#color-scheme-palette div')
    const colorCodes = document.querySelectorAll('#color-scheme-codes div')
     
    for(let i = 0; i < colorsArray.length; i++){
        const color = colorsArray[i]
        colorSwatches[i].style.backgroundColor = color
        colorSwatches[i].setAttribute('data-color', color);
        colorCodes[i].textContent = color
        colorCodes[i].setAttribute('data-color', color);
    }  
}