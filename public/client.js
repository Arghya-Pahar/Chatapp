const socket=io()
let textarea=document.querySelector('#textarea')
let messagearea=document.querySelector('.message_area')
let namee;
let text;
do{
    namee =prompt('please enter your name')
}while(!namee)
textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter')
    {
        text=e.target.value
        console.log(text)
        sendMessage(text)
    }
})
function sendMessage(mssg)
{
    let msg={
        user: namee,
        message: mssg.trim(),
    }
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrolll();
    socket.emit('message',msg)
}
function appendMessage(msg,type){
    let elem=msg.user
    let txt=msg.message.trim()
    txt.trim()
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup=`
    <h4>${elem}</h4>
    <p>${txt}</p>
    `
    mainDiv.innerHTML=markup
    messagearea.appendChild(mainDiv)
}

//recive
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrolll();
})
function scrolll(){
    messagearea.scrollTop=messagearea.scrollHeight
}