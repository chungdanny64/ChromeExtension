//alert('hello')
chrome.runtime.onMessage.addListener(function(request){
    alert(request)
})



// chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
//     console.log(tabs[0])
// } )