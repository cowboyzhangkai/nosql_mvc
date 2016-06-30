(function($){$.widget("ui.combobox",{_create:function(){var e=this.element.parent().is('div.ui-widget');var f,that=this,select=e?this.element.hide():this.element.wrap('<div class="ui-widget"></div>').hide(),selected=select.children(":selected"),value=selected.val()?selected.text():"",wrapper=this.wrapper=$("<span>").addClass("ui-combobox").insertAfter(select);function removeIfInvalid(a){var b=$(a).val(),matcher=new RegExp("^"+$.ui.autocomplete.escapeRegex(b)+"$","i"),valid=false;select.children("option").each(function(){if($(this).text().match(matcher)){this.selected=valid=true;return false}});if(!valid){$(a).val("").attr("title",b+" 找不到符合的选项").tooltip("open");select.val("");setTimeout(function(){f.tooltip("close").attr("title","")},2500);f.data("autocomplete").term="";return false}}f=$("<input>").appendTo(wrapper).val(value).attr("title","").addClass("ui-state-default ui-combobox-input").autocomplete({delay:0,minLength:0,source:function(b,c){var d=new RegExp($.ui.autocomplete.escapeRegex(b.term),"i");c(select.children("option").map(function(){var a=$(this).text();if(this.value&&(!b.term||d.test(a)))return{label:a.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+$.ui.autocomplete.escapeRegex(b.term)+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>"),value:a,option:this}}))},select:function(a,b){b.item.option.selected=true;that._trigger("selected",a,{item:b.item.option})},change:function(a,b){if(!b.item)return removeIfInvalid(this)}}).addClass("ui-widget ui-widget-content ui-corner-left");f.data("autocomplete")._renderItem=function(a,b){return $("<li>").data("item.autocomplete",b).append("<a>"+b.label+"</a>").appendTo(a)};$("<a>").attr("tabIndex",-1).attr("title","显示全部选项").tooltip().appendTo(wrapper).button({icons:{primary:"ui-icon-triangle-1-s"},text:false}).removeClass("ui-corner-all").addClass("ui-corner-right ui-combobox-toggle").click(function(){if(f.autocomplete("widget").is(":visible")){f.autocomplete("close");removeIfInvalid(f);return}$(this).blur();f.autocomplete("search","");f.focus()});f.tooltip({position:{of:this.button},tooltipClass:"ui-state-highlight"})},destroy:function(){this.wrapper.remove();this.element.show();$.Widget.prototype.destroy.call(this)}})})(jQuery);