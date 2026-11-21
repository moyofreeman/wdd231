const getString = window.location.search;
console.log(getString);

const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

const myInfoLesson = new URLSearchParams(getString);
console.log(myInfoLesson)

console.log(myInfoLesson.get('first'));

document.getElementById('results').innerHTML = `
<p>Appointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Appointment will be done on ${myInfo.get('date')}<p/>
<p>The appointment location is ${myInfo.get('location')}</p>`