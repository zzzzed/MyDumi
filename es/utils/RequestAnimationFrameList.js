export default (function(targetDOM, total, once) {
  var index = 0;

  var loop = function loop(curTotal, curIndex) {
    if (curTotal <= 0) return;
    var pageCount = Math.min(curTotal, once);
    window.requestAnimationFrame(function() {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < pageCount; i++) {
        var li = document.createElement('li');
        li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total);
        fragment.appendChild(li);
      }

      targetDOM === null || targetDOM === void 0
        ? void 0
        : targetDOM.appendChild(fragment);
      loop(curTotal - pageCount, curIndex + pageCount);
    });
  };

  loop(total, index);
});
