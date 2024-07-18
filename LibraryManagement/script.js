// Function for registartion
function register(event) {
    event.preventDefault()
    let fname = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm = document.getElementById('confirm').value;
  
    console.log(fname,email,password,confirm);

    if (!password || !email) {
        alert("All fields are required");
        return;
    }
    if (password.length < 8) {
        alert("Length of password must be eight charcater")
        return;
    }
    if (!/[!,@,#,$,%,^,&,*]/.test(password)) {
        alert("Password Contain atleast one symbol")
        return;
    }
    if (!/\d/.test(password)) {
        alert("Password Contain numeric character")
        return;
    }
    if (!/[A-Z]/.test(password)) {
        alert("Password Contain atleast one capital character")
        return;
    }
    let newData = JSON.parse(localStorage.getItem('newKey')) ? JSON.parse(localStorage.getItem('newKey')) : []

    if (newData.find((value) => {
        return value.email === email;
    })) {
        alert("User already Registered, please login")
        window.location.href = 'login.html'
        return;
    }
    else {
        let newObj = {
            "fname" : fname,
            "email": email,
            "password": password
        }
        newData.push(newObj)
        localStorage.setItem('newKey', JSON.stringify(newData))
        alert("Register Succesful")
        window.location.href = 'login.html'
    }
}

// Function for login
function login(event) {
    event.preventDefault()
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!password || !email) {
        alert("All fields are required");
        return;
    }

    let newData = JSON.parse(localStorage.getItem('newKey'));

    if (newData.find((value) => {
        return value.email === email && value.password === password
    })) {
        let findData = newData.filter((value) => {
            return value.email === email && value.password === password

        })[0]

        localStorage.setItem('email', findData.email);
        alert('login Successful')
        window.location.href = 'dashboard.html'

    }

    else if (newData.find((value) => {
        return value.email === email && value.password !== password
    })) {
        alert('Invalid password')
        return;
    }

    else if (newData.find((value) => {
        return value.email !== email
    })) {
        alert('User not found')
        window.location.href = 'register.html'
        return;
    }

}

// Function for login and register button
function logins() {
    window.location.href = 'login.html'
}
function registers() {
    window.location.href = 'register.html'
}

//Function for search button
function highlightSearch(event) {
    event.preventDefault()
    const searchTerm = document.getElementById('searchTerm').value.trim();

    const contentDiv = document.getElementById('content');
    const content = contentDiv.innerHTML;

    const cleanContent = content.replace(/<span class="highlight">(.*?)<\/span>/gi, '$1');

    if (searchTerm) {
        const highlightedContent = cleanContent.replace(new RegExp('(' + searchTerm + ')', 'gi'), '<span class="highlight">$1</span>');
        contentDiv.innerHTML = highlightedContent;
    } else {
        contentDiv.innerHTML = cleanContent;
    }
}

//Function to display the form to add books
function showBooksadd() {
    let firstForm = document.getElementById('bookForm');
    firstForm.style.display = 'block';
    let firstFor = document.getElementById('myTab');
    firstFor.style.display = 'none';
    let firstFo = document.getElementById('head1');
    firstFo.style.display = 'none';
    let edit = document.getElementById('updateForm');
    edit.style.display = 'none'
    let edits = document.getElementById('newDiv');
    edits.style.display = 'none'

}

//Function to add books
function addingBooks(event) {
    event.preventDefault()
    let bookName = document.getElementById('bookNames').value;
    let author = document.getElementById('authors').value;
    let date = document.getElementById('dates').value;

    if (!bookName || !author || !date) {
        alert("All fields are required");
        return;
    }
    let newData = JSON.parse(localStorage.getItem('newBook')) ? JSON.parse(localStorage.getItem('newBook')) : []

    let newObj = {
        "id": Date.now() + '-' + Math.floor(Math.random() * 1000),
        "bookName": bookName,
        "author": author,
        "date": date
    }
    newData.push(newObj)
    localStorage.setItem('newBook', JSON.stringify(newData))
    alert("Book added Succesful")
    document.getElementById("bookForm").reset();
    showTable()

}

//Function to display table
function showTable() {
    let firstForm = document.getElementById('myTab');
    firstForm.style.display = 'block';
    let firstFo = document.getElementById('head1');
    firstFo.style.display = 'block';
    let firstFor = document.getElementById('bookForm');
    firstFor.style.display = 'none';
    showToTable(event);

}

//Function to show books in table
function showToTable(event) {
    event.preventDefault()
    let data = JSON.parse(localStorage.getItem('newBook'));
    let showData = document.getElementById('myTabData');
    let printData = data.map((value, index) => {
        return `
    <tr>
    <td>${index + 1}</td>
    <td>${value.id}</td>
    <td> ${value.bookName} </td>
    <td> ${value.author} </td>
    <td> ${value.date} </td>
    <td>
                <button onclick="openForm('${value.id}')">Edit</button>
                <button onclick="deleteRow('${value.id}')">Delete</button>
            </td>
    </tr>
    `
    })
    showData.innerHTML = printData.join('')
}

//Function to delet the data/book
function deleteRow(id) {
    let data = JSON.parse(localStorage.getItem('newBook'));

    let myId = data.findIndex((item) => {
        return item.id === id;
    })

    data.splice(myId, 1)
    localStorage.setItem('newBook', JSON.stringify(data))
    showToTable(event)
}

//Function to edit data/book
function openForm(id) {
    let data = JSON.parse(localStorage.getItem('newBook'));

    let findData = data.find((value) => {
        return value.id == id
    })

    if (findData) {
        document.getElementById('id').value = findData.id;
        document.getElementById('bookName').value = findData.bookName;
        document.getElementById('author').value = findData.author;
        document.getElementById('date').value = findData.date;
        document.getElementById('id').disabled = true;
    }
    let edit = document.getElementById('updateForm');
    edit.style.display = 'block'
    let firstForm = document.getElementById('myTab');
    firstForm.style.display = 'none';
    let firstFo = document.getElementById('head1');
    firstFo.style.display = 'none';
}

//Function to close form
function closeForm(id) {
    let edit = document.getElementById('updateForm');
    edit.style.display = 'none';
    showTable();
}

//Function to update data/book
function updateData(event) {
    event.preventDefault();
    let id = document.getElementById('id').value;
    let bookName = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let date = document.getElementById('date').value;
    let data = JSON.parse(localStorage.getItem('newBook'));

    let myId = data.findIndex((item) => {
        return item.id === id;
    });

    if (myId !== -1) {
        data[myId] = { id, bookName, author, date };
        localStorage.setItem('newBook', JSON.stringify(data));
        alert("Book updated successfully");
        closeForm();
    }
}