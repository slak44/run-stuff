'use strict';
hljs.configure({tabReplace: '', useBR: false});
hljs.initHighlighting();
var codeBlocks = byClass('code-block');
for (var i = 0; i < codeBlocks.length; i++) highlightEvt(codeBlocks[i]);

function sendToServer() {
  var args = prompt('Command line args');
  showResponse();
  byId('response').children[1].innerHTML = 'Status: Waiting...';
  var data = byClass('displayable')[0].children[0].innerHTML // Current language's innerHTML
    .replace(/<\/span>|<span(.*?)>|<div>|<\/div>|<\/font>|<font(.*?)>/g, '') // Remove HTML from syntax highlighting
    .replace(/<br>/g, '\n');
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    byId('response').children[1].innerHTML = this.response;
    console.log(this);
  }
  xhr.open('POST', byClass('displayable')[0].classList[0]);
  xhr.send(args + '~~~~' + data);
}

function showResponse() {
  byId('request').classList.add('unfocus');
  byId('response').classList.add('displayable');
}

function hideResponse() {
  byId('request').classList.remove('unfocus');
  byId('response').classList.remove('displayable');
}

function highlightEvt(who) {
  who.innerHTML = hljs.fixMarkup(who.innerHTML);
  who.addEventListener('blur', function (e) {hljs.highlightBlock(who)});
}

function showLang(langName) {
  byClass('displayable')[0].classList.remove('displayable');
  byClass(langName)[0].classList.add('displayable');
}

function byClass(className) {
  return document.getElementsByClassName(className);
}

function byId(id) {
  return document.getElementById(id);
}