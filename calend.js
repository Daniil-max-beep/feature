// скрипт
function setCursorPosition(pos, e) {
    e.focus();
    if (e.setSelectionRange) e.setSelectionRange(pos, pos);
    else if (e.createTextRange) {
      var range = e.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
    }
  }

  function mask(e) {
    var matrix = this.placeholder,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
      return val.charAt(i++) || "_"
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this)
  }


function setDate(date){
  $("#date").val(date);//поле в форме
  let data = date.split('/');
  $(".day_btn").removeClass("selected");//убираем класс с кнопок selected
  $($("#month_"+parseInt(data[1])).find(".day_btn")[parseInt(data[0])-1]).addClass("selected");//находим нажатую кнопку на основе выбранной даты и ставим класс selected
}
function setSelectedDay(date){
  let data = date.split('/');
  $($("#month_"+parseInt(data[1])).find(".day_btn")[parseInt(data[0])-1]).removeClass("disable").addClass("selected");
}
function disableButton(date){
  let data = date.split('/');
  $($("#month_"+parseInt(data[1])).find(".day_btn")[parseInt(data[0])-1]).addClass("disable").attr("onclick","");
}
function disableButtons(){
  $.ajax("/api.php?method=getDisabled",{method:"POST",success:(e)=>{
    // console.log(e);
    let data = JSON.parse(e);
    data.map((el)=>{
      // console.log(el);
      disableButton(el);
    });
  }});
}
function sendForm(){
  $.ajax("/api.php?method=save",{method:"POST",data:$("#form_1").serializeArray()});
}
//проставляю дату, если есть

disableButtons();
setSelectedDay("02/01");
$('#online_phone').mask('+7 (000) 000-00-00',{placeholder: "+7 (___) ___-__-__",clearIfNotMatch: true});