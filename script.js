let titleList = new Array();

const changeImage = (mode) => {
    let img = document.querySelector(".toggleMode");
    if (mode == "dark") {
        img.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25"
        height="25" fill="white" class="bi bi-moon-fill" viewBox="0 0 16 16">
        <path
            d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
    </svg>`;
    } else
        img.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-sun-fill" viewBox="0 0 16 16">
        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
      </svg>`;
}

const onLaodChangeMode = () => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
        document.querySelector("html").setAttribute("data-bs-theme", "dark");
        changeImage("dark");
    } else {
        document.querySelector("html").removeAttribute("data-bs-theme", "dark");
        changeImage("light");
    }

    loadNotes();

}

const loadNotes = () => {
    let cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    // let length = len ? len : localStorage
    if (localStorage.length == 0) {
        cardContainer.innerHTML = `<h1 class="display-6">Press "+" button at bottom right corner to add you first note!</h1>`;
    }
    for (i = localStorage.length - 1; i >= 0; i--) {
        let card = document.createElement("div");
        let cardHeader = document.createElement("div");
        let cardBody = document.createElement("div");
        let cardText = document.createElement("p");
        let buttonsContainer = document.createElement("div")
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
        let title = localStorage.key(i);
        let desc = localStorage.getItem(title);

        // Main Card container settings 
        card.classList.add("card", "m-3");


        // cardHeader settings
        cardHeader.classList.add("card-header", "h5", "noteTitle");

        // cardBody settings
        cardBody.classList.add("card-body");

        // cardText settings
        cardText.classList.add("card-text", "noteDescription");

        // buttonsContainer settings
        buttonsContainer.classList.add("d-flex", "justify-content-end")

        // editBtn settings
        editBtn.classList.add("btn", "btn-primary", "m-2");
        editBtn.setAttribute("onclick", "editNote(" + i + ")");
        editBtn.setAttribute("data-bs-toggle", "modal")
        editBtn.setAttribute("data-bs-target", "#exampleModal")
        editBtn.setAttribute("data-bs-whatever", "@mdo")
        editBtn.innerHTML = "Edit"

        // Delete Button
        deleteBtn.classList.add("btn", "btn-primary", "m-2");
        deleteBtn.setAttribute("onclick", "deleteNote('" + title + "')");
        deleteBtn.innerText = "Delete";


        cardHeader.innerText = title.toString();
        cardText.innerText = desc.toString();

        // Appending all the elements to each other

        buttonsContainer.append(editBtn);
        buttonsContainer.append(deleteBtn);
        cardBody.append(cardText);
        card.append(cardHeader);
        card.append(cardBody);
        card.append(buttonsContainer);
        cardContainer.append(card);

        titleList.push(title);
    }

}

const changeMode = () => {
    if (document.querySelector("html").toggleAttribute("data-bs-theme")) {
        document.querySelector("html").setAttribute("data-bs-theme", "dark");
        changeImage("dark");
    }
    else {
        document.querySelector("html").removeAttribute("data-bs-theme", "dark");
        changeImage("light");
    }
}

window.addEventListener("onload", onLaodChangeMode());

const saveNote = () => {
    let title = document.getElementById("recipient-name");
    let desc = document.getElementById("message-text");
    localStorage.setItem(title.value, desc.value);
    title.value = "";
    desc.value = "";
    loadNotes();
}
const clearModal = () => {
    document.getElementById("recipient-name").value = "";
    document.getElementById("message-text").value = "";
    document.getElementById("recipient-name").disabled = false;
}
const editNote = (i) => {
    let title = document.querySelectorAll(".noteTitle")[localStorage.length - 1 - i];
    let desc = document.querySelectorAll(".noteDescription")[localStorage.length - 1 - i];
    document.getElementById("recipient-name").value = title.innerText;
    document.getElementById("message-text").value = desc.innerText;
    document.getElementById("recipient-name").disabled = true;
}

const deleteNote = (title) => {
    let check = confirm("Are you sure ? ");
    if (check) {
        localStorage.removeItem(title);
        loadNotes();
    }
}
const loadSearch = (list) => {

    let cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    // let length = len ? len : localStorage

    console.log("loadSearch called");
    for (i = list.length - 1; i >= 0; i--) {
        let card = document.createElement("div");
        let cardHeader = document.createElement("div");
        let cardBody = document.createElement("div");
        let cardText = document.createElement("p");
        let buttonsContainer = document.createElement("div")
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
        // let title = localStorage.key(i);
        let desc = localStorage.getItem(list[i]);


        // Main Card container settings 
        card.classList.add("card", "m-3");


        // cardHeader settings
        cardHeader.classList.add("card-header", "h5", "noteTitle");

        // cardBody settings
        cardBody.classList.add("card-body");

        // cardText settings
        cardText.classList.add("card-text", "noteDescription");

        // buttonsContainer settings
        buttonsContainer.classList.add("d-flex", "justify-content-end")

        // editBtn settings
        editBtn.classList.add("btn", "btn-primary", "m-2");
        editBtn.setAttribute("onclick", "editNote(" + i + ")");
        editBtn.setAttribute("data-bs-toggle", "modal")
        editBtn.setAttribute("data-bs-target", "#exampleModal")
        editBtn.setAttribute("data-bs-whatever", "@mdo")
        editBtn.innerHTML = "Edit"

        // Delete Button
        deleteBtn.classList.add("btn", "btn-primary", "m-2");
        deleteBtn.setAttribute("onclick", "deleteNote(" + list[i] + ")");
        deleteBtn.innerText = "Delete";


        cardHeader.innerText = list[i].toString();
        cardText.innerText = desc.toString();

        // Appending all the elements to each other

        buttonsContainer.append(editBtn);
        buttonsContainer.append(deleteBtn);
        cardBody.append(cardText);
        card.append(cardHeader);
        card.append(cardBody);
        card.append(buttonsContainer);
        cardContainer.append(card);
    }

}

const find = () => {
    // if (document.getElementById("search").value === "") {
    //     console.log("eampty");
    //     loadNotes();
    // } else {
    let title = document.getElementById("search").value;
    let list = titleList.filter((ele) => {
        return ele.toLowerCase().includes(title.toLowerCase());
    })
    console.log("list");
    loadSearch(list);
    // }
}