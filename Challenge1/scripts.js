import { TABLES, COLUMNS, state,createUniqueId,createOrderData,updateDragging} from './data.js'
import { createOrderHtml,html,updateDraggingHtml,moveToColumn } from './view.js'
/*
 @param {Event} event 
 */
const handleDragOver = (event) => {
    event.preventDefault();
    const path = event.path || event.composedPath()
    let column = null

    for (const element of path) {
        const { area } = element.dataset
        if (area) {
            column = area
            break;
        }
    }

    if (!column) return
    updateDragging({ over: column })
    updateDraggingHtml({ over: column })
}



const dragEnter=(event)=>{
     event.preventDefault()
}



const handleHelpToggle = (event) => {
   html.help.overlay.showModal()
   html.help.cancel.addEventListener('click', ()=>{
    html.help.overlay.close()
   })
}

const handleAddToggle = (event) => {
    html.add.overlay.showModal()
    html.add.cancel.addEventListener('click',()=>{
        html.add.overlay.close()
    })
}
const handleAddSubmit = (event) => {
     event.preventDefault()
 let title =html.add.title.value
let table =html.add.table.value   

   const order ={
          id:createUniqueId(),
        title, 
         table,
        created:new Date()
   }
 
   
 
  html.other.grid.children[0].appendChild(createOrderHtml(order) )
  html.add.overlay.close()
  html.add.title.value=''
 

}
const handleEditToggle = (event) => {
      event.preventDefault()
    if (event.target.tagName!=='DIV')return
      html.edit.overlay.showModal()
    
      html.edit.cancel.addEventListener('click',()=>{
        html.edit.overlay.close()
      })
} 
console.log(html.area)
const handleEditSubmit = (event) => {
  event.preventDefault()

   const div  = document.querySelector('.order')
  const newColumn =html.edit.column.value
  
  
  const itemName=div.children[0]
    const table=div.children[1].children[0].children[1]
  
    table.innerHTML=html.edit.table.value
    itemName.innerHTML=html.edit.title.value
    
   moveToColumn(div.dataset.id,newColumn)
    
     html.edit.overlay.close()
}

html.other.add.focus()
html.add.cancel.addEventListener('click', handleAddToggle)
html.other.add.addEventListener('click', handleAddToggle)
html.add.form.addEventListener('submit', handleAddSubmit)

html.other.grid.addEventListener('click', handleEditToggle)
html.edit.cancel.addEventListener('click', handleEditToggle)
html.edit.form.addEventListener('submit', handleEditSubmit)
html.edit.delete.addEventListener('click',  (event) => {
    const div = document.querySelector('.order')
    const newColumn=html.edit.column.value
    document.body.children[5].children[1]
    const deleteOrder =document.body.children[5].children[0]
    deleteOrder.removeChild(deleteOrder.children[2])
     html.edit.overlay.close()
 })

html.help.cancel.addEventListener('click', handleHelpToggle)
html.other.help.addEventListener('click', handleHelpToggle)

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', (event) => {
        setTimeout(()=>{htmlColumn.style.display='none'},0)
        })
    htmlColumn.addEventListener('dragend',  (event) => {
        let draggedItem= htmlColumn
       setTimeout(()=>{
           draggedItem.style.display='block'
           draggedItem.style.color=''
           draggedItem=null
   },0)
   })


for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
    htmlArea.addEventListener('dragenter', dragEnter)
    htmlArea.addEventListener('drop', ()=>{
        htmlArea.append(htmlColumn)
       
    })
}
}