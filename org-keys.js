//
// org-keys.js
//
// Author and Copyright (c) 2009 Sebastian Rose, Hannover, Germany, sebastian_rose gmx de
//
// Contact:
//
//    Phone: +49 (0) 173 - 83 93 417
//    Email: sebastian_rose gmx de
//
// Released under the GNU General Public License version 3
// see: http://www.gnu.org/licenses/
//


var OrgKeyReader = {
  EMPTY_START: /^(\s*)(.*)/,   // Trim (s. getKey())
  EMPTY_END: /\s$/,            // Trim (s. getKey())
  CONSOLE: null,
  CONSOLE_INPUT: null,
  CONSOLE_LABEL: null,
  CONSOLE_OFFSET: "50px",
  REGISTER: {},

  init: function()
  {
    this.CONSOLE = document.createElement("div");
    this.CONSOLE.innerHTML = '<form action="" style="margin:0px;padding:0px;" onsubmit="org_html_manager.evalReadCommand(); return false;">'
      +'<table id="org-info-js_console" style="width:100%;margin:0px 0px 0px 0px;border-style:none;" cellpadding="0" cellspacing="0" summary="minibuffer">'
      +'<tbody><tr><td id="org-info-js_console-icon" style="padding:0px 0px 0px 0px;border-style:none;">&#160;</td><td style="width:100%;vertical-align:middle;padding:0px 0px 0px 0px;border-style:none;">'
      +'<table style="width:100%;margin:0px 0px 0px 0px;border-style:none;" cellpadding="0" cellspacing="2">'
      +'<tbody><tr><td id="org-info-js_console-label" style="white-space:nowrap;padding:0px 0px 0px 0px;border-style:none;"></td></tr>'
      +'<tr><td style="width:100%;vertical-align:middle;padding:0px 0px 0px 0px;border-style:none;">'
      +'<input type="text" id="org-info-js_console-input" onkeydown="org_html_manager.getKey();"'
      +' onclick="this.select();" maxlength="150" style="width:100%;padding:0px;margin:0px 0px 0px 0px;border-style:none;"'
      +' value=""/></td></tr></tbody></table></td><td style="padding:0px 0px 0px 0px;border-style:none;">&#160;</td></tr></tbody></table>'
      +'</form>';
    this.CONSOLE.style.position = 'relative';
    this.CONSOLE.style.marginTop =  "-" + this.CONSOLE_OFFSET;
    this.CONSOLE.style.top = "-" + this.CONSOLE_OFFSET;
    this.CONSOLE.style.left = '0px';
    this.CONSOLE.style.width = '100%';
    this.CONSOLE.style.height = '40px';
    this.CONSOLE.style.overflow = 'hidden';
    this.CONSOLE.style.verticalAlign = 'middle';
    this.CONSOLE.style.zIndex = '9';
    this.CONSOLE.style.border = "1px solid #cccccc";
    this.CONSOLE.id = 'org-info-js_console-container';

    document.body.insertBefore(this.CONSOLE, document.body.firstChild);
    this.MESSAGING = false;
    this.CONSOLE_LABEL = document.getElementById("org-info-js_console-label");
    this.CONSOLE_INPUT = document.getElementById("org-info-js_console-input");
    document.onkeypress=OrgKeyReaderKeyEvent;

    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; ++i) {
      var k = links[i].getAttribute('accesskey');
      var h = links[i].getAttribute('href');
      if(k && h) {
        this.registerHref(k, h);
      }
    }
  },


  getKey: function ()
  {
    var s = this.CONSOLE_INPUT.value;

    // empty console again:
    this.CONSOLE_INPUT.value = "";

    // trim the string
    if(s.match(this.EMPTY_START))
      s = s.match(this.EMPTY_START)[2];
    if(s.length && s.match(this.EMPTY_END))
      s = s.substr(0, s.length - 1);

    // return, if s is empty:
    if(0 == s.length) { return; }

    this.CONSOLE_INPUT.blur();


    // Now use the input:
    if(this.REGISTER[s] && "function" == typeof this.REGISTER[s]) {
      this.REGISTER[s]();
    }

  },


  register: function(key, func)
  {
    this.REGISTER[key] = func;
  },


  registerHref: function(key, href)
  {
    this.register(key, function(){document.location.href=href;});
  }

};


function OrgKeyReaderKeyEvent (e)
{
  var c;
  if (!e) e = window.event;
  if (e.which) c = e.which;
  else if (e.keyCode) c = e.keyCode;

  if(e.ctrlKey) return;

  var s = String.fromCharCode(c);
  if(e.shiftKey)
    OrgKeyReader.CONSOLE_INPUT.value = OrgKeyReader.CONSOLE_INPUT.value + s;
  else
    OrgKeyReader.CONSOLE_INPUT.value = OrgKeyReader.CONSOLE_INPUT.value + s.toLowerCase();

  OrgKeyReader.getKey();
}
