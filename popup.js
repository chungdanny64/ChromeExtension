document.addEventListener('DOMContentLoaded', function(){
    // document.querySelector('button').addEventListener('click', onclick, false)
    // function onclick(){
    //     chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    //         chrome.tabs.sendMessage(tabs[0].id,'hello')
    //     })
    // } 


    chrome.storage.sync.get(null, function(res){

        var allKeys = Object.keys(res)

        for(x of allKeys){

            let element = document.createElement('div')
            element.className = 'get_tabs'
            element.innerHTML = "<p id = \"" + x +  "_name\">" + x +"</p>"
            element.innerHTML += "<div> <button id = \"" + x + "\">"  + "Open" + "</button>  <button id = \"" + x + "_delete" + "\">"  +" Delete "+ "</button> <button id = \"" + x + "_edit" + "\"> Edit </button>" 
            //element.innerHTML += " " 
            document.body.appendChild(element)
            
            document.getElementById(x).addEventListener('click', onclicked, false)
            function onclicked(e){
    
                chrome.storage.sync.get(e.target.id, function(res){

                let urls = []
                for(thing of res[e.target.id]){
                    urls.push(thing.url)
                }
                
                chrome.windows.create({url: urls})



                })
    
            }

            let delete_x = x+"_delete"
            document.getElementById(delete_x).addEventListener('click', deleter, false)
            function deleter(e){
                // takes the id of the delete button and gets the key associated with it 
                let check = confirm('Are you sure you want to delete this window?')
                if(check){
                    let new_id = e.target.id.replace("_delete",'')
                    // deletes the entry from the storage using the key
                    chrome.storage.sync.remove(new_id)
                }
                
                location.reload()
            }


            let edit_x = x+"_edit"
            document.getElementById(edit_x).addEventListener('click', editer, false)
            function editer(e){
                alert(e.target.id)
                // takes the id of the delete button and gets the key associated with it 
                let check = prompt("New Name")
                // in case we have an existing key with same name
                if(allKeys.includes(check)){
                    alert("No")
                }
                if(check){

                    // answer will be the object holding the key value pairs of the windows
                    chrome.storage.sync.get(null, function(answer){
                        // gets the saved array for the key value 
                        let saved = answer[e.target.id.replace("_edit","")]
                        let new_item = {}
                        new_item[check] = saved
                        chrome.storage.sync.set(new_item)
                        chrome.storage.sync.remove(e.target.id.replace("_edit",""))
                    })


                }
                
                location.reload()
            }
        }
    })


    
    document.getElementById('test').addEventListener('click', onclick, false)
    function onclick(){
        chrome.windows.getCurrent(function(w){
            // gets all the tabs in the window
            chrome.tabs.getAllInWindow(w.id,
                function(response){                  
                    let uids = Date.now().toString()
                    // create an object to pass in 
                    let key_pair = {}
                    // sets the key and value
                    key_pair[uids] = response

                    // pass the object into storage as first parameter
                    chrome.storage.sync.set(key_pair)
                    location.reload()
                })
        })
    }

    }, false)