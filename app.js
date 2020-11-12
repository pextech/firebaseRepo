

// const cafeList=document.querySelector('#cafe-list');
// const form =document.querySelector('#add-cafe-form');


// function getElements(element){


//     let li = document.createElement('li');
//     let name = document.createElement('span');
//     let city = document.createElement('span');
//     let cross = document.createElement('div');

//     li.setAttribute('data-id',element.id);
//     name.textContent= element.data().name;
//     city.textContent= element.data().city;
//     cross.textContent = 'x';
//     li.appendChild(name);
//     li.appendChild(city);
// li.appendChild(cross);
//     cafeList.appendChild(li);

//     cross.addEventListener('click', (e) =>{
//         e.stopPropagation();
//         let id = e.target.parentElement.getAttribute('data-id');
//         db.collection('cafes').doc(id).delete();
//     })

// }



// // db.collection('cafes').orderBy('name').get().then((snapshot)=>{

// // snapshot.docs.forEach(element => {
    
// //     getElements(element);

// // });

// // })

// form.addEventListener('submit', (e) =>{

//     e.preventDefault();

//     db.collection('cafes').add({
//         name:form.name.value,
//         city:form.city.value
//     });
// form.name.value="";
// form.city.value="";

// })


// db.collection('cafes').orderBy('name').onSnapshot((snapshot)=>{

//     let changes = snapshot.docChanges();

//     changes.forEach(change => {


//         if(change.type == 'added'){
//             getElements(change.doc);
//         }
//         else if(change.type == 'removed'){

//             let li=cafeList.querySelector('[data-id='+change.doc.id+']');
//             cafeList.removeChild(li);
//         }

        
//     });


// })

// // db.collection('cafes').doc('itSU5QF4xvFi7HKdik0R').update({
// //     name:'merry girl'
// // });

const form = document.querySelector('#add-cafe-form');
const cafeList = document.querySelector('#cafe-list');

db.collection('cafes').orderBy('name').onSnapshot(snapshot=>{

    let changes = snapshot.docChanges();

    changes.forEach(change => {
        
        if(change.type == 'added'){
            getElements(change.doc);
        }

        else if(change.type == 'removed' ){
            let li = cafeList.querySelector('[data-id='+ change.doc.id + ']');
            cafeList.removeChild(li);
        }

    });
    

})

function getElements(element){


    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');


    li.setAttribute('data-id',element.id);
    name.textContent = element.data().name;
    city.textContent = element.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);



cross.addEventListener('click',(e)=>{

    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('cafes').doc(id).delete();

})
    


   


}


 form.addEventListener('submit',(e)=>{

        e.preventDefault();

        db.collection('cafes').add({
            name: form.name.value,
            city: form.city.value
        });

    })
    
        form.name.value = ' ';
        form.city.value = ' ';