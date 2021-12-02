let problemName=window.location.href.split('?')[1].split('=')[1];
problemName=problemName.replace(/%20/g, ' ');
document.getElementById('search-heading').innerHTML=`
Search Result for :- ${problemName}
`;
function goToSearchPage(){
    let name=document.getElementById('search-field').value;
    window.open(`/search/?id='${name}'`,'_blank')
}
function displayActivity(array){
    const div=document.querySelector('.list-group');
    div.innerHTML=`
    <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
    let html='';
    let clas;
    let notStarted=-0,pending=0,done=0,solving=0;
    array.forEach(item=>{
        
        if(item.status=='Not Started')
        {
            clas="bg-secondary"
            notStarted++;
        }
        else if(item.status=="Pending")
        {
            clas="bg-danger"
            pending++;
        }
        else if(item.status=="Done")
        {
            clas="bg-success"
            done++;
        }
        else{
            clas="bg-primary"
            solving++
        }
        clas+=" list-group-item list-group-item-action active"
        html+=`<a target="_blank" style="margin:10px 0px 10px 0px"  class='${clas}' aria-current="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${item.name}</h5>
          <small>${item.status}</small>
          <small>${item.time}</small>
          <small>${item.duration} mins</small>
          <svg style="cursor:pointer" onclick="deleteProblem('${item._id}')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
        </div>
        <p class="mb-1" onclick="window.location.href='${item.link}'">${item.link}</p>
        <small>${item.site}</small>
      </a>`
    })
    div.innerHTML=html;
}
fetchProblem();
async function fetchProblem(){
    const buffer=await fetch(`/search`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:problemName})
    })
    const ans=await buffer.json();
    displayActivity(ans);
    console.log(ans);
}