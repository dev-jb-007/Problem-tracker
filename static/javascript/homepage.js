function  today(){
    let date=new Date();
    let dhtml=date.getFullYear();
    if(date.getMonth()/100==0)
    {
        dhtml+="-0";
        dhtml+=(date.getMonth()+1);
    }
    else{
        dhtml+="-";
        dhtml+=(date.getMonth()+1);
    }
    if((parseInt)(date.getDate()/100)==0)
    {
        dhtml+="-0";
        dhtml+=(date.getDate());
    }
    else{
        dhtml+="-";
        dhtml+=(date.getDate());
    }
    document.getElementById('date-picker').value=dhtml;
    fetchProblem();
}
today();
async function SubmitProblem(){
    const problem=new Object;
    problem.name=document.getElementById('name').value;
    problem.site=document.getElementById('site').value;
    problem.link=document.getElementById('link').value;
    document.getElementById("add-product-div").innerHTML=`
    <div style="margin: auto;" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>`;
    let date=new Date();
    let dhtml=date.getFullYear();
    if(date.getMonth()/100==0)
    {
        dhtml+="-0";
        dhtml+=(date.getMonth()+1);
    }
    else{
        dhtml+="-";
        dhtml+=(date.getMonth()+1);
    }
    if((parseInt)(date.getDate()/100)==0)
    {
        dhtml+="-0";
        dhtml+=(date.getDate());
    }
    else{
        dhtml+="-";
        dhtml+=(date.getDate());
    }
    problem.date=dhtml;
    problem.time=date.getHours()+"-"+date.getMinutes();
    console.log(problem);
    const buffer=await fetch('/problem',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(problem)
    })
    const ans=await buffer.json();
    console.log(ans);
    document.getElementById("add-product-div").innerHTML=`
    <input class="form-control" type="text" placeholder="Name:" aria-label="default input example" id="name">
                <select class="form-select" aria-label="Default select example" id="site">
                    <option selected>Site:</option>
                    <option value="CodeForces">CodeForces</option>
                    <option value="CodeChef">CodeChef</option>
                    <option value="LeetCode">LeetCode</option>
                    <option value="CSES">CSES</option>
                    <option value="HackerRank">HackerRank</option>
                </select>
                <input class="form-control" type="text" placeholder="Link:" aria-label="default input example" id="link">
                <button type="button" class="btn btn-primary" onclick="SubmitProblem()">Add</button>`
    today();
    fetchProblem();
}

async function fetchProblem(){
    const date=document.getElementById('date-picker').value;
    console.log(date);
    const buffer=await fetch('/problems',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({date})
    })
    const ans=await buffer.json();
    displayActivity(ans);
    console.log(ans);
}
showTotalProgress();
async function showTotalProgress()
{
    const buffer=await fetch('/totalprogress');
    const obj=await buffer.json();
    console.log(obj,"Dev");
    let total=obj.pending+obj.notStarted+obj.done;
    let div=document.getElementById('total-progress');
    let html=`
    <h2 style="width: max-content;margin: auto;">Progress</h2>
      <div class="progress" style="background-color: white;margin:5px auto 5px auto;width: 50%;border:1px solid grey">
        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width:${(obj.done/total)*100}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Done(${obj.done})</div>
      </div>
      <div class="progress" style="background-color: white;margin:5px auto 5px auto;width: 50%;border:1px solid grey">
        <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" style="width:${(obj.notStarted/total)*100}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">Not Started(${obj.notStarted})</div>
      </div>
      <div class="progress" style="background-color: white;margin:5px auto 5px auto;width: 50%;border:1px solid grey">
        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width:${(obj.pending/total)*100}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Pending(${obj.pending})</div>
      </div>
    `
    div.innerHTML=html;
}
function showProgress(obj,total){
    let div=document.getElementById('Progress');
    let html=`
    <h2 style="width: max-content;margin: auto;">Progress</h2>
      <div class="progress" style="background-color: white;margin:5px auto 5px auto;width: 50%;border:1px solid grey">
        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width:${(obj.done/total)*100}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Done(${obj.done})</div>
      </div>
      <div class="progress" style="background-color: white;margin:5px auto 5px auto;width: 50%;border:1px solid grey">
        <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" style="width:${(obj.notStarted/total)*100}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">Not Started(${obj.notStarted})</div>
      </div>
      <div class="progress" style="background-color: white;margin:5px auto 5px auto;width: 50%;border:1px solid grey">
        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width:${(obj.pending/total)*100}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Pending(${obj.pending})</div>
      </div>
    `
    div.innerHTML=html;
}
function goToSearchPage(){
    let name=document.getElementById('search-field').value;
    console.log(name);
    window.open(`/search/?id=${name}`,'_blank')
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
        <p class="mb-1" onlick="window.location.href='${item.link}'">${item.link}</p>
        <small>${item.site}</small>
      </a>`
    })
    showProgress({done,notStarted,pending},done+pending+notStarted);
    div.innerHTML=html;
}
timerProblems();
async function timerProblems(){
    const div=document.getElementById('problem-timer-select');
    const buffer=await fetch('/timer');
    const ans=await buffer.json();
    let html='<option selected value="0">Select Problem:</option>',i=1;
    ans.forEach(item=>{
        html+=`<option value="${item.name}">${item.name}</option>`;
        i++;
    })
    div.innerHTML=html;
    console.log(ans);
}
async function deleteProblem(id)
{
    const buffer=await fetch('/deleteProblem',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id})
    })
    const ans=await buffer.json();
    today();
    fetchProblem();
    showTotalProgress();
}
let timeStarted=0;
let startedProblem;
async function timerStarted(){
    const div=document.getElementById('problem-timer-select').value;
    if(div=="0")
    {
        alert('Select A Problem');
    }
    else{
        console.log(div);
        startedProblem=div;
        document.getElementById("timer-collapse-btn").href="#";
        timeStarted=new Date().getTime();
        document.getElementById('stop').disabled=false;
        const buffer=await fetch('/timerStartChange',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:div})
        })
        today();
        fetchProblem();
        const ans=await buffer.json();
        console.log(ans);
    }
}
async function timerStopped(){
    const div=document.getElementById('problem-timer-select').value;
    if(div=="0"||div!=startedProblem)
    {
        alert('First Start A Problem');
    }
    else{
        let temp=new Date().getTime();
        console.log(timeStarted);
        console.log(temp);
        timeStarted=temp-timeStarted;
        let minutes=Math.floor((timeStarted/1000/60) << 0);
        console.log(minutes);
        document.getElementById("timer-collapse-btn").href="#multiCollapseExample1";
        const buffer=await fetch('/timerStopChange',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:div,time:parseInt(minutes)})
        })
        today();
        fetchProblem();
        const ans=await buffer.json();
        console.log(ans);
    }
}
function startOptionAvalaible(){
    const div=document.getElementById('problem-timer-select').value;
    if(div=="Select Problem:")
    {
        document.getElementById('start').disabled=true;
    }
    else{
        console.log("Inside");
        document.getElementById('start').disabled=false;
    }
}
async function Done(){
    const div=document.getElementById('problem-timer-select').value;
    if(div=="0"||div!=startedProblem)
    {
        alert('First Start A Problem');
    }
    else{
        const buffer=await fetch('/problemDone',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:div})
        })
        today();
        fetchProblem();
        const ans=await buffer.json();
        console.log(ans);
    }
}