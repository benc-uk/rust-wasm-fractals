const dialogDiv = document.createElement('div')
dialogDiv.id = 'customGrad'
dialogDiv.classList.add('shown', 'dialog')
document.body.appendChild(dialogDiv)

let colors = []
dialogDiv.innerHTML = `
<div style="background-color:blue; width:300px" id="grad">C</div>
`

showDialog('#ff0000,#00ff00,#0000ff')

function showDialog(colorList) {
  colorList.split(',').forEach((color) => {
    addColour(color)
  })
  dialogDiv.classList.replace('hidden', 'shown')
}

function addColour(color) {
  // const div = document.createElement('div')
  // div.classList.add('color')
  // div.innerHTML = `<input type='color' value='${color}'><button style="font-size:0.5rem">❌</button>`
  // dialogDiv.prepend(div)
  // document.getElementById('grad').style.background = `linear-gradient(to right, ${colorList()})`
  // //background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 58%, rgba(0,212,255,1) 100%);
}
