const container = document.getElementById('container')
const shellPrompt = "$&nbsp;"
const errorPrompt = `<p><span style="color:red";>&nbsp&nbspx</span> Error: Unknown command</p>`
const missingArgsPrompt = `<p><span style="color:red";>&nbsp&nbspx</span> Error: Missing arguments</p>`

const tabPrompt ="nbsp;nbsp;"
let numOfTerm = 0;
const terminals = [];

const baudrates = ["9600", "14400", "19200", "38400", "57600", "115200", "230400", "460800", "921600"]

class Terminal {
    constructor(location) {
        this.location = location
        this.div = document.createElement("div")
        this.div.setAttribute("class", "terminal")
        this.div.setAttribute("contenteditable", "true")
        this.div.setAttribute("spellcheck", "false")
        this.div.setAttribute("tabindex","0")
        this.div.setAttribute("id", numOfTerm)
        this.div.commandHistory = []
        this.div.commandHistoryIdx = 0
        this.div.commandHistoryDir = 0 // 1 is up, 0 is down, -1 is none
        this.div.createPromptFlag = false
        terminals.push(numOfTerm)
        numOfTerm +=1
    }

    printBanner() {
        this.div.innerHTML = `<p>███████╗&nbsp█████╗&nbsp███████╗██╗&nbsp&nbsp&nbsp██╗</p>
        <p>██╔════╝██╔══██╗██╔════╝╚██╗&nbsp██╔╝</p>
        <p>█████╗&nbsp&nbsp███████║███████╗&nbsp╚████╔╝&nbsp</p>
        <p>██╔══╝&nbsp&nbsp██╔══██║╚════██║&nbsp&nbsp╚██╔╝&nbsp&nbsp</p>
        <p>███████╗██║&nbsp&nbsp██║███████║&nbsp&nbsp&nbsp██║&nbsp&nbsp&nbsp</p>
        <p>╚══════╝╚═╝&nbsp&nbsp╚═╝╚══════╝&nbsp&nbsp&nbsp╚═╝&nbsp&nbsp&nbsp</p>
        <p>Welcome to easy Terminal</p>
        <p><br></p>
        <p>HotKey Cmd:</p>
        <p>CTRL + \\: Split Screen</p>
        <p>TAB: Switch between screens</p>
        <p>ALT + <-: Switch to left screen</p>
        <p>ALT + ->: Switch to right screen</p>
        <p><br></p>
        <p>${shellPrompt}</p>
        `
    }

