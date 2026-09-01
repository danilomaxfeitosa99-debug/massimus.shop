(function(){
  function hideInjectedElements(){
    document.querySelectorAll('script,style,.site-header,.marquee').forEach(function(element){
      element.style.setProperty('display', 'none', 'important');
    });
  }

  hideInjectedElements();
  if(typeof MutationObserver !== 'undefined'){
    new MutationObserver(hideInjectedElements).observe(document.documentElement, { childList: true, subtree: true });
  }

  var content = document.getElementById('pitch-content');
  var secondsToDisplay = Number(content && content.dataset.pitchSeconds) || 1924;
  var classToDisplay = '.esconder';
  var hiddenElements = document.querySelectorAll(classToDisplay);
  var hiddenElementsArray = [];
  var elementsDisplayed = false;
  var timerStarted = false;

  setTimeout(function(){
    hiddenElementsArray = Array.prototype.slice.call(hiddenElements);
  }, 0);

  function startCounter(){
    if(timerStarted) return;
    timerStarted = true;
    var timer = document.getElementById('timer');
    if(!timer) return;
    var remaining = 600;
    function update(){
      var minutes = Math.floor(remaining / 60);
      var seconds = remaining % 60;
      timer.textContent = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
      if(remaining > 0){
        remaining -= 1;
        setTimeout(update, 1000);
      }
    }
    update();
  }

  function chamarTimer(){
    startCounter();
  }

  function showEls(){
    for(var i = 0; i < hiddenElementsArray.length; i++){
      hiddenElementsArray[i].style.display = 'block';
    }
    startCounter();
    chamarTimer();
  }

  function startWatchVideoProgress(){
    if(typeof smartplayer === 'undefined' || !smartplayer.instances || !smartplayer.instances[0]){
      setTimeout(startWatchVideoProgress, 500);
      return;
    }

    smartplayer.instances[0].on('timeupdate', function(){
      if(elementsDisplayed) return;
      if(!smartplayer.instances[0].video || smartplayer.instances[0].video.currentTime < secondsToDisplay) return;
      showEls();
      elementsDisplayed = true;
      localStorage.setItem('alreadyElsDisplayed', 'true');
    });
  }

  var boosterPlayerScript = document.createElement('script');
  boosterPlayerScript.src = 'https://scripts.converteai.net/78dde86a-ee07-427a-942f-58e3149a044c/players/6a8ca76de880bd9ad773b805/v4/player.js';
  boosterPlayerScript.async = true;
  document.head.appendChild(boosterPlayerScript);

  if(localStorage.getItem('alreadyElsDisplayed') === 'true'){
    setTimeout(showEls, 100);
  } else {
    startWatchVideoProgress();
  }

  var query = window.location.search;
  if(query){
    document.querySelectorAll('a[href]').forEach(function(link){
      var href = link.getAttribute('href');
      if(!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      link.setAttribute('href', href + (href.indexOf('?') > -1 ? '&' : '?') + query.slice(1));
    });
  }
})();
