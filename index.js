import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

const firebaseConfig = {

    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")





const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")



function render(leads) { 
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
onValue(referenceInDB, (snapshot) => {
    const valueExist = snapshot.exists()
    if(valueExist) { 
    const snapshotValue = snapshot.val()
    const leads = Object.values(snapshotValue)
    render(leads) 
}
    
})

deleteBtn.addEventListener("click", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ''
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
    
})