    putCursorAtEnd() {
        var range,selection;
        console.log(this.div)
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(this.div);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        { 
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(this.div);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    }
    
    setFocus() {
        this.div.focus()
    }

    onClickHandler() {
        //put cursor to end of line
        let range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(this);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        { 
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(this);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }        
    }

    onFocusHandler() {
        //put cursor to end of line
        let range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(this);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        { 
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(this);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    }

    getListArgs
    
    keyDownCmdHandler(ev) {
        let evt = ev
        //handling enter key is press
        if(evt.key === 'Enter') {
            evt.preventDefault(); //disable line break when hit enter
            let command = this.lastElementChild.innerHTML
            let tokens = command.split(" ")
            command = tokens[1]
            this.commandHistory.push(command)
            this.commandHistoryIdx = this.commandHistory.length - 1
            this.commandHistoryDir = -1
            //console.log(this.commandHistory)

            switch(command) {
                case "clear":
                    this.innerHTML = ``
                    this.createPromptFlag = true
                    break
                case "list":
                    if (tokens[2] === "ports") {
                        window.serial.listPort(this.id)
                    }
                    else if (tokens[2] === "baudrates") {
                        baudrates.forEach(function(baudrate){
                            console.log(baudrate)
                            const p = document.createElement('p')
                            p.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;${baudrate}`
                            term.appendChild(p)
                        })
                        this.createPromptFlag = true
                    }
                    else {
                        const warn = document.createElement('p');
                        warn.innerHTML = missingArgsPrompt
                        this.appendChild(warn)
                        const help = document.createElement('p');
                        help.innerHTML = `<p>&nbsp;&nbspUsage: <br>&nbsp;&nbsplist ports: print all available ports <br>&nbsp;&nbsplist baudrates: print all available baudrate</p>`
                        this.appendChild(help)
                        this.createPromptFlag = true
                    }
                    break
                case "connect":
                    // getConnectArgs(command)
                    // window.serial.connect(this.id, port, baudrate)
                    break
                //empty command
                case undefined:
                    this.createPromptFlag = true
                    break
                default:
                    const error = document.createElement('p');
                    error.innerHTML = errorPrompt
                    this.appendChild(error)
                    this.createPromptFlag = true
                    break
            }
            if(this.createPromptFlag === true) {
                //create new prompt
                const p = document.createElement('p');
                p.innerHTML = `${shellPrompt}`
                this.appendChild(p)
                //put cursor to end of line
                let range,selection;
                if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
                {
                    range = document.createRange();//Create a range (a range is a like the selection but invisible)
                    range.selectNodeContents(this);//Select the entire contents of the element with the range
                    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                    selection = window.getSelection();//get the selection object (allows you to change selection)
                    selection.removeAllRanges();//remove any selections already made
                    selection.addRange(range);//make the range you have just created the visible selection
                }
                else if(document.selection)//IE 8 and lower
                { 
                    range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
                    range.moveToElementText(this);//Select the entire contents of the element with the range
                    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                    range.select();//Select the range (make it the visible selection
                }
                this.createPromptFlag = false
            }
            this.scrollTop = this.scrollHeight
        }
        else if (evt.key === "Backspace" || evt.key === "ArrowLeft") {
            let selection = window.getSelection()
            if(this.lastElementChild.innerHTML === shellPrompt) {
                evt.preventDefault()
            }
            if (selection && selection.anchorNode.parentNode.tagName === "P") {
                if(selection.focusOffset < 3) {
                    evt.preventDefault()
                }
            }
        }
        else if(evt.key == "ArrowUp") {
            evt.preventDefault()
            if(this.commandHistory.length > 0) {
                if(this.commandHistoryDir === 0) {
                    this.commandHistoryIdx -= 1
                }
                this.commandHistoryDir = 1
                this.lastElementChild.innerHTML = `$ ${this.commandHistory[this.commandHistoryIdx]}`
                let range,selection
                if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
                {
                    range = document.createRange();//Create a range (a range is a like the selection but invisible)
                    range.selectNodeContents(this);//Select the entire contents of the element with the range
                    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                    selection = window.getSelection();//get the selection object (allows you to change selection)
                    selection.removeAllRanges();//remove any selections already made
                    selection.addRange(range);//make the range you have just created the visible selection
                }
                else if(document.selection)//IE 8 and lower
                { 
                    range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
                    range.moveToElementText(this);//Select the entire contents of the element with the range
                    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                    range.select();//Select the range (make it the visible selection
                }
                if(this.commandHistoryIdx > 0) {
                    this.commandHistoryIdx -= 1
                }
            }
        }
        else if(evt.key == "ArrowDown") {
            evt.preventDefault()
            if(this.commandHistory.length > 0) {
                if(this.commandHistoryDir === 1) {
                    this.commandHistoryIdx += 1
                }
                this.commandHistoryDir = 0
                this.lastElementChild.innerHTML = `$ ${this.commandHistory[this.commandHistoryIdx]}`
                let range,selection
                if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
                {
                    range = document.createRange();//Create a range (a range is a like the selection but invisible)
                    range.selectNodeContents(this);//Select the entire contents of the element with the range
                    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                    selection = window.getSelection();//get the selection object (allows you to change selection)
                    selection.removeAllRanges();//remove any selections already made
                    selection.addRange(range);//make the range you have just created the visible selection
                }
                else if(document.selection)//IE 8 and lower
                { 
                    range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
                    range.moveToElementText(this);//Select the entire contents of the element with the range
                    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                    range.select();//Select the range (make it the visible selection
                }
                if(this.commandHistoryIdx < this.commandHistory.length-1) {
                    this.commandHistoryIdx += 1
                }
            }
        }
        else if (evt.keyCode === 36) {
            evt.preventDefault()
            return
        }
    }
}

function createNewTerm(location) {
    term = new Terminal(location)
    term.printBanner()
    term.div.onkeydown = term.keyDownCmdHandler
    term.div.onfocus = term.onFocusHandler
    term.div.onclick = term.onClickHandler
    container.appendChild(term.div)
    term.setFocus()
}
if(container.hasChildNodes() === false) {
    createNewTerm("center")
}

window.onkeydown = (ev) => {
    //handling keycombination
    if (ev.keyCode === 220 && ev.ctrlKey) {
        //Ctrl + \ split screen
        createNewTerm("right")
        return
    } else if(ev.keyCode === 87 && ev.ctrlKey) {
        //Ctrl + W // not work right now
        console.log("Close Screen")
    } else if (ev.keyCode === 37 && ev.altKey) {
        console.log("switch left")
        let numberOfChilds = container.children.length
        if(numberOfChilds === 1) {
            return
        }
        let children = container.children
        let i
        for(i = 0; i < numberOfChilds; i++) {
            let child = children[i]
            if(child === document.activeElement) {
                break
            }
        }
        if( i === 0) {
            i = numberOfChilds - 1
            children[i].focus()
        }
        else {
            children[i-1].focus()
        }

    }
    else if (ev.keyCode === 39 && ev.altKey) {
        console.log("switch right")
        let numberOfChilds = container.children.length
        if(numberOfChilds === 1) {
            return
        }
        let children = container.children
        let i
        for(i = 0; i < numberOfChilds; i++) {
            let child = children[i]
            console.log(child)
            if(child === document.activeElement) {
                break
            }
        }
        if( i === (numberOfChilds - 1)) {
            i = 0
            children[i].focus()
        }
        else {
            children[i+1].focus()
        }
    }
}

function onListEvent(termId, ports) {
    term = document.getElementById(termId)
    ports.forEach(function(port){
        const p = document.createElement('p')
        p.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;${port.friendlyName}`
        term.appendChild(p)
    })
    //create new prompt
    const p = document.createElement('p');
    p.innerHTML = `${shellPrompt}`
    term.appendChild(p)
    //put cursor to end of line
    let range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(term);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(term);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
    term.scrollTop = term.scrollHeight
} 

setTimeout(() => {
    container.firstChild.focus()
}, 100)

window.onfocus = () => {
    container.firstChild.focus()
}

window.serial.onList((args) => { 
    onListEvent(args[0], args[1])
})
