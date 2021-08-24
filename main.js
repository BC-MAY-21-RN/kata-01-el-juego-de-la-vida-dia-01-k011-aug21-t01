function readFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    
    var reader = new FileReader();
    reader.onload = function(e) {
      var content = e.target.result;
      showContent(content);
    };
    reader.readAsText(file);
  }
  
  function showContent(content) {
    var element = document.getElementById('content-file');
    console.log(content);
    element.innerHTML = content;
  }
  
  document.getElementById('file-input')
    .addEventListener('change', readFile, false);