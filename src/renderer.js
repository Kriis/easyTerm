const container = document.getElementById('container')
const shellPromt = "$&nbsp;"

class Terminal {
    constructor(location) {
        this.location = location
        this.div = document.createElement("div")
        this.div.setAttribute("class", "terminal")
        this.div.setAttribute("contenteditable", "true");
        this.div.setAttribute("spellcheck", "false")
        this.div.setAttribute("tabindex","0")
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
        <p>${shellPromt}</p>
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
        console.log("setFocus on" + this.div)
        this.div.focus()
    }

    onClickHandler() {
        //put cursor to end of line
        var range,selection;
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
        var range,selection;
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
    
    keyDownHandler(ev) {
        let evt = ev
        //handling keycombination
        if (ev.keyCode == 220 && ev.ctrlKey) {
            //Ctrl + \
            return
        }
        else {
            if ( ev.ctrlKey || ev.shiftKey || ev.altKey ) {
                console.log("Combination key is pressed")
                return;
            }
        }
        //handling enter key is press
        if(evt.key === 'Enter') {
            evt.preventDefault(); //disable line break when hit enter
            switch(this.command) {
                case "clear":
                    this.innerHTML = ``
                    break
                default:
                    break
            }
            //create new prompt
            const p = document.createElement('p');
            p.innerHTML = `${shellPromt}`
            this.appendChild(p)
            //put cursor to end of line
            var range,selection;
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
            //clear command
            this.command = ""
        }
        else {
            if(this.command === undefined) {
                this.command = ""
            }
            if (evt.key === 'Backspace' || evt.key === 'ArrowLeft') {
                if(this.command.length === 0) {
                    evt.preventDefault(); // Disable backspace
                }
                else {
                    this.command = this.command.substring(0, this.command.length - 1);
                }
            }
            if(evt.key.length === 1) {
                this.command += evt.key
            }
            console.log(this.command)
        }
    }
}

function createNewTerm(location) {
    term = new Terminal(location)
    term.printBanner()
    term.div.onkeydown = term.keyDownHandler
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
    console.log(ev)
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
setTimeout(() => {
    container.firstChild.focus()
}, 100)
window.onfocus = () => {
    container.firstChild.focus()
}
