let todoname = document.querySelector('#todoname');
let tododescrip = document.querySelector('#tododescrip');
let myform = document.querySelector('#myform');
let lists = document.querySelector('#lists')
let donelists = document.querySelector('#donelists')
myform.addEventListener('submit', onsubmit);

function onsubmit(e) {
    e.preventDefault();
    const obj = {
        TODONAME: todoname.value,
        TODODESCRIP: tododescrip.value
    };
    axios.post('https://crudcrud.com/api/59169557ccd44a4b836e4c546b98b273/AppoinmentBooking', obj)
        .then(response => {
            showvalue(response.data);

        })
        .catch(err => console.log(err))
        todoname.value="";
        tododescrip.value="";
}

function showvalue(storedData) {

    const li = document.createElement('li');
    const liText = document.createTextNode(`TODO Name : ${storedData.TODONAME} Description : ${storedData.TODODESCRIP} `);
    li.appendChild(liText);
    lists.appendChild(li);

    //delete button created
    const dltbtn = document.createElement('button');
    dltbtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(dltbtn);

    dltbtn.onclick = () => {

        //console.log(storedData._id)
        deleteUser(storedData._id);
        lists.removeChild(li);
       
    }
    //done functionality
    const donebtn = document.createElement('button');
    donebtn.appendChild(document.createTextNode("Done"));
    li.appendChild(donebtn);

    donebtn.onclick = () => {
        //console.log(storedData._id)
        doneclick(storedData._id);
        lists.removeChild(li);
    }

}
function deleteUser(ID) {
    axios.delete(`https://crudcrud.com/api/59169557ccd44a4b836e4c546b98b273/AppoinmentBooking/${ID}`)
        .then(res => {
            alert('Delete Success')

        })
        .catch(err => console.log(err))
}

function doneclick(ID) {
    axios.get(`https://crudcrud.com/api/59169557ccd44a4b836e4c546b98b273/AppoinmentBooking/${ID}`)
        .then(res => {
            //console.log(res.data)
            const li = document.createElement('li');
            const liText = document.createTextNode(`TODO Name : ${res.data.TODONAME} Description : ${res.data.TODODESCRIP} `);
            li.appendChild(liText);
            donelists.appendChild(li);


            //delete Button created
            const dltbtn = document.createElement('button');
            dltbtn.appendChild(document.createTextNode("Delete"));
            li.appendChild(dltbtn);
            dltbtn.onclick = () => {

                //console.log(storedData._id)
                deleteUser(res.data._id);
                donelists.removeChild(li);
               
            }

            



        })
        .catch(err => console.log(err))
}