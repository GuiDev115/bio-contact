function showField(id) {
    let bloco = document.getElementById(id);

    bloco.style.display = (bloco.style.display === "none") ? "block" : "none";
}

function copy() {

    var tables = document.getElementsByTagName("table");
    var range = document.createRange(); 
    var content = "";

    for (let table of tables) {  

        range.selectNode(table);

        window.getSelection().removeAllRanges();        
        window.getSelection().addRange(range); 
        
        document.execCommand('copy');
        content += window.getSelection().toString();
    }  
    
    copyToClipboard(content);
}

function copyToClipboard(text) {
  
    var textArea = document.createElement("textarea"); 
    textArea.value = text;  
    document.body.appendChild(textArea);   

    textArea.select();

    document.execCommand('copy');  
    document.body.removeChild(textArea); 
}